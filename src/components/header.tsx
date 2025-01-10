import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export function Header() {
	return (
		<header className=" container mx-auto sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
			<div className="flex items-center gap-2">
				<Image
					src="/nationwide.png"
					alt="Nationwide Logo"
					width={24}
					height={24}
					className="w-6 h-6"
				/>
				<h1 className="font-semibold">Nationwide GPT</h1>
			</div>
			<ModeToggle />
		</header>
	);
}
