import Link from "next/link";
import React from "react";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Operations = (row: any) => {
  return (
    <div className="flex justify-end items-center gap-x-2 text-[18px] text-winter-100/70">
      <Link href={`/categories/${row.cat_id}`}>
        <HiOutlineEye />
      </Link>
      <Link href={`/categories/${row.cat_id}/edit`}>
        <HiOutlinePencil />{" "}
      </Link>
      <HiOutlineDocumentDuplicate />
      <HiOutlineTrash />
    </div>
  );
};

export default Operations;
