"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Headline from "./_components/ui/Headline";
import Button from "./_components/ui/Buttons/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <div>
        <Headline>404</Headline>

        <p className="mb-4">{error.message}</p>

        <Button
          type="button"
          variation="info"
          size="medium"
          onClick={() => reset()}
        >
          Pokušaj ponovo
        </Button>
      </div>
    </div>
  );
}
