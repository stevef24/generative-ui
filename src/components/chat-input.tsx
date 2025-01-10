"use client";

import { PaperclipIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
	return (
		<div className="w-[33%] mx-auto sticky bottom-0 bg-gradient-to-t from-background via-background/80 to-background/40 p-4 backdrop-blur-xl">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="flex gap-2 items-center"
			>
				<Button type="button" size="icon" variant="ghost">
					<PaperclipIcon className="h-5 w-5" />
					<span className="sr-only">Attach file</span>
				</Button>
				<Input
					value={input}
					onChange={handleInputChange}
					placeholder="Message..."
					className="flex-1 bg-background border-muted-foreground/20"
				/>
				<Button type="submit" size="icon" disabled={!input.trim()}>
					<SendIcon className="h-5 w-5" />
					<span className="sr-only">Send message</span>
				</Button>
			</form>
			<p className="text-xs text-center text-muted-foreground mt-2">
				AI can make mistakes. Consider checking important information.
			</p>
		</div>
	);
}
