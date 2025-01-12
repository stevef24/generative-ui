"use client";

import { PaperclipIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRef, useState } from "react";
import { toast } from "sonner";

interface ChatInputProps {
	input: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
}

export function ChatInput({
	input,
	handleInputChange,
	handleSubmit,
}: ChatInputProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Check if file is PDF
		if (file.type !== "application/pdf") {
			toast.error("Please upload a PDF file");
			return;
		}

		setIsUploading(true);

		try {
			const formData = new FormData();
			formData.append("filepond", file);

			const response = await fetch("/api/pdf", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to process PDF");
			}

			const fileName = response.headers.get("FileName");

			toast.success("PDF processed successfully");

			// You can handle the parsed text here
			// For example, you could set it as the input value
			handleInputChange({
				target: {
					value: `I've uploaded a PDF file named ${fileName}. Please help me analyze its contents.`,
				},
			} as React.ChangeEvent<HTMLInputElement>);

			// Automatically submit after processing
			handleSubmit();
		} catch (error) {
			console.error("Error processing PDF:", error);
			toast.error("Failed to process PDF file");
		} finally {
			setIsUploading(false);
			// Reset file input
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	return (
		<div className="w-[800px] max-sm:w-full mx-auto sticky bottom-0 bg-gradient-to-t from-background via-background/80 to-background/40 p-4 backdrop-blur-xl">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="flex gap-2 items-center"
			>
				<input
					type="file"
					accept=".pdf"
					onChange={handleFileUpload}
					ref={fileInputRef}
					className="hidden"
				/>
				<Button
					type="button"
					size="icon"
					variant="ghost"
					onClick={() => fileInputRef.current?.click()}
					disabled={isUploading}
				>
					<PaperclipIcon
						className={`h-5 w-5 ${isUploading ? "animate-spin" : ""}`}
					/>
				</Button>
				<Input
					value={input}
					onChange={handleInputChange}
					placeholder="Ask a question..."
					className="flex-1 "
				/>
				<Button
					type="submit"
					size="icon"
					disabled={!input.trim() || isUploading}
				>
					<SendIcon className="h-5 w-5" />
				</Button>
			</form>
		</div>
	);
}
