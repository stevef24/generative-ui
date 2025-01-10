import { ToolInvocation } from "ai";

export interface ToolResult {
	toolCallId: string;
	result: string;
}

export interface BaseToolProps {
	toolInvocation: ToolInvocation;
	addToolResult: (result: ToolResult) => void;
}

// Tool-specific result types
export interface WeatherResult extends ToolResult {
	value: number;
	unit: "celsius" | "fahrenheit";
	weeklyForecast: Array<{
		day: string;
		value: number;
	}>;
}

export interface LocationResult extends ToolResult {
	city: string;
}

export interface ConfirmationResult extends ToolResult {
	confirmed: boolean;
}
