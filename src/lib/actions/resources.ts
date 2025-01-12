"use server";

import {
	NewResourceParams,
	insertResourceSchema,
	resources,
} from "@/lib/db/schema/resources";
import { db } from "../db";
import { findRelevantContent, generateEmbeddings } from "../ai/embedding";
import { embeddings as embeddingsTable } from "../db/schema/embeddings";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const createResource = async (input: NewResourceParams) => {
	try {
		const { content } = insertResourceSchema.parse(input);

		const [resource] = await db
			.insert(resources)
			.values({ content })
			.returning();

		const embeddings = await generateEmbeddings(content);
		await db.insert(embeddingsTable).values(
			embeddings.map((embedding) => ({
				resourceId: resource.id,
				...embedding,
			}))
		);

		return "Resource successfully created and embedded.";
	} catch (error) {
		return error instanceof Error && error.message.length > 0
			? error.message
			: "Error, please try again.";
	}
};

export const getBenefits = async (question: string) => {
	const relevantContent = await findRelevantContent(question);

	const result = await generateObject({
		model: openai("gpt-4o-mini", { structuredOutputs: true }),
		schemaName: "benefit",
		schema: z.array(
			z.object({
				category: z.string().describe("The category of the benefit"),
				description: z.string().describe("The description of the benefit"),
				icon: z.string().optional().describe("The icon of the benefit"),
			})
		),
		prompt: `return a list of benefits that are relevant to the user's query.

	${relevantContent}

Format each benefit according to the specified schema.`,
	});
	return JSON.stringify(result.object, null, 2);
};
