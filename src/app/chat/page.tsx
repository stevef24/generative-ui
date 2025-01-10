"use client"

import { Message, useChat } from "ai/react"
import { ToolInvocation } from "ai"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/header"
import { ChatInput } from "@/components/chat-input"
import { ChatMessage } from "@/components/chat-message"
import { useState, useEffect } from "react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat({
      api: "/api/chat",
      maxSteps: 5,
      async onToolCall({ toolCall }) {
        switch (toolCall.toolName) {
          case "getWeatherInformation":
            return {
              value: 22,
              unit: "celsius",
              weeklyForecast: [
                { day: "Mon", value: 22 },
                { day: "Tue", value: 23 },
                { day: "Wed", value: 21 },
                { day: "Thu", value: 24 },
                { day: "Fri", value: 25 },
              ],
            }

          case "getLocation":
            const cities = ["New York", "Los Angeles", "Chicago", "San Francisco"]
            return cities[Math.floor(Math.random() * cities.length)]

          default:
            return null
        }
      },
    })

  // Filter out empty AI messages and messages without meaningful content
  const filteredMessages = messages.filter((m) => {
    if (m.role === "user") return true
    if (m.role === "assistant") {
      if (m.content.trim() !== "") return true
      if (m.toolInvocations?.[0]) {
        const tool = m.toolInvocations[0]
        return tool.toolName === "askForConfirmation" || "result" in tool
      }
    }
    return false
  })

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-3xl mx-auto pt-4 pb-20">
            {filteredMessages.map((message: Message) => (
              <ChatMessage
                key={message.id}
                message={message}
                addToolResult={addToolResult}
              />
            ))}
          </div>
        </ScrollArea>
      </main>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

