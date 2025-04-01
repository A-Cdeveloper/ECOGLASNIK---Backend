import React from "react";
import Headline from "../../_components/ui/Headline";
import EditSettings from "./_components/EditSettings";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const PageSettings = async () => {
  await authSecurityPatch();
  return (
    <>
      <Headline level={1}>Podešavanja aplikacije</Headline>
      <EditSettings />
    </>
  );
};

export default PageSettings;
