import { createResource } from "@/lib/actions/resources";
import { findRelevantContent } from "@/lib/ai/embedding";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(request: Request) {
	const { messages } = await request.json();

	const result = streamText({
		model: openai("gpt-4o"),
		system: `You are a helpful assistant that ALWAYS checks the knowledge base first before responding.

Follow these steps for EVERY question:
1. ALWAYS use the getInformation tool first to check the knowledge base
2. If relevant information is found, use ONLY that information to answer
3. If no relevant information is found, respond with "Sorry, I don't know."

Never skip checking the knowledge base, and never provide information from your general knowledge without checking the knowledge base first.`,
		messages,
		tools: {
			addResource: tool({
				description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
				parameters: z.object({
					content: z
						.string()
						.describe("the content or resource to add to the knowledge base"),
				}),
				execute: async ({ content }) => createResource({ content }),
			}),
			getInformation: tool({
				description: `get information from your knowledge base to answer questions.`,
				parameters: z.object({
					question: z.string().describe("the users question"),
				}),
				execute: async ({ question }) => findRelevantContent(question),
			}),
		},
	});

	return result.toDataStreamResponse();
}
