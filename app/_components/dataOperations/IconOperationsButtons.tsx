/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import IconButton from "@/app/_components/ui/Buttons/IconButton";
import Link from "next/link";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import Modal from "../ui/PromptsAndModals/Modal";
import { useState } from "react";

type OperationsProps<T extends string | number> = {
  id: T;
  basePath: string;
  cloneAction?: (id: T) => Promise<any>; // Accepts any return type for flexibility
  deleteAction?: (id: T) => Promise<any>; // Accepts any return type for flexibility
};

const Operations = <T extends string | number>({
  id,
  basePath,
  cloneAction,
  deleteAction,
}: OperationsProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalHandler = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      {isModalOpen && deleteAction && (
        <Modal
          message={`Da li zaista zelite da obrisete ovu službu ${id}?`}
          onClose={() => setIsModalOpen(false)} // Close modal
          onConfirm={async () => {
            await deleteAction(id); // Call the delete action
            setIsModalOpen(false); // Close modal after action
          }}
        />
      )}

      <div className="flex justify-end items-center space-x-[8px] text-[18px] text-winter-100/70">
        {basePath !== "users" && basePath !== "partners" && (
          <Link href={`/${basePath}/${id}`}>
            <HiOutlineEye />
          </Link>
        )}
        <Link href={`/${basePath}/${id}/edit`}>
          <HiOutlinePencil />
        </Link>
        {cloneAction && (
          <IconButton
            onClick={async () => {
              await cloneAction(id);
            }}
            icon={<HiOutlineDocumentDuplicate />}
          />
        )}

        {deleteAction && (
          <IconButton onClick={modalHandler} icon={<HiOutlineTrash />} />
        )}
      </div>
    </>
  );
};

export default Operations;
