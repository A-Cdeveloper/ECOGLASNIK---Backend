/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/app/_utils/db/db";
import { UserFormSchema } from "@/app/_utils/zod/userSchemas";

export const updateProfileAction = async (
  prevFormData: any,
  formData: FormData
) => {
  const updateProfileData = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const uid = formData.get("uid") as string;

  const validation = UserFormSchema.safeParse(updateProfileData);
  if (!validation.success) {
    const errors = validation.error.issues.map(
      (issue: { message: string }) => issue.message
    );
    return {
      success: false,
      message: [...errors] as string[],
    };
  }

  await prisma.user.update({
    where: {
      uid: +uid,
    },
    data: {
      firstname: updateProfileData.firstname as string,
      lastname: updateProfileData.lastname as string,
      email: updateProfileData.email as string,
      phone: updateProfileData.phone as string,
    },
  });

  return {
    success: true,
    message: ["Profil je uspješno ažuriran!"],
  };
};

// export const deleteUserAction = async (uid: number) => {
//   // assign all problems to user 1
//   await prisma.problem.updateMany({
//     where: {
//       uid: +uid,
//     },
//     data: {
//       uid: 1,
//       status: "archive",
//       updatedAt: new Date(), // Set updatedAt to the current timestamp
//     },
//   });

//   await deleteUser(uid);
//   revalidatePath("/users");
// };
