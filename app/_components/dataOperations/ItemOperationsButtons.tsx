/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Button from "@/app/_components/ui/Buttons/Button";
import { redirect, useRouter } from "next/navigation";

type ItemOperationsButtonsProps<T> = {
  id: T;
  basePath: string; // Base path for the dynamic route, e.g., "problems", "categories"
  cloneAction?: (id: T) => Promise<any>; // Accept any return type
  deleteAction: (id: T) => Promise<any>; // Accept any return type
};

const ItemOperationsButtons = <T extends number | string>({
  id,
  basePath,
  cloneAction,
  deleteAction,
}: ItemOperationsButtonsProps<T>) => {
  const router = useRouter();

  return (
    <div className="flex justify-end items-center space-x-[8px] text-[18px] text-winter-100/70">
      <Button
        variation="info"
        onClick={() => {
          router.push(`/${basePath}/${id}/edit`);
        }}
      >
        Izmeni
      </Button>
      {cloneAction && (
        <Button
          variation="secondary"
          onClick={async () => {
            await cloneAction(id);
            redirect(`/${basePath}`);
          }}
        >
          Kloniraj
        </Button>
      )}

      <Button
        variation="danger"
        onClick={async () => {
          await deleteAction(id);
          redirect(`/${basePath}`);
        }}
      >
        Obriši
      </Button>
    </div>
  );
};

export default ItemOperationsButtons;
