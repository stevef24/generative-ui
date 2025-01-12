import { AccountInfo } from "@/types/tools";

export const sampleAccounts: AccountInfo[] = [
	{
		id: "flexplus",
		name: "FlexPlus",
		about:
			"Our packaged bank account. Get worldwide family travel and mobile phone insurance, plus UK and European breakdown cover. Conditions apply.",
		fees: "£18 a month",
		branchAccess: "Unlimited access",
		overdraft:
			"Yes, depending on our view of your circumstances. 0% for the first £50, then 39.9% APR Representative (variable)",
		rewardsAndBenefits: [
			"Worldwide travel and mobile insurance for you and your family.",
			"UK and European breakdown cover.",
			"No Nationwide transaction fees for using your Visa debit card abroad.",
			"Access to exclusive member-only products like our Flex Regular Saver and Flex Instant Saver.",
		],
		switchProcess: "You can switch to a FlexPlus in just 7 working days.",
		jointAccount: true,
		cardFeatures: "Yes",
		textAlerts: true,
		onlineBanking: true,
		additionalExtras: [
			"Chequebook on request.",
			"Optional paperless statements.",
		],
		moreInfoLink: "/current-accounts/flexplus",
	},
	{
		id: "flexdirect",
		name: "FlexDirect",
		about:
			"Our self-service bank account that pays you to bank with us. Get 5% interest on your money and 1% cashback on debit card purchases for 12 months. Conditions apply.",
		fees: "No monthly fee",
		branchAccess: "Limited access. You'll bank online most of the time",
		overdraft:
			"Yes, depending on our view of your circumstances. 0% for the first £50, then 39.9% APR Representative (variable)",
		rewardsAndBenefits: [
			"Access to 5% AER (4.89% gross a year) fixed in-credit interest for 12 months. Conditions apply.",
			"Up to £60 cashback on debit card purchases for 12 months. Conditions apply.",
			"Access to exclusive member-only products like our Flex Regular Saver and Flex Instant Saver.",
		],
		switchProcess: "You can switch to a FlexDirect in just 7 working days.",
		jointAccount: true,
		cardFeatures: "Yes",
		textAlerts: true,
		onlineBanking: true,
		additionalExtras: ["Chequebook on request.", "Paperless statements."],
		moreInfoLink: "/current-accounts/flexdirect",
	},
	{
		id: "flexaccount",
		name: "FlexAccount",
		about: "Our everyday bank account. Bank your way.",
		fees: "No monthly fee",
		branchAccess: "Unlimited access",
		overdraft:
			"Yes, depending on our view of your circumstances. 0% for the first £50, then 39.9% APR Representative (variable)",
		rewardsAndBenefits: [
			"Access to exclusive member-only products like our Flex Regular Saver and Flex Instant Saver.",
		],
		switchProcess: "You can switch to a FlexAccount in just 7 working days.",
		jointAccount: true,
		cardFeatures: "Yes",
		textAlerts: true,
		onlineBanking: true,
		additionalExtras: [
			"Chequebook on request.",
			"Optional paperless statements.",
		],
		moreInfoLink: "/current-accounts/flexaccount",
	},
];
