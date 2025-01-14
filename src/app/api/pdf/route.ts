/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import { generateEmbeddings } from "@/lib/ai/embedding";
import { db } from "@/lib/db";
import { embeddings } from "@/lib/db/schema/embeddings";

export async function POST(req: NextRequest) {
	const formData: FormData = await req.formData();
	console.log("Form data entries:", Array.from(formData.entries()));
	const uploadedFiles = formData.getAll("filepond");
	let fileName = "";
	let parsedText = "";

	if (!uploadedFiles || uploadedFiles.length === 0) {
		console.log("No files found in the request.");
		return new NextResponse("No files found in the request", { status: 400 });
	}

	const uploadedFile = uploadedFiles[0];
	console.log("Uploaded file:", uploadedFile);

	if (!uploadedFile || !(uploadedFile instanceof File)) {
		console.log("Invalid file format or no file provided");
		return new NextResponse("Invalid file format or no file provided", {
			status: 400,
		});
	}

	fileName = uuidv4();
	const tempFilePath = `/tmp/${fileName}.pdf`;
	const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
	await fs.writeFile(tempFilePath, fileBuffer);

	const pdfParser = new (PDFParser as any)(null, 1);

	try {
		parsedText = await new Promise((resolve, reject) => {
			pdfParser.on("pdfParser_dataError", (errData: any) =>
				reject(errData.parserError)
			);
			pdfParser.on("pdfParser_dataReady", () => {
				resolve((pdfParser as any).getRawTextContent());
			});
			pdfParser.loadPDF(tempFilePath);
		});

		const embeddingsData = await generateEmbeddings(parsedText);

		await db.insert(embeddings).values(
			embeddingsData.map((data) => ({
				content: data.content,
				embedding: data.embedding,
				source: `pdf:${fileName}`,
			}))
		);

		await fs.unlink(tempFilePath);
	} catch (error) {
		console.error("Error processing PDF:", error);
		return new NextResponse("Error processing PDF", { status: 500 });
	}

	const response = new NextResponse(parsedText);
	response.headers.set("FileName", fileName);
	return response;
}
