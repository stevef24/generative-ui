import { sampleAccounts } from "@/app/data/data";

import { findRelevantContent } from "@/lib/ai/embedding";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(request: Request) {
	const { messages } = await request.json();

	const result = streamText({
		model: openai("gpt-4o"),
		system: `You are a helpful Nationwide building society assistant that can provide information about benefits and also check the knowledge base.

		if the user asks for information about benefits: try and find the information in the knowledge base and return it if it exists/ else return sorry we don't have that information.
		
		when a user asks for a comparison of the current accounts:
		1. Use the getCurrentAccountComparison tool to show a comparison of the current accounts

		when a user asks for information about the current accounts:
		1. Use the getCurrentAccounts tool to show information about the current account
		
		`,
		messages,
		tools: {
			getInformation: tool({
				description: `get information from your knowledge base to answer questions.`,
				parameters: z.object({
					question: z.string().describe("the users question"),
				}),
				execute: async ({ question }) => {
					const result = await findRelevantContent(question);
					return result[0];
				},
			}),
			getCurrentAccounts: tool({
				description: `this is information about the current accounts if the user asks for information about the current accounts`,
				parameters: z.object({
					account: z.string().describe("the account to get information about"),
				}),
				execute: async () => {
					return {
						accounts: [
							{
								id: "flexplus",
								name: "FlexPlus",
								description:
									"Our packaged bank account. Get worldwide family travel and mobile phone insurance, plus UK and European breakdown cover.",
								monthlyFee: 18,
								imageSrc: "/images/flexplus-hero-clay-decorative-large.png", // Default icon path
								link: "https://www.nationwide.co.uk/current-accounts/flexplus",
								features: [
									"Travel insurance",
									"Phone insurance",
									"Breakdown cover",
								],
							},
							{
								id: "flexdirect",
								name: "FlexDirect",
								description:
									"Our self-service bank account that pays you to bank with us. Get 5% interest on your money and 1% cashback on debit card purchases for 12 months.",
								monthlyFee: 0,
								imageSrc: "/images/flexdirect-hero-clay-decorative-large.png",
								link: "https://www.nationwide.co.uk/current-accounts/flexdirect",
								features: ["5% interest", "1% cashback", "No monthly fee"],
							},
							{
								id: "flexaccount",
								name: "FlexAccount",
								description: "Our everyday bank account. Bank your way.",
								monthlyFee: 0,
								imageSrc: "/images/flexaccount-hero-clay-decorative-large.png", // Default icon path
								link: "https://www.nationwide.co.uk/current-accounts/flexaccount",
								features: ["No monthly fee", "Basic banking"],
							},
						],
					};
				},
			}),
			getOtherBankAccounts: tool({
				description: `this is information about the other bank accounts if the user asks for information about the other bank accounts`,
				parameters: z.object({
					account: z.string().describe("the account to get information about"),
				}),
				execute: async () => {
					return {
						accounts: [
							{
								id: "flexBasic",
								name: "FlexBasic",
								description:
									"Our packaged bank account. Get worldwide family travel and mobile phone insurance, plus UK and European breakdown cover.",
								monthlyFee: 0,
								imageSrc: "/images/flexbasic-hero-clay-decorative-large.png", // Default icon path
								link: "https://www.nationwide.co.uk/current-accounts/flexbasic",
								features: ["No monthly fee"],
							},
							{
								id: "flexOne",
								name: "FlexOne",
								description:
									"Our self-service bank account that pays you to bank with us. Get 5% interest on your money and 1% cashback on debit card purchases for 12 months.",
								monthlyFee: 0,
								imageSrc: "/images/flexone-hero-clay-decorative-large.png",
								link: "https://www.nationwide.co.uk/current-accounts/flexone",
								features: ["No monthly fee"],
							},
							{
								id: "flexStudent",
								name: "FlexStudent",
								description: "Our everyday bank account. Bank your way.",
								monthlyFee: 0,
								imageSrc: "/images/flexstudent-hero-clay-decorative-large.png", // Default icon path
								link: "https://www.nationwide.co.uk/current-accounts/flexstudent",
								features: ["No monthly fee", "Basic banking"],
							},
						],
					};
				},
			}),
			getCurrentAccountComparison: tool({
				description: `get a comparison of the current accounts if form of a table with the following columns: About, Fees, Branch Access, Arranged Overdraft, Rewards and Benefits, Switch your current account to Nationwide, Can be a joint account?, Card features, Text alerts, Online Banking, Additional Extras this is if the user asks for a comparison`,
				parameters: z.object({}),
				execute: async () => {
					return {
						accounts: sampleAccounts,
					};
				},
			}),
		},
	});

	return result.toDataStreamResponse();
}
