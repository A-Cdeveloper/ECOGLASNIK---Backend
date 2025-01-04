"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";
import MiniSpinner from "../MiniSpinner";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit" variation="info" disabled={pending}>
        {pending ? (
          <div className="flex items-center gap-x-2">
            <MiniSpinner />
            Loading...
          </div>
        ) : (
          children
        )}
      </Button>
    </>
  );
}
