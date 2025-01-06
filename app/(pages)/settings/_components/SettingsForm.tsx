"use client";
import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import { useActionState, useState } from "react";
import { updateSettingsAction } from "../_actions";
import ErrorsForm from "../../categories/_components/ErrorsForm";
import { SettingsWithoutId } from "@/app/_utils/db/prismaTypes";
import Map from "./Map";

const SettingsForm = ({ settings }: { settings: SettingsWithoutId }) => {
  const [errors, formAction] = useActionState(updateSettingsAction, []);

  const [defaultPosition, setDefaultPosition] = useState(
    settings?.defaultPosition
  );

  return (
    <form action={formAction} className="mt-4 w-1/2 space-y-4">
      <div className="grid grid-cols-2 gap-y-3 items-center">
        <label htmlFor="appArea">Naziv aplikacije</label>
        <Input
          type="text"
          defaultValue={settings?.appName}
          readOnly
          className="bg-secondary-100/40 cursor-not-allowed border-transparent focus:border-transparent"
        />

        <label htmlFor="appArea">Područje</label>
        <Input
          type="text"
          name="appArea"
          placeholder="Područje"
          defaultValue={settings?.appArea as string}
          aria-label="Područje"
        />

        <label htmlFor="appArea">Inicijalni zoom</label>
        <Input
          type="number"
          name="initialZoom"
          placeholder="Inicijalni zoom"
          defaultValue={settings?.initialZoom.toString()}
          min={10}
        />

        <div className="col-span-2">
          <input
            type="hidden"
            name="defaultPosition"
            value={JSON.stringify(defaultPosition)}
          />
          <Map
            defaultPosition={defaultPosition as { lat: number; lng: number }}
            initialZoom={settings?.initialZoom as number}
            setDefaultPosition={setDefaultPosition}
          />
        </div>

        <label htmlFor="appArea">Širina područja(km)</label>
        <Input type="number" name="boundWidth" defaultValue="10" min={10} />
      </div>

      {errors && errors.length > 0 && <ErrorsForm errors={errors} />}
      <SubmitButton>Sacuvaj</SubmitButton>
    </form>
  );
};

export default SettingsForm;
