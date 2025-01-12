export interface ToolResult {
	toolCallId: string;
	result: string;
}

export interface BaseToolProps<
	T extends Record<string, unknown> = Record<string, unknown>
> {
	toolInvocation: {
		toolName: string;
		toolCallId: string;
		parameters?: T;
	} & ({ state: "call" } | { state: "result"; result: string });
	addToolResult: (result: ToolResult) => void;
}

export interface Benefit {
	category: string;
	description: string;
}

export interface BenefitResult extends ToolResult {
	benefits: Benefit[];
}

export interface ConfirmationResult extends ToolResult {
	confirmed: boolean;
}

export interface AccountInfo {
	id: string;
	name: string;
	about: string;
	fees: string;
	branchAccess: string;
	overdraft: string;
	rewardsAndBenefits: string[];
	switchProcess: string;
	jointAccount: boolean;
	cardFeatures: string;
	textAlerts: boolean;
	onlineBanking: boolean;
	additionalExtras: string[];
	moreInfoLink: string;
}
