"use client";
import { uploadPartnerImageAction } from "@/app/(pages)/partners/_actions";
import Image from "next/image";
import { useCallback, useState } from "react";
import MiniSpinner from "../../layout/MiniSpinner";
import ErrorsFormMessage from "./ErrorsFormMessage";

import CloseButton from "../Buttons/CloseButton";

type ImageAreaProps<T> = {
  data?: T;
  isLoadingUploadImage: boolean;
  setIsLoadingUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
  getImageUrl: (data: T | undefined) => {
    alt: string;
    src: string;
  };
  label: string;
  name: string;
};

export const ImageArea = <T,>({
  data,
  isLoadingUploadImage,
  setIsLoadingUploadImage,
  getImageUrl,
  label,
  name,
}: ImageAreaProps<T>) => {
  const [currentFileUrl, setCurrentFileUrl] = useState<string>(
    getImageUrl(data).src
  );

  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsLoadingUploadImage(true);
      const selectedFile = e.target.files?.[0];

      const { success, message } = await uploadPartnerImageAction(
        selectedFile as File
      );

      if (success) {
        setCurrentFileUrl(message![0] as string);
        setErrors([]);
      } else {
        setErrors(message as string[]);
      }
      setIsLoadingUploadImage(false);
    },
    [setIsLoadingUploadImage]
  );

  const handleRemoveImage = useCallback(() => {
    setCurrentFileUrl("");
  }, []);

  if (isLoadingUploadImage) {
    return (
      <div className="w-full h-full flex justify-center flex-wrap items-center gap-4 py-3 ">
        <>
          <MiniSpinner />
          Slika se uploaduje...
        </>
      </div>
    );
  }

  return (
    <>
      {currentFileUrl && (
        <div className="relative w-1/2">
          <CloseButton onClick={handleRemoveImage} />

          <Image
            src={currentFileUrl}
            alt={getImageUrl(data).alt}
            width={350}
            height={200}
            className="w-full overflow-hidden my-4 border-double border-4 border-secondary-100"
          />
        </div>
      )}

      <input type="hidden" name="partnerLogo" value={currentFileUrl} />

      {!isLoadingUploadImage && !currentFileUrl && (
        <>
          <input
            type="file"
            accept="image/*"
            id="image"
            name={name}
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="image"
            className="w-full relative h-9 cursor-pointer border-dashed border-1 border-secondary flex justify-center items-center  text-secondary hover:text-winter"
          >
            {label}
          </label>
        </>
      )}

      {errors.length > 0 && <ErrorsFormMessage errors={errors} />}
    </>
  );
};

export default ImageArea;
