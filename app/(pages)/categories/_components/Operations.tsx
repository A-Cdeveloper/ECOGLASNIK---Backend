"use client";
import IconButton from "@/app/_components/ui/Buttons/IconButton";
import Link from "next/link";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { cloneCategoryByIdAction, deleteCategoryByIdAction } from "../_actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Operations = (row: any) => {
  return (
    <div className="flex justify-end items-center space-x-[8px] text-[18px] text-winter-100/70">
      <Link href={`/categories/${row.row.cat_id}`}>
        <HiOutlineEye />
      </Link>
      <Link href={`/categories/${row.row.cat_id}/edit`}>
        <HiOutlinePencil />{" "}
      </Link>
      <IconButton
        onClick={async () => {
          await cloneCategoryByIdAction(row.row.cat_id);
        }}
        icon={<HiOutlineDocumentDuplicate />}
      />
      <IconButton
        onClick={async () => {
          await deleteCategoryByIdAction(row.row.cat_id);
        }}
        icon={<HiOutlineTrash />}
      />
    </div>
  );
};

export default Operations;
