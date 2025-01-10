import { ToolInvocation } from "ai";
import { BaseToolProps } from "@/types/tools";
import { toolComponents, ToolName } from "@/utils/toolRegistry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ToolInvocationDisplayProps {
	toolInvocation: ToolInvocation | null;
	addToolResult: (result: { toolCallId: string; result: string }) => void;
}

const animations = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
	transition: { duration: 0.2 },
};

function FallbackComponent({ toolInvocation }: BaseToolProps) {
	return (
		<motion.div {...animations}>
			<Card>
				<CardHeader>
					<CardTitle>{toolInvocation.toolName}</CardTitle>
				</CardHeader>
				<CardContent>
					{"result" in toolInvocation ? (
						<p>{toolInvocation.result}</p>
					) : (
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
							<p>Processing...</p>
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
}

export default function ToolInvocationDisplay({
	toolInvocation,
	addToolResult,
}: ToolInvocationDisplayProps) {
	if (!toolInvocation) return null;

	const toolName = toolInvocation.toolName as ToolName;
	const ToolComponent = toolComponents[toolName];

	if (ToolComponent) {
		return (
			<motion.div {...animations}>
				<ToolComponent
					toolInvocation={toolInvocation}
					addToolResult={addToolResult}
				/>
			</motion.div>
		);
	}

	return (
		<FallbackComponent
			toolInvocation={toolInvocation}
			addToolResult={addToolResult}
		/>
	);
}
