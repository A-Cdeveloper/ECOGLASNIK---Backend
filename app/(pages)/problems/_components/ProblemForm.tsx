"use client";

import Input from "@/app/_components/ui/Form/Input";
import Select from "@/app/_components/ui/Form/Select";
import TextArea from "@/app/_components/ui/Form/TextArea";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import { ProblemCustumTypeWithUser } from "@/app/_utils/db/prismaTypes";
import { useActionState, useState } from "react";
import { updateProblemAction } from "../_actions";
import ProblemImageArea from "./ProblemImageArea";
import ErrorsForm from "@/app/_components/ui/Form/ErrorsForm";
import Map from "../../../_components/ui/Map";
import { convertLatLngToString } from "@/app/_utils/helpers";
import { statuses } from "./FilterOptions";

const ProblemForm = ({
  problem,
  categoriesSelection,
}: {
  categoriesSelection: { value: string; label: string }[];
  problem?: ProblemCustumTypeWithUser;
}) => {
  const [errors, formAction] = useActionState(updateProblemAction, []);

  // image upload
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
  // position
  const [defaultPosition, setDefaultPosition] = useState(problem?.position);

  return (
    <>
      <form action={formAction} className="mt-4 w-full 2xl:w-2/3">
        {problem && <input type="hidden" name="id" value={problem?.id} />}

        <div className="grid grid-col-1 lg:grid-cols-2 gap-6 items-start mb-4">
          {/* Left part */}
          <div className="space-y-2">
            <Input
              type="text"
              name="title"
              placeholder="Naziv Problema"
              defaultValue={problem?.title}
            />
            <TextArea
              name="description"
              placeholder="Opis Problema"
              defaultValue={problem?.description}
            />

            <ProblemImageArea
              imageSrc={problem?.image || ""}
              id={problem?.id || ""}
              loadingImageUpload={loadingImageUpload}
              setLoadingImageUpload={setLoadingImageUpload}
            />
          </div>

          {/* right part */}
          <div className="-mt-4 space-y-4">
            <input
              type="hidden"
              name="position"
              value={defaultPosition ? JSON.stringify(defaultPosition) : ""}
            />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] items-center gap-2 mb-4">
              Kategorija:
              <Select
                name="cat_id"
                options={categoriesSelection}
                defaultValue={problem?.category?.cat_id.toString() || ""}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] items-center gap-2">
              Status:
              <Select
                name="status"
                options={statuses}
                defaultValue={problem?.status || ""}
              />
            </div>
            <p>
              {convertLatLngToString(
                defaultPosition as { lat: number; lng: number }
              )}
            </p>
            <Map
              defaultPosition={defaultPosition as { lat: number; lng: number }}
              setDefaultPosition={setDefaultPosition}
              initialZoom={13}
            />
          </div>
        </div>

        <div className="text-end">
          {errors.length > 0 && <ErrorsForm errors={errors} />}
          <SubmitButton loading={loadingImageUpload}>Izmeni</SubmitButton>
        </div>
      </form>
    </>
  );
};

export default ProblemForm;
