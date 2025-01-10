import { BaseToolProps } from "@/types/tools";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ConfirmationTool({
	toolInvocation,
	addToolResult,
}: BaseToolProps) {
	const toolCallId = toolInvocation.toolCallId;

	if ("result" in toolInvocation) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Confirmation Result</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="font-bold">{toolInvocation.result}</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Confirmation Required</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-4">{toolInvocation.args.message}</p>
				<div className="flex gap-2">
					<Button
						onClick={() =>
							addToolResult({
								toolCallId,
								result: "Yes, confirmed.",
							})
						}
					>
						Yes
					</Button>
					<Button
						variant="destructive"
						onClick={() =>
							addToolResult({
								toolCallId,
								result: "No, denied.",
							})
						}
					>
						No
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
