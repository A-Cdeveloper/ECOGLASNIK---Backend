"use client";

import Button from "@/app/_components/ui/Buttons/Button";
import Modal from "@/app/_components/ui/PromptsAndModals/Modal";
import { useState } from "react";
import { deleteProfileAction } from "../_actions";
import { useRouter } from "next/navigation";
import SuccessFormMessage from "@/app/_components/ui/Form/SuccessFormMessage";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";

const ProfileDelete = ({ userId }: { userId: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [response, setResponse] = useState({
    success: false,
    message: [] as string[],
  });

  const modalHandler = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      {isModalOpen && (
        <Modal
          message={`Da li ste sigurni?`}
          onClose={() => setIsModalOpen(false)} // Close modal
          onConfirm={async () => {
            const actionResponse = (await deleteProfileAction(userId)) as {
              success: boolean;
              message: string[];
            };
            setResponse(actionResponse);
            setTimeout(() => router.replace("/"), 3000);
          }}
        />
      )}

      <div className="text-end  w-full col-span-3 border-t border-b border-secondary-500/20 py-2 mt-4">
        {/* Success and error messages */}
        {response.message.length > 0 &&
          (response.success ? (
            <SuccessFormMessage message={response.message} />
          ) : (
            <ErrorsFormMessage errors={response.message} />
          ))}
        <Button variation="danger" onClick={modalHandler}>
          Obriši nalog
        </Button>
      </div>
    </>
  );
};

export default ProfileDelete;
