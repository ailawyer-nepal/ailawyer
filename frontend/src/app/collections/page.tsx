"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const [collections, setCollections] = React.useState<{ name: string }[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    (async function () {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/lawyer/collections",
        );
        const data = await res.json();
        console.log(data);
        setCollections(data.collections);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleCollectionClick(collection: string) {
    router.push(`/chatbot?collection=${collection}`);
  }

  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center my-4">Collections</h1>
        <div className="grid gap-2 place-items-center place-content-center">
          {collections.map((collection, index) => (
            <button
              key={index}
              className="flex gap-2 text-2xl bg-slate-700 border p-2 rounded-lg"
              onClick={() => handleCollectionClick(collection.name)}
            >
              <span className="capitalize">
                {collection.name.split("_").join(" ")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
