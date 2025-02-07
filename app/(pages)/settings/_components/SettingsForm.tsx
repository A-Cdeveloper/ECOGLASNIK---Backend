"use client";
import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import { useActionState, useState } from "react";
import { updateSettingsAction } from "../_actions";
import ErrorsForm from "../../../_components/ui/Form/ErrorsFormMessage";
import { SettingsWithoutId } from "@/app/types/prismaTypes";
import Map from "../../../_components/ui/Map";
import InputRange from "@/app/_components/ui/Form/InputRange";
import {
  calculateDistanceFromBounds,
  convertLatLngToString,
} from "@/app/_utils/helpers";

const SettingsForm = ({ settings }: { settings: SettingsWithoutId }) => {
  const [errors, formAction] = useActionState(updateSettingsAction, []);

  const [defaultPosition, setDefaultPosition] = useState(
    settings?.defaultPosition
  );

  return (
    <form
      action={formAction}
      className="mt-4 w-full lg:w-2/3 xl:w-2/3 2xl:w-1/2 space-y-2"
    >
      <div className="block lg:grid lg:grid-cols-[1fr_1fr] gap-y-3 items-center">
        <label htmlFor="appArea">Naziv aplikacije</label>
        <Input
          type="text"
          defaultValue={settings?.appName}
          readOnly
          className="disabled"
        />

        <label htmlFor="appArea">Naziv oblasti</label>
        <Input
          type="text"
          name="appArea"
          placeholder="Područje"
          defaultValue={settings?.appArea as string}
          aria-label="Područje"
          className="my-2 lg:my-0"
        />

        <label htmlFor="initialZoom">Inicijalni zoom</label>
        <InputRange
          initialValue={settings?.initialZoom}
          name="initialZoom"
          min={10}
          max={20}
          className="my-2 lg:my-0 accent-warrning-500 h-2"
        />

        <div className="col-span-2 my-2">
          <input
            type="hidden"
            name="defaultPosition"
            value={JSON.stringify(defaultPosition)}
          />
          <label htmlFor="appArea">Klikni na mapu za odabir područja:</label>
          <Map
            defaultPosition={defaultPosition as { lat: number; lng: number }}
            initialZoom={settings?.initialZoom as number}
            setDefaultPosition={setDefaultPosition}
          />
          <p>
            {convertLatLngToString(
              defaultPosition as { lat: number; lng: number }
            )}
          </p>
        </div>

        <label htmlFor="appArea">Širina područja(km)</label>

        <InputRange
          initialValue={calculateDistanceFromBounds(
            settings?.defaultPosition as { lat: number; lng: number },
            settings?.defaultBound as {
              northEast: { lat: number; lng: number };
              southWest: { lat: number; lng: number };
            }
          )}
          name="boundWidth"
          className="my-2 lg:my-0 accent-warrning-500 h-2"
          min={10}
          max={50}
        />
      </div>

      {errors && errors.length > 0 && <ErrorsForm errors={errors} />}
      <SubmitButton>Sacuvaj</SubmitButton>
    </form>
  );
};

export default SettingsForm;
