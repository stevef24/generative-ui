import { BaseToolProps } from "@/types/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WeatherTool({ toolInvocation }: BaseToolProps) {
	if (!("result" in toolInvocation)) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Weather Information</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
						<p>Fetching weather data...</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	const result = toolInvocation.result;

	return (
		<Card className="overflow-hidden">
			<CardHeader>
				<CardTitle>Weather Information</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-2 p-4 bg-blue-400 rounded-lg text-white">
					<div className="flex justify-between items-center">
						<div className="text-4xl font-medium">
							{result.value}°{result.unit === "celsius" ? "C" : "F"}
						</div>
						<div className="h-9 w-9 bg-amber-400 rounded-full" />
					</div>
					<div className="flex gap-2 justify-between">
						{result.weeklyForecast.map(
							(forecast: { day: string; value: number }) => (
								<div key={forecast.day} className="flex flex-col items-center">
									<div className="text-xs">{forecast.day}</div>
									<div>{forecast.value}°</div>
								</div>
							)
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
