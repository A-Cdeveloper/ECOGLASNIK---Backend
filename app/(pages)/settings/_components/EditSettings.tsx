import { getSettings } from "@/app/_utils/api_utils/settings";
import React from "react";
import SettingsForm from "./SettingsForm";
import { SettingsWithoutId } from "@/app/types/prismaTypes";

const EditSettings = async () => {
  const settings = (await getSettings()) as SettingsWithoutId;

  return <SettingsForm settings={settings} />;
};

export default EditSettings;
