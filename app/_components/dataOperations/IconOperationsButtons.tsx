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
  const [modalType, setModalType] = useState<"delete" | "clone" | null>(null);

  const openDeleteModal = () => setModalType("delete");
  const openCloneModal = () => setModalType("clone");
  const closeModal = () => setModalType(null);

  return (
    <>
      {modalType === "delete" && deleteAction && (
        <Modal
          message="Da li ste sigurni?"
          onClose={closeModal}
          onConfirm={async () => {
            await deleteAction(id);
            closeModal();
          }}
        />
      )}

      {modalType === "clone" && cloneAction && (
        <Modal
          message="Da li želite da klonirate ovaj element?"
          onClose={closeModal}
          onConfirm={async () => {
            await cloneAction(id);
            closeModal();
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
            onClick={openCloneModal}
            icon={<HiOutlineDocumentDuplicate />}
          />
        )}

        {deleteAction && (
          <IconButton onClick={openDeleteModal} icon={<HiOutlineTrash />} />
        )}
      </div>
    </>
  );
};

export default Operations;
