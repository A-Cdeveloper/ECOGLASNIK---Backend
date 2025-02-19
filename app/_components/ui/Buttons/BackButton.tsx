"use client";

import { useRouter } from "next/navigation";

const BackButton = ({ to }: { to?: string }) => {
  const router = useRouter();

  return (
    <div className="mb-4">
      <button
        onClick={() => {
          return to ? router.replace(to) : router.back();
        }}
        className="border-transparent text-secondary-900 hover:text-secondary-500 -ms-2 print:hidden"
      >
        &laquo; Nazad
      </button>
    </div>
  );
};

export default BackButton;
