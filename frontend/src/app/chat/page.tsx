"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Scale,
	Send,
	Trash2,
	Bot,
	User,
	ArrowLeft,
	Loader2,
} from "lucide-react";
import Link from "next/link";

interface Message {
	id: string;
	content: string;
	sender: "user" | "bot";
	timestamp: Date;
	chunks?: any;
}

interface Collection {
	name: string;
}

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [selectedCollection, setSelectedCollection] = useState<string>("");
	const [collections, setCollections] = useState<Collection[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(async function() {
			try {
				const res = await fetch(
					process.env.NEXT_PUBLIC_API_BASE_URL + "/lawyer/collections",
				);
				const data = await res.json();
				setCollections(data.collections);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = async () => {
		if (!inputValue.trim() || !selectedCollection) return;

		const userMessage: Message = {
			id: crypto.randomUUID(),
			sender: "user",
			content: inputValue,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsLoading(true);
		setIsTyping(true);

		try {
			const botResponse: Message = {
				id: crypto.randomUUID(),
				content: `${inputValue}`,
				sender: "bot",
				timestamp: new Date(),
			};

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/lawyer`,
				{
					method: "POST",
					body: JSON.stringify({
						query: inputValue,
						collection_name: selectedCollection,
						history: JSON.stringify(messages),
						chunks: JSON.stringify(
							messages.map((m) => m.chunks).filter(Boolean),
						),
					}),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			const data = await res.json();
			console.log(data);

			if (data.response) {
				botResponse.content = data.response;
				botResponse.chunks = data.chunks;
			}

			setMessages((prevMessages) => [...prevMessages, botResponse]);
		} catch (error) {
			console.error("Failed to send message:", error);
		} finally {
			setIsLoading(false);
			setIsTyping(false);
		}
	};

	const clearChat = () => {
		setMessages([]);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Header */}
			<header className="border-b bg-white shadow-sm sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Button variant="ghost" size="sm" asChild>
								<Link href="/">
									<ArrowLeft className="h-4 w-4 mr-2" />
									Back
								</Link>
							</Button>
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-primary rounded-lg shadow-md">
									<Bot className="h-5 w-5 text-white" />
								</div>
								<div>
									<h1 className="text-lg font-bold text-secondary">
										AI Lawyer
									</h1>
									<p className="text-sm text-gray-600">Legal Assistant Chat</p>
								</div>
							</div>
						</div>
						<Button variant="outline" size="sm" onClick={clearChat}>
							<Trash2 className="h-4 w-4 mr-2" />
							Clear Chat
						</Button>
					</div>
				</div>
			</header>

			{/* Collection Selection */}
			<div className="border-b bg-white shadow-sm p-4">
				<div className="container mx-auto max-w-4xl">
					<div className="space-y-2">
						<label className="text-sm font-medium text-secondary">
							Select Legal Collection:
						</label>
						<Select
							value={selectedCollection}
							onValueChange={setSelectedCollection}
						>
							<SelectTrigger className="w-full max-w-md border-2 focus:border-primary [&_*]:text-black">
								<SelectValue placeholder="Choose a legal collection..." />
							</SelectTrigger>
							<SelectContent>
								{collections.map((collection) => (
									<SelectItem key={collection.name} value={collection.name}>
										<div>
											<div className="font-medium">
												{collection.name
													.split("_")
													.map((word) =>
														word
															.split("")
															.map((letter, index) =>
																index === 0 ? letter.toUpperCase() : letter,
															)
															.join(""),
													)
													.join(" ")}
											</div>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* Chat Messages */}
			<div className="flex-1 overflow-y-auto p-4">
				<div className="container mx-auto max-w-4xl space-y-4">
					{messages.length === 0 ? (
						<Card className="border-0 shadow-lg bg-white">
							<CardHeader className="text-center">
								<div className="p-4 bg-gradient-to-br from-primary to-primary-light rounded-full w-fit mx-auto mb-4">
									<Scale className="h-12 w-12 text-white" />
								</div>
								<CardTitle className="text-2xl text-secondary">
									Welcome to AI Legal Assistant
								</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="text-gray-600 mb-4">
									Select a legal collection above and ask your legal question.
									I'm here to help you understand Nepalese law and legal
									procedures.
								</p>
								<p className="text-sm text-gray-500">
									Please note: This AI provides general legal information and
									should not replace professional legal advice.
								</p>
							</CardContent>
						</Card>
					) : (
						messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${message.sender === "user"
											? "bg-primary text-white"
											: "bg-white border text-gray-800"
										}`}
								>
									<div className="flex items-start space-x-2">
										{message.sender === "bot" && (
											<Bot className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
										)}
										{message.sender === "user" && (
											<User className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
										)}
										<div className="flex-1">
											<p className="whitespace-pre-wrap">{message.content}</p>
											<p
												className={`text-xs mt-2 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}
											>
												{message.timestamp.toLocaleTimeString()}
											</p>
										</div>
									</div>
								</div>
							</div>
						))
					)}

					{isTyping && (
						<div className="flex justify-start">
							<div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white border shadow-md">
								<div className="flex items-center space-x-2">
									<Bot className="h-5 w-5 text-primary" />
									<div className="flex space-x-1">
										<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "0.1s" }}
										></div>
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "0.2s" }}
										></div>
									</div>
								</div>
							</div>
						</div>
					)}

					<div ref={messagesEndRef} />
				</div>
			</div>

			{/* Input Area */}
			<div className="border-t bg-white shadow-lg p-4 sticky bottom-0 text-black">
				<div className="container mx-auto max-w-4xl">
					<div className="flex space-x-2">
						<Input
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder={
								selectedCollection
									? "Ask your legal question..."
									: "Please select a collection first..."
							}
							disabled={!selectedCollection || isLoading}
							className="flex-1 rounded-full border-2 focus:border-primary"
						/>
						<Button
							onClick={handleSendMessage}
							disabled={!inputValue.trim() || !selectedCollection || isLoading}
							className="rounded-full bg-primary hover:bg-primary-light px-6 shadow-md"
						>
							{isLoading ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<Send className="h-4 w-4" />
							)}
						</Button>
					</div>
					<p className="text-xs text-gray-500 mt-2 text-center">
						Press Enter to send • This AI provides general legal information
						only
					</p>
				</div>
			</div>
		</div>
	);
}
