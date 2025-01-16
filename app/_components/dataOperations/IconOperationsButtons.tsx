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
  return (
    <div className="flex justify-end items-center space-x-[8px] text-[18px] text-winter-100/70">
      {basePath !== "users" && (
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
        <IconButton
          onClick={async () => {
            await deleteAction(id);
          }}
          icon={<HiOutlineTrash />}
        />
      )}
    </div>
  );
};

export default Operations;
