import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";

interface AccountCardProps {
	id: string;
	name: string;
	description: string;
	monthlyFee: number;
	imageSrc: string;
	link: string;
	features: string[];
}

interface AccountCardsContainerProps {
	accounts: AccountCardProps[];
}

export function AccountCard({
	id,
	name,
	description,
	monthlyFee,
	imageSrc,
	link,
	features,
}: AccountCardProps) {
	return (
		<Card id={id} className="rounded-3xl overflow-hidden flex flex-col h-full">
			<div className="relative w-full aspect-[1.58/1]">
				<Image
					src={imageSrc}
					alt={`${name} Card`}
					fill
					className="object-cover"
					priority
				/>
			</div>
			<CardContent className="p-6 flex flex-col gap-6 h-full">
				<h2 className="text-3xl font-bold">{name}</h2>
				<p className="text-lg leading-relaxed min-h-[6rem]">{description}</p>
				<p className="text-2xl font-semibold">
					{monthlyFee === 0 ? "No monthly fee" : `£${monthlyFee} monthly fee`}
				</p>
				<div className="flex-grow">
					{features.length > 0 && (
						<ul className="space-y-3">
							{features.map((feature, index) => (
								<li key={index} className="flex items-center gap-2">
									<Check className="h-5 w-5 flex-shrink-0" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</CardContent>
			<CardFooter className="p-6 mt-auto">
				<Link
					target="_blank"
					rel="noopener noreferrer"
					href={link}
					className="text-xl font-semibold underline hover:no-underline"
				>
					More about {name}
				</Link>
			</CardFooter>
		</Card>
	);
}

export const AccountCardsContainer: FC<AccountCardsContainerProps> = ({
	accounts,
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{accounts.map((account) => (
				<AccountCard key={account.id} {...account} />
			))}
		</div>
	);
};

export default AccountCard;
