// Critical Security Vulnerability 2015 // https://nextjs.org/blog/cve-2025-29927

import { getUserFromToken } from "@/app/(auth)/_actions";
import { redirect } from "next/navigation";

export async function authSecurityPatch() {
  const { user: currentUser } = (await getUserFromToken()) ?? { user: null };

  if (!currentUser) {
    redirect("/");
  }

  return currentUser;
}
