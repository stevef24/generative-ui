import { BenefitTool } from "@/components/tools/BenefitTool";
import { ConfirmationTool } from "@/components/tools/ConfirmationTool";
import { PDFProcessingTool } from "@/components/tools/PDFProcessingTool";

export const toolComponents = {
	askForConfirmation: ConfirmationTool,
	processPDF: PDFProcessingTool,
	getBenefits: BenefitTool,
} as const;

export type ToolName = keyof typeof toolComponents;
