"use client";
import IconButton from "@/app/_components/ui/Buttons/IconButton";
import Link from "next/link";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { deleteUserAction } from "../_actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Operations = (row: any) => {
  return (
    <div className="flex justify-end items-center space-x-[8px] text-[18px] text-winter-100/70">
      <Link href={`/users/${row.row.uid}/edit`}>
        <HiOutlinePencil />{" "}
      </Link>

      <IconButton
        onClick={async () => {
          await deleteUserAction(row.row.uid);
        }}
        icon={<HiOutlineTrash />}
      />
    </div>
  );
};

export default Operations;
