"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";
import MiniSpinner from "../MiniSpinner";

export function SubmitButton({
  children,
  loadingImageUpload,
}: {
  children: React.ReactNode;
  loadingImageUpload?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        type="submit"
        variation="info"
        disabled={pending || loadingImageUpload}
      >
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
