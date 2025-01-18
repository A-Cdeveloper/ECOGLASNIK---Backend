"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import Button from "./_components/ui/Buttons/Button";
import server from "@/public/server-down.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <div>
        <Image
          src={server}
          alt="server down"
          width={100}
          height={70}
          className="mx-auto"
        />

        <p className="mb-8">{error.message}</p>

        <Button
          type="button"
          variation="info"
          size="medium"
          onClick={() => router.back()}
        >
          Pokušaj ponovo
        </Button>
      </div>
    </div>
  );
}
