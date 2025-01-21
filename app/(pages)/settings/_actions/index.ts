/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/app/_utils/db/db";
import { validateSchemaRedirect } from "@/app/_utils/errorHandler";
import { generateBounds } from "@/app/_utils/helpers";
import { appSettingsSchema } from "@/app/_utils/zod/settingsSchemas";
import { revalidatePath } from "next/cache";

export const updateSettingsAction = async (
  prevFormData: any,
  formData: FormData
) => {
  const updateData = {
    appArea: formData.get("appArea") as string,
    initialZoom: Number(formData.get("initialZoom")) as number,
    defaultPosition: JSON.parse(formData.get("defaultPosition") as string),
    boundWidth: Number(formData.get("boundWidth")),
  };

  const defaultBound = generateBounds(
    updateData.defaultPosition,
    updateData.boundWidth
  );

  const validation = validateSchemaRedirect(appSettingsSchema, updateData);
  if (validation) {
    return validation;
  }

  await prisma.settings.update({
    where: {
      id: 1,
    },
    data: {
      appArea: updateData.appArea as string,
      initialZoom: updateData.initialZoom as number,
      defaultPosition: updateData.defaultPosition as any,
      defaultBound: defaultBound as any,
    },
  });

  revalidatePath("/settings");
};
