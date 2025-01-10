"use client";

import { Message, useChat } from "ai/react";
import { ToolInvocation } from "ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolInvocationDisplay from "@/components/ToolInvocationDisplay";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit, addToolResult } =
		useChat({
			api: "/api/chat",
			maxSteps: 5,
			async onToolCall({ toolCall }) {
				switch (toolCall.toolName) {
					case "getWeatherInformation":
						return {
							value: 22,
							unit: "celsius",
							weeklyForecast: [
								{ day: "Mon", value: 22 },
								{ day: "Tue", value: 23 },
								{ day: "Wed", value: 21 },
								{ day: "Thu", value: 24 },
								{ day: "Fri", value: 25 },
							],
						};

					case "getLocation":
						const cities = [
							"New York",
							"Los Angeles",
							"Chicago",
							"San Francisco",
						];
						return cities[Math.floor(Math.random() * cities.length)];

					default:
						return null;
				}
			},
		});

	console.log(messages[messages.length - 1]);
	// Track the last completed tool invocation that has rich data to display
	const [lastCompletedTool, setLastCompletedTool] =
		useState<ToolInvocation | null>(null);

	// Get the latest tool invocation
	const latestMessage = messages[messages.length - 1];
	const latestToolInvocation = latestMessage?.toolInvocations?.[0];

	// Update lastCompletedTool when a tool completes, but only for data-rich tools
	useEffect(() => {
		if (latestToolInvocation && "result" in latestToolInvocation) {
			if (latestToolInvocation.toolName === "getWeatherInformation") {
				setLastCompletedTool(latestToolInvocation);
			}
		}
	}, [latestToolInvocation]);

	// Helper function to get tool processing messages
	const getToolProcessingMessage = (toolName: string) => {
		switch (toolName) {
			case "askForConfirmation":
				return "I need your confirmation for this action...";
			case "getWeatherInformation":
				return "I'm checking the weather information...";
			case "getLocation":
				return "I'm determining your location...";
			default:
				return `Processing ${toolName}...`;
		}
	};

	// Helper function to get the AI response text based on tool state
	const getAIResponseText = (message: Message) => {
		if (!message.toolInvocations?.length) return message.content;

		const tool = message.toolInvocations[0];
		if ("result" in tool) return message.content;

		return getToolProcessingMessage(tool.toolName);
	};

	// Determine if a tool should be displayed in the right panel
	const shouldShowToolInRight = (tool: ToolInvocation) => {
		return tool.toolName === "getWeatherInformation" && "result" in tool;
	};

	// Get the current tool to display on the right (if any)
	const currentToolToDisplay =
		latestToolInvocation && shouldShowToolInRight(latestToolInvocation)
			? latestToolInvocation
			: lastCompletedTool && shouldShowToolInRight(lastCompletedTool)
			? lastCompletedTool
			: null;

	// Filter out empty AI messages and messages without meaningful content
	const filteredMessages = messages.filter((m) => {
		if (m.role === "user") return true;

		if (m.role === "assistant") {
			// Keep message if it has non-empty content
			if (m.content.trim() !== "") return true;

			// Keep message if it has a tool invocation that should be displayed
			if (m.toolInvocations?.[0]) {
				const tool = m.toolInvocations[0];
				// Only keep confirmation tools or tools with results
				return tool.toolName === "askForConfirmation" || "result" in tool;
			}
		}

		return false;
	});

	return (
		<div className="flex h-screen">
			{/* Left column: Chat interface */}
			<div className="w-1/2 flex flex-col p-4 border-r">
				<ScrollArea className="flex-grow mb-4">
					{filteredMessages?.map((m: Message) => (
						<Card key={m.id} className="mb-4">
							<CardContent className="p-4">
								<p className="font-semibold">
									{m.role === "user" ? "You" : "AI"}:
								</p>
								<p className="whitespace-pre-wrap">
									{m.role === "assistant" ? getAIResponseText(m) : m.content}
								</p>
								{m.role === "assistant" &&
									m.toolInvocations?.[0]?.toolName === "askForConfirmation" && (
										<div className="mt-2">
											<ToolInvocationDisplay
												key={m.toolInvocations[0].toolCallId}
												toolInvocation={m.toolInvocations[0]}
												addToolResult={addToolResult}
											/>
										</div>
									)}
							</CardContent>
						</Card>
					))}
				</ScrollArea>
				<form onSubmit={handleSubmit} className="flex gap-2">
					<Input
						value={input}
						onChange={handleInputChange}
						placeholder="Type your message..."
						className="flex-grow"
					/>
					<Button type="submit">Send</Button>
				</form>
			</div>

			{/* Right column: Generative UI display */}
			<div className="w-1/2 p-4 flex items-center justify-center">
				<div className="max-w-md w-full">
					<AnimatePresence mode="wait">
						{currentToolToDisplay && (
							<ToolInvocationDisplay
								key={currentToolToDisplay.toolCallId}
								toolInvocation={currentToolToDisplay}
								addToolResult={addToolResult}
							/>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
