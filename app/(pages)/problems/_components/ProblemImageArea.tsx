"use client";

import { ChangeEvent, useState } from "react";
import Picture from "../../../_components/ui/Picture";
import {
  deleteProblemImageAction,
  uploadProblemImageAction,
} from "../_actions";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import MiniSpinner from "@/app/_components/ui/MiniSpinner";
import CloseButton from "@/app/_components/ui/Buttons/CloseButton";

const ProblemImageArea = ({
  imageSrc,
  loadingImageUpload,
  setLoadingImageUpload,
  id,
  disabled,
}: {
  loadingImageUpload: boolean;
  setLoadingImageUpload: (value: boolean) => void;
  imageSrc: string;
  id: string;
  disabled?: boolean;
}) => {
  const [pinataData, setPinataData] = useState({
    pinata_id: "",
    image: imageSrc,
  });

  const [error, setError] = useState("");

  ////
  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoadingImageUpload(true);
    setError("");
    try {
      const uploadedPinataData = await uploadProblemImageAction(file);

      if (!uploadedPinataData) {
        return;
      }
      setPinataData((prev) => ({
        ...prev,
        pinata_id: uploadedPinataData.id,
        image: uploadedPinataData.url,
      }));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setLoadingImageUpload(false);
  }

  return (
    <>
      <input type="hidden" name="pinata_id" value={pinataData.pinata_id} />
      <input type="hidden" name="image" value={pinataData.image} />
      {pinataData.image !== "" && (
        <div className="relative !mt-8">
          <Picture
            src={pinataData.image}
            alt="Problem Image"
            className="!h-[300px] !w-full"
          />
          {!disabled && (
            <CloseButton
              onClick={async () => {
                setPinataData((prev) => ({
                  ...prev,
                  pinata_id: "",
                  image: "",
                }));
                await deleteProblemImageAction(id);
              }}
            />
          )}
        </div>
      )}
      {pinataData.image === "" && !loadingImageUpload && !disabled && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="image"
            className="hidden"
            id="image"
          />

          <label
            htmlFor="image"
            className="w-full relative h-9 cursor-pointer border-dashed border-1
       border-secondary-500/60 flex justify-center items-center  text-secondary hover:text-winter"
          >
            Dodaj fotografiju
          </label>
        </>
      )}
      {error && <ErrorsFormMessage errors={[error]} />}
      {loadingImageUpload && (
        <div className="flex  items-center gap-x-4">
          Upload fotografije: <MiniSpinner />
        </div>
      )}
    </>
  );
};

export default ProblemImageArea;
