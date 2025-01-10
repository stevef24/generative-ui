"use client";

import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { Header } from "@/components/header";
export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		maxSteps: 3,
	});

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)]">
			<Header />
			<ScrollArea className="flex-1 p-4">
				<div className="space-y-4 max-w-3xl mx-auto">
					{messages.map((message) => (
						<ChatMessage
							key={message.id}
							message={message}
							addToolResult={({ toolCallId, result }) => {
								// Handle tool results if needed
								console.log("Tool result:", { toolCallId, result });
							}}
						/>
					))}
				</div>
			</ScrollArea>

			<ChatInput
				input={input}
				handleInputChange={handleInputChange}
				handleSubmit={() => {
					handleSubmit(new Event("submit"));
				}}
			/>
		</div>
	);
}
