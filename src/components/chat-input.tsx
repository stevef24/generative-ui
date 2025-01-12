"use client";

import { PaperclipIcon, Square, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ChatInputProps {
	input: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	isLoading: boolean;
	stop: () => void;
}

export function ChatInput({
	input,
	handleInputChange,
	handleSubmit,
	isLoading,
	stop,
}: ChatInputProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

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

			handleInputChange({
				target: {
					value: `I've uploaded a PDF file named ${fileName}. Please help me analyze its contents.`,
				},
			} as React.ChangeEvent<HTMLInputElement>);

			handleSubmit();
		} catch (error) {
			console.error("Error processing PDF:", error);
			toast.error("Failed to process PDF file");
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t">
			<div className="max-w-4xl mx-auto p-4">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					className="relative flex items-center gap-2"
				>
					<div className="relative flex w-full rounded-lg border bg-background px-4 py-2 shadow-sm focus-within:ring-1 focus-within:ring-primary">
						<input
							type="file"
							accept=".pdf"
							onChange={handleFileUpload}
							ref={fileInputRef}
							className="hidden"
						/>
						<div className="flex gap-2">
							<Button
								type="button"
								size="icon"
								variant="ghost"
								className="h-8 w-8"
								onClick={() => fileInputRef.current?.click()}
								disabled={isLoading || isUploading}
							>
								<PaperclipIcon
									className={`h-5 w-5 ${isUploading ? "animate-spin" : ""}`}
								/>
							</Button>
						</div>
						<Input
							value={input}
							onChange={handleInputChange}
							placeholder="Ask a follow up..."
							className="flex-1 border-0 bg-transparent px-2 py-1 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
							disabled={isLoading || isUploading}
						/>
						<div className="flex items-center">
							{isLoading ? (
								<Button
									type="button"
									size="icon"
									variant="ghost"
									className="h-8 w-8"
									onClick={stop}
								>
									<Square className="h-4 w-4" />
									<span className="sr-only">Stop generating</span>
								</Button>
							) : (
								<Button
									type="submit"
									size="icon"
									variant="ghost"
									className="h-8 w-8"
									disabled={!input.trim() || isUploading}
								>
									<SendIcon className="h-4 w-4" />
									<span className="sr-only">Send message</span>
								</Button>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
