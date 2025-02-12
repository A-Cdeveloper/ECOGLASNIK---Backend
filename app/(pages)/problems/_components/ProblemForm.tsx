"use client";

import Input from "@/app/_components/ui/Form/Input";
import Select from "@/app/_components/ui/Form/Select";
import TextArea from "@/app/_components/ui/Form/TextArea";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import { ProblemCustumTypeWithUser } from "@/app/types/prismaTypes";
import { useActionState, useState } from "react";
import { updateProblemAction } from "../_actions";
import ProblemImageArea from "./ProblemImageArea";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import Map from "../../../_components/ui/Map";
import { convertLatLngToString } from "@/app/_utils/helpers/";
import { statuses } from "./FilterOptions";
import { ProblemOfficialEmail, ProblemStatus } from "@prisma/client";
import ProblemInfoMessage from "./ProblemInfoMessage";

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

  const isNotEditable =
    problem?.officialEmail === ProblemOfficialEmail.REQUESTED ||
    problem?.officialEmail === ProblemOfficialEmail.SENDED ||
    problem?.status === ProblemStatus.ARCHIVE;

  return (
    <>
      <ProblemInfoMessage
        status={problem?.status}
        officialEmail={problem?.officialEmail}
      />
      <form action={formAction} className="mt-4 w-full 2xl:w-2/3">
        {problem && <input type="hidden" name="id" value={problem?.id} />}

        <div className="grid grid-col-1 lg:grid-cols-2 gap-6 items-start mb-4">
          {/* Left part */}
          <div className="space-y-2">
            <Input
              type="hidden"
              name="officialEmail"
              value={problem?.officialEmail}
            />
            <Input
              type="text"
              name="title"
              placeholder="Naziv Problema"
              defaultValue={problem?.title}
              readOnly={isNotEditable}
            />
            <TextArea
              name="description"
              placeholder="Opis Problema"
              defaultValue={problem?.description}
              readOnly={isNotEditable}
            />

            <ProblemImageArea
              imageSrc={problem?.image || ""}
              id={problem?.id || ""}
              loadingImageUpload={loadingImageUpload}
              setLoadingImageUpload={setLoadingImageUpload}
              disabled={isNotEditable}
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
                isDisabled={isNotEditable}
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
              disabled={isNotEditable}
            />
          </div>
        </div>

        <div className="text-end">
          {errors.length > 0 && <ErrorsFormMessage errors={errors} />}
          <SubmitButton loading={loadingImageUpload}>
            {isNotEditable &&
            problem.status === ProblemStatus.WAITING &&
            problem.officialEmail === ProblemOfficialEmail.REQUESTED
              ? "Sačuvaj izmene i pošalji"
              : "Sačuvaj izmene"}
          </SubmitButton>
        </div>
      </form>
    </>
  );
};

export default ProblemForm;
