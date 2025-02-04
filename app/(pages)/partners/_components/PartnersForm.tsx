"use client";
// import { addNewCategoryAction, updateCategoryAction } from "../_actions";
import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import { useActionState, useState } from "react";

import { Partners } from "@prisma/client";
import ErrorsForm from "../../../_components/ui/Form/ErrorsFormMessage";
import { addNewPartnerAction, updatePartnerAction } from "../_actions";
import ImageArea from "@/app/_components/ui/Form/ImageArea";

const PartnersForm = ({ partner }: { partner?: Partners }) => {
  ////////////
  const action = partner ? updatePartnerAction : addNewPartnerAction;

  const [errors, formAction] = useActionState(action, []);
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);

  return (
    <form
      action={formAction}
      className="mt-4 w-full md:w-2/3 2xl:w-1/3 space-y-2"
    >
      {partner && <input type="hidden" name="pid" value={partner.pid} />}
      <Input
        type="text"
        name="partnerName"
        placeholder="Partner"
        defaultValue={partner?.partnerName}
      />
      <ImageArea
        setIsLoadingUploadImage={setIsLoadingUploadImage}
        isLoadingUploadImage={isLoadingUploadImage}
        data={partner as Partners}
        getImageUrl={(data) => {
          return {
            alt: data?.partnerName || "",
            src: data?.partnerLogo || "",
          };
        }}
        label="Dodaj logo partnera"
        name="partnerLogo"
      />

      {errors.length > 0 && <ErrorsForm errors={errors} />}

      <SubmitButton disable={isLoadingUploadImage}>
        {partner ? "Izmeni" : "Dodaj"}
      </SubmitButton>
    </form>
  );
};

export default PartnersForm;
