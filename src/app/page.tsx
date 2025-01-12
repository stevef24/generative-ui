"use client";

import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "@/components/chat-input";
import { Header } from "@/components/header";
import { AccountCardsContainer } from "@/components/AccountCard";
import { CurrentAccountsTable } from "@/components/tools/ComparisonTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: "/api/chat",
		maxSteps: 2,
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)]">
			<Header />
			<ScrollArea className="flex-1 p-4">
				<div className="space-y-4 max-w-6xl mx-auto">
					{messages.map((m) => (
						<div
							key={m.id}
							className={`flex ${
								m.role === "user" ? "justify-end" : "justify-start"
							}`}
						>
							{m.role === "assistant" && (
								<Avatar className="w-8 h-8 mr-2">
									<AvatarImage src="/nationwide.png" alt="AI" />
									<AvatarFallback>AI</AvatarFallback>
								</Avatar>
							)}
							<div
								className={`rounded-lg p-3 max-w-[100%] ${
									m.role === "user"
										? "bg-primary text-primary-foreground"
										: "bg-secondary text-secondary-foreground"
								}`}
							>
								{m.toolInvocations ? (
									<>
										{m.toolInvocations.map((t) => {
											console.log("Tool Invocation:", {
												toolName: t.toolName,
												state: t.state,
												toolCallId: t.toolCallId,
											});

											switch (t.toolName) {
												case "getCurrentAccounts":
													return t.state === "call" ? (
														<div
															key={t.toolCallId}
															className="flex items-center gap-2"
														>
															<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
															<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
																Fetching accounts...
															</span>
														</div>
													) : t.state === "result" ? (
														<AccountCardsContainer
															key={t.toolCallId}
															accounts={t.result.accounts}
														/>
													) : null;
												case "getCurrentAccountComparison":
													return t.state === "call" ? (
														<div
															key={t.toolCallId}
															className="flex items-center gap-2"
														>
															<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
															<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
																Comparing accounts...
															</span>
														</div>
													) : t.state === "result" ? (
														<CurrentAccountsTable
															key={t.toolCallId}
															accounts={t.result.accounts}
														/>
													) : null;
												case "getInformation":
													return t.state === "call" ? (
														<div
															key={t.toolCallId}
															className="flex items-center gap-2"
														>
															<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
															<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
																Fetching information...
															</span>
														</div>
													) : t.state === "result" ? (
														<p
															key={t.toolCallId}
															className="whitespace-pre-wrap"
														>
															{t.result.content}
														</p>
													) : null;
												default:
													return null;
											}
										})}
										{!m.toolInvocations.some(
											(t) =>
												t.toolName === "getCurrentAccounts" ||
												t.toolName === "getCurrentAccountComparison"
										) && <p className="whitespace-pre-wrap">{m.content}</p>}
									</>
								) : (
									<p className="whitespace-pre-wrap">{m.content}</p>
								)}
							</div>
							{m.role === "user" && (
								<Avatar className="w-8 h-8 ml-2">
									<AvatarFallback>
										<User className="w-6 h-6" />
									</AvatarFallback>
								</Avatar>
							)}
						</div>
					))}
					<div ref={messagesEndRef} />
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
