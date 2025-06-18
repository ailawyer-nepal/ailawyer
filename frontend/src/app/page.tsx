"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Scale,
	BookOpen,
	MessageSquare,
	Shield,
	Globe,
	Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			{/* Hero Section */}
			<section className="py-20 px-4 bg-white">
				<div className="container mx-auto text-center max-w-4xl">
					<div className="animate-fade-in">
						<div className="mb-8 flex justify-center">
							<div className="p-8 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-xl">
								<Scale className="h-20 w-20 text-white" />
							</div>
						</div>

						<h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
							Nepal AI Legal Assistant
						</h1>

						<p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
							Empowering access to legal information through AI
						</p>

						<p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
							Advanced artificial intelligence system designed to provide
							accessible legal guidance within the context of the Nepalese legal
							framework.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/#about">
								<Button
									variant="outline"
									size="lg"
									className="text-lg px-8 py-6 border-2 border-secondary text-secondary-foreground hover:bg-secondary hover:text-white transition-all duration-300"
								>
									<BookOpen className="mr-2 h-5 w-5" />
									About the Project
								</Button>
							</Link>

							<Button
								asChild
								size="lg"
								className="text-lg px-8 py-6 bg-primary hover:bg-primary-light text-white transition-all duration-300 shadow-lg hover:shadow-xl"
							>
								<Link href="/chat">
									<MessageSquare className="mr-2 h-5 w-5" />
									Ask a Legal Question
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="py-20 px-4 bg-gray-50">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-secondary mb-4">
							About the Project
						</h2>
						<div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
						<p className="text-lg text-gray-700 max-w-3xl mx-auto">
							This project explores the feasibility of artificial
							intelligence-driven analysis in the context of the Nepalese legal
							system, providing semantic understanding of legal queries with
							advanced AI technology.
						</p>
					</div>

					{/* Features Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
							<CardHeader className="text-center">
								<div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
									<MessageSquare className="h-8 w-8 text-primary" />
								</div>
								<CardTitle className="text-xl text-secondary">
									Semantic Understanding
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center text-gray-600">
									Advanced natural language processing to understand complex
									legal queries and provide contextually relevant responses.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
							<CardHeader className="text-center">
								<div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
									<Globe className="h-8 w-8 text-primary" />
								</div>
								<CardTitle className="text-xl text-secondary">
									Nepali Language Support
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center text-gray-600">
									Native support for Nepali language queries, making legal
									information accessible to all citizens of Nepal.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
							<CardHeader className="text-center">
								<div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
									<BookOpen className="h-8 w-8 text-primary" />
								</div>
								<CardTitle className="text-xl text-secondary">
									Legal Document Integration
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center text-gray-600">
									Comprehensive integration with Nepalese legal documents
									including Bima Act 2049 and other relevant legislation.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
							<CardHeader className="text-center">
								<div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
									<Zap className="h-8 w-8 text-primary" />
								</div>
								<CardTitle className="text-xl text-secondary">
									GPT-4o Powered
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center text-gray-600">
									Leverages the latest GPT-4o technology for accurate and
									comprehensive legal analysis and recommendations.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
							<CardHeader className="text-center">
								<div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
									<Shield className="h-8 w-8 text-primary" />
								</div>
								<CardTitle className="text-xl text-secondary">
									Vector Similarity Search
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center text-gray-600">
									Advanced RAG (Retrieval-Augmented Generation) system for
									precise information retrieval from legal databases.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
							<CardHeader className="text-center">
								<div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
									<Scale className="h-8 w-8 text-primary" />
								</div>
								<CardTitle className="text-xl text-secondary">
									Accessible Justice
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center text-gray-600">
									Democratizing access to legal information for both legal
									professionals and citizens unfamiliar with legal jargon.
								</CardDescription>
							</CardContent>
						</Card>
					</div>

					{/* Call to Action */}
					<div className="text-center">
						<Button
							asChild
							size="lg"
							className="text-lg px-8 py-6 bg-accent hover:bg-accent-light text-white transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							<Link href="/chat">
								<MessageSquare className="mr-2 h-5 w-5" />
								Start Your Legal Consultation
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-secondary text-white py-12 px-4">
				<div className="container mx-auto max-w-4xl">
					<div className="text-center">
						<div className="flex items-center justify-center space-x-3 mb-6">
							<Scale className="h-8 w-8 text-accent" />
							<h3 className="text-2xl font-bold">Nepal AI Legal Assistant</h3>
						</div>

						<p className="text-gray-300 mb-6 max-w-2xl mx-auto">
							This AI system is designed to provide general legal information
							and should not replace professional legal advice. Always consult
							with qualified legal professionals for specific legal matters.
						</p>

						<div className="border-t border-gray-600 pt-6">
							<p className="text-sm text-gray-400">
								© 2024 Nepal AI Legal Assistant. Built for academic research
								purposes.
							</p>
							<p className="text-xs text-gray-500 mt-2">
								Disclaimer: This tool provides general information only and does
								not constitute legal advice.
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
