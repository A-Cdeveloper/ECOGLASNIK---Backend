import Headline from "@/app/_components/ui/Headline";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";
import React from "react";

const UserPage = async () => {
  await authSecurityPatch();
  return <Headline level={1}> User data</Headline>;
};

export default UserPage;
