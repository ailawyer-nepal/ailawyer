"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

interface Message {
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  chunks?: any;
}

export default function ChatBot() {
  const [messages, setMessages] = React.useState<Message[]>([]); // State to hold chat messages
  const [newMessage, setNewMessage] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const query = new URLSearchParams(window.location.search).get("collection");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleAddMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botResponse: Message = {
        content: `${message}`, // Simulated bot response
        sender: "bot",
        timestamp: new Date(),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lawyer`,
        {
          method: "POST",
          body: JSON.stringify({
            query: message,
            collection_name: query,
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

      if (data.response) {
        botResponse.content = data.response;
        botResponse.chunks = data.chunks;
      }

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setNewMessage("");
  };

  const handleDeleteChat = () => {
    setMessages([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddMessage(newMessage);
  };

  return (
    <div className="container mx-auto h-screen flex flex-col justify-between">
      {/* Chat Header */}
      <div className="flex flex-row justify-between items-center w-full rounded-t-lg border-b p-4">
        <h2 className="font-bitter text-2xl font-semibold">AI Lawyer</h2>
        <Button
          className="text-dark-gray hover:text-dark-red"
          onClick={handleDeleteChat}
        >
          <Trash2 size={24} />
        </Button>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 w-full"
          style={{ maxHeight: "calc(100vh - 160px)" }} // Adjusts the height based on header and footer
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 text-background ${
                  message.sender === "bot"
                    ? "bg-light-gray mr-4"
                    : "bg-light-blue ml-4"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t w-full rounded-b-lg"
        >
          <div className="flex space-x-2 h-full">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border text-background rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors flex items-center space-x-2
              disabled:bg-blue-300 disabled:cursor-not-allowed`}
              type="submit"
              disabled={!newMessage.trim()}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
