import { Message } from "ai";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import ToolInvocationDisplay from "./ToolInvocationDisplay";
import { ToolName } from "@/utils/toolRegistry";
import { Wrench } from "lucide-react";

interface ChatMessageProps {
	message: Message & {
		function_call?: {
			name: string;
			arguments: string;
		};
	};
	addToolResult: (result: { toolCallId: string; result: string }) => void;
}

export function ChatMessage({ message, addToolResult }: ChatMessageProps) {
	const isAI = message.role === "assistant";
	const functionCall = message.function_call;
	const messageContent = message.content;
	const isToolCall = Boolean(functionCall);
	const isToolResult = message.content?.length === 0;

	return (
		<Card
			className={cn(
				"mb-4 border-0 shadow-none max-w-3xl mx-auto",
				isAI ? "bg-muted/50" : "bg-background"
			)}
		>
			<CardContent className="p-4">
				<div className="flex items-start gap-4">
					<div className="rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
						{isAI ? (
							<Image
								src="/nationwide.png"
								alt="Nationwide AI"
								width={24}
								height={24}
								className="w-6 h-6"
							/>
						) : (
							<User className="w-6 h-6" />
						)}
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-semibold">{isAI ? "AI" : "You"}</span>
							{isToolCall && functionCall && (
								<span className="flex items-center gap-1 text-xs text-muted-foreground">
									<Wrench className="w-3 h-3" />
									Using tool: {functionCall.name}
								</span>
							)}
						</div>

						{messageContent && (
							<div className="text-sm mb-3">{messageContent}</div>
						)}

						{isToolResult && (
							<div className="space-y-3">
								<div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
									<div className="font-medium mb-1 text-xs uppercase tracking-wide">
										Tool Parameters
									</div>
									<span className="italic font-light">
										{"calling tool: " + message?.toolInvocations?.[0].toolName}
									</span>
								</div>
								<ToolInvocationDisplay
									toolInvocation={{
										state: "call",
										toolName: message?.toolInvocations?.[0]
											.toolName as ToolName,
										toolCallId: message.id,
										args: message?.toolInvocations?.[0].args,
									}}
									addToolResult={addToolResult}
								/>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
