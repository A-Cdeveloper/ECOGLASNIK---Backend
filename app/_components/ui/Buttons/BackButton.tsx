"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="mb-4">
      <button
        onClick={() => router.back()}
        className="border-transparent text-secondary-900 hover:text-secondary-500 -ms-2"
      >
        &laquo; Nazad
      </button>
    </div>
  );
};

export default BackButton;
