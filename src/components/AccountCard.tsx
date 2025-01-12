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
		<Card id={id} className="max-w-[600px] rounded-3xl p-6">
			<CardContent className="p-0 space-y-6">
				<div className="relative w-full aspect-[1.58/1] max-w-[400px] mx-auto">
					<Image
						src={imageSrc}
						alt={`${name} Card`}
						fill
						className="object-contain"
						priority
					/>
				</div>

				<div className="space-y-6">
					<h2 className="text-[2.5rem] font-bold ">{name}</h2>

					<p className=" text-xl leading-relaxed">{description}</p>

					<p className=" text-[2rem] font-semibold">
						{monthlyFee === 0 ? "No monthly fee" : `£${monthlyFee} monthly fee`}
					</p>

					{features.length > 0 && (
						<ul className="space-y-3">
							{features.map((feature, index) => (
								<li key={index} className="flex items-center gap-2 ">
									<Check className="h-5 w-5 " />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</CardContent>

			<CardFooter className="p-0 mt-8">
				<Link
					target="_blank"
					rel="noopener noreferrer"
					href={link}
					className=" text-xl font-semibold underline hover:no-underline"
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
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{accounts.map((account) => (
				<AccountCard key={account.id} {...account} />
			))}
		</div>
	);
};

export default AccountCard;
