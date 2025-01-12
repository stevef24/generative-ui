import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { AccountInfo } from "@/types/tools";

interface CurrentAccountsTableProps {
	accounts: AccountInfo[];
}

export const CurrentAccountsTable: React.FC<CurrentAccountsTableProps> = ({
	accounts,
}) => {
	const rows = [
		{ key: "about", label: "About" },
		{ key: "fees", label: "Fees" },
		{ key: "branchAccess", label: "Branch access and telephone support" },
		{ key: "overdraft", label: "Arranged overdraft available" },
		{ key: "rewardsAndBenefits", label: "Rewards and benefits" },
		{
			key: "switchProcess",
			label: "Switch your current account to Nationwide",
		},
		{ key: "jointAccount", label: "Can be a joint account?" },
		{ key: "cardFeatures", label: "Card features" },
		{
			key: "textAlerts",
			label: "Text alerts to help you manage your current account",
		},
		{
			key: "onlineBanking",
			label: "Internet Bank, Banking app and telephone banking access",
		},
		{ key: "additionalExtras", label: "Additional extras" },
	];

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[200px] bg-gray-800 text-white">
						Feature
					</TableHead>
					{accounts.map((account) => (
						<TableHead key={account.id} className="bg-gray-800 text-white">
							{account.name}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={row.key}>
						<TableCell className="font-medium">{row.label}</TableCell>
						{accounts.map((account) => (
							<TableCell key={`${account.id}-${row.key}`}>
								{renderCellContent(account, row.key)}
							</TableCell>
						))}
					</TableRow>
				))}
				<TableRow>
					<TableCell className="font-medium">Find out more and apply</TableCell>
					{accounts.map((account) => (
						<TableCell key={`${account.id}-more-info`}>
							<Button asChild variant="outline">
								<a href={account.moreInfoLink}>More about {account.name}</a>
							</Button>
						</TableCell>
					))}
				</TableRow>
			</TableBody>
		</Table>
	);
};

function renderCellContent(account: AccountInfo, key: string) {
	switch (key) {
		case "rewardsAndBenefits":
		case "additionalExtras":
			return (
				<ul className="list-disc pl-5">
					{account[key].map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			);
		case "jointAccount":
		case "textAlerts":
		case "onlineBanking":
			return account[key] ? (
				<Check className="text-green-500" />
			) : (
				<X className="text-red-500" />
			);
		default:
			return account[key];
	}
}

export default CurrentAccountsTable;
