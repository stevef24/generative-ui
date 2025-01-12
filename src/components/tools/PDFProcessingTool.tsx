import { BaseToolProps } from "@/types/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function PDFProcessingTool({ toolInvocation }: BaseToolProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.2 }}
		>
			<Card>
				<CardHeader>
					<CardTitle>Processing PDF</CardTitle>
				</CardHeader>
				<CardContent>
					{"result" in toolInvocation ? (
						<p className="text-sm text-muted-foreground">
							{toolInvocation.result}
						</p>
					) : (
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
								<p className="text-sm text-muted-foreground">
									Processing PDF and generating embeddings...
								</p>
							</div>
							<div className="h-1 w-full bg-secondary overflow-hidden rounded-full">
								<div className="h-full bg-primary animate-[progress_2s_ease-in-out_infinite]" />
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
}
