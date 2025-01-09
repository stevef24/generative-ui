import { ToolInvocation } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ToolInvocationDisplayProps {
  toolInvocation: ToolInvocation
  addToolResult: (result: { toolCallId: string; result: string }) => void
}

export default function ToolInvocationDisplay({
  toolInvocation,
  addToolResult,
}: ToolInvocationDisplayProps) {
  const toolCallId = toolInvocation.toolCallId

  if (toolInvocation.toolName === "askForConfirmation") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Confirmation Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{toolInvocation.args.message}</p>
          {"result" in toolInvocation ? (
            <p className="font-bold">{toolInvocation.result}</p>
          ) : (
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
                    result: "No, denied",
                  })
                }
              >
                No
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (toolInvocation.toolName === "getWeatherInformation" && "result" in toolInvocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 p-4 bg-blue-400 rounded-lg text-white">
            <div className="flex justify-between items-center">
              <div className="text-4xl font-medium">
                {toolInvocation.result.value}°
                {toolInvocation.result.unit === "celsius" ? "C" : "F"}
              </div>
              <div className="h-9 w-9 bg-amber-400 rounded-full" />
            </div>
            <div className="flex gap-2 justify-between">
              {toolInvocation.result.weeklyForecast.map(
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
    )
  }

  if (toolInvocation.toolName === "getLocation" && "result" in toolInvocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Location</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User is in {toolInvocation.result}.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{toolInvocation.toolName}</CardTitle>
      </CardHeader>
      <CardContent>
        {"result" in toolInvocation ? (
          <p>{toolInvocation.result}</p>
        ) : (
          <p>Calling {toolInvocation.toolName}...</p>
        )}
      </CardContent>
    </Card>
  )
}

