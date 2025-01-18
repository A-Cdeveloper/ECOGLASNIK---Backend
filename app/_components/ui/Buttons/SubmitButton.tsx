"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";
import MiniSpinner from "../MiniSpinner";

export function SubmitButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit" variation="info" disabled={pending || loading}>
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
