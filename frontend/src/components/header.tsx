import { Scale } from "lucide-react";
import Link from "next/link";

export default function Header() {
	const scrollToAbout = () => {
		document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<header className="border-b bg-white shadow-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link className="flex items-center space-x-3" href="/">
						<div className="p-2 bg-primary rounded-lg shadow-md">
							<Scale className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="text-xl font-bold text-secondary">
								Nepal AI Legal Assistant
							</h1>
							<p className="text-sm text-gray-600">न्यायिक सहायता प्रणाली</p>
						</div>
					</Link>
					<nav className="hidden md:flex space-x-6">
						<Link
							// onClick={scrollToAbout}
							href={"/#about"}
							className="text-secondary hover:text-primary transition-colors font-medium"
						>
							About
						</Link>
						<Link
							href="/chat"
							className="text-secondary hover:text-primary transition-colors font-medium"
						>
							Chat
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}
