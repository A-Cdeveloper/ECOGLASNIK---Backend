/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/app/_utils/db/db";
import {
  handleError,
  validateSchemaRedirect,
} from "@/app/_utils/helpers/errorHandler";
import { OrganisationFormSchema } from "@/app/_utils/zod/organisationSchemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addNewOrganisationAction = async (
  prevFormData: any,
  formData: FormData
) => {
  // await wait(15000);

  const data = {
    organisation_name: formData.get("organisation_name"),
    organisation_address: formData.get("organisation_address"),
    organisation_email: formData.get("organisation_email"),
    organisation_phone: formData.get("organisation_phone"),
    categories: formData.getAll("categories").map((id) => Number(id)), // Convert to numbers
  };

  const validation = validateSchemaRedirect(OrganisationFormSchema, data);
  if (validation) {
    return validation;
  }

  await prisma.organisation.create({
    data: {
      organisation_name: data.organisation_name as string,
      organisation_address: data.organisation_address as string,
      organisation_email: data.organisation_email as string,
      organisation_phone: data.organisation_phone as string,
      categories: {
        connect: data.categories.map((id) => ({ cat_id: id })),
      },
    },
  });

  revalidatePath("/organisations");
  redirect("/organisations");
};

export const updateOrganisationAction = async (
  prevFormData: any,
  formData: FormData
) => {
  const updateData = {
    organisation_name: formData.get("organisation_name"),
    organisation_address: formData.get("organisation_address"),
    organisation_email: formData.get("organisation_email"),
    organisation_phone: formData.get("organisation_phone"),
    categories: formData.getAll("categories").map((id) => Number(id)), // Convert to numbers
  };

  const oid = formData.get("oid") as string;

  const validation = validateSchemaRedirect(OrganisationFormSchema, updateData);
  if (validation) {
    return validation;
  }

  await prisma.organisation.update({
    where: {
      oid: +oid,
    },
    data: {
      organisation_name: updateData.organisation_name as string,
      organisation_address: updateData.organisation_address as string,
      organisation_email: updateData.organisation_email as string,
      organisation_phone: updateData.organisation_phone as string,
      categories: {
        set: updateData.categories.map((id) => ({ cat_id: id })),
      },
    },
  });

  revalidatePath("/organisations");
  redirect("/organisations");
};

export const deleteOrganisationByIdAction = async (id: number) => {
  try {
    await prisma.organisation.update({
      where: {
        oid: id,
      },
      data: {
        categories: {
          set: [], // Unlink all associated categories
        },
      },
    });

    // Delete the organisation
    await prisma.organisation.delete({
      where: {
        oid: id,
      },
    });

    revalidatePath("/organisations");
  } catch (error: unknown) {
    handleError(error, {
      customMessage: `Greška prilikom brisanja službe.`,
      throwError: true,
    });
  }
};
