import { WeatherTool } from "@/components/tools/WeatherTool";
import { LocationTool } from "@/components/tools/LocationTool";
import { ConfirmationTool } from "@/components/tools/ConfirmationTool";

export const toolComponents = {
	getWeatherInformation: WeatherTool,
	getLocation: LocationTool,
	askForConfirmation: ConfirmationTool,
} as const;

export type ToolName = keyof typeof toolComponents;
