"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const gotToLearnMore = () => {
    router.push("/about");
  };
  const goToChat = () => {
    router.push("/chatbot");
  };

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col items-center justify-center min-h-screen mt-12 mb-12 md:flex-row gap-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-4xl font-bold text-center">Welcome to AI Lawyer</p>
          <p className="text-md text-center text-gray-400">
            The best app for getting Legal Consultant
          </p>
          <div className="flex flex-col-reverse items-center justify-center md:flex-row gap-8">
            <Button
              className="bg-white text-black w-40 hover:bg-gray-100"
              onClick={gotToLearnMore}
            >
              Learn More
            </Button>
            <Button
              className="bg-black text-white w-40 hover:bg-gray-800"
              onClick={goToChat}
            >
              Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
