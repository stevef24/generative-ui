import { BaseToolProps } from "@/types/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LocationTool({ toolInvocation }: BaseToolProps) {
	if (!("result" in toolInvocation)) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>User Location</CardTitle>
			</CardHeader>
			<CardContent>
				<p>User is in {toolInvocation.result}.</p>
			</CardContent>
		</Card>
	);
}
