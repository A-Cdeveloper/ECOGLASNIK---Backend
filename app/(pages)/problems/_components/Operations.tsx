"use client";
import IconButton from "@/app/_components/ui/Buttons/IconButton";
import Link from "next/link";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { cloneProblemByIdAction, deleteProblemByIdAction } from "../_actions";
// import { cloneCategoryByIdAction, deleteCategoryByIdAction } from "../_actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Operations = (row: any) => {
  return (
    <div className="flex justify-end items-center space-x-[8px] text-[18px] text-winter-100/70">
      <Link href={`/problems/${row.row.id}`}>
        <HiOutlineEye />
      </Link>
      <Link href={`/problems/${row.row.id}/edit`}>
        <HiOutlinePencil />{" "}
      </Link>
      <IconButton
        onClick={async () => {
          await cloneProblemByIdAction(row.row.id);
        }}
        icon={<HiOutlineDocumentDuplicate />}
      />
      <IconButton
        onClick={async () => {
          await deleteProblemByIdAction(row.row.id);
        }}
        icon={<HiOutlineTrash />}
      />
    </div>
  );
};

export default Operations;
