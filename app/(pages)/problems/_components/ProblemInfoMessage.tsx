import { ProblemOfficialEmail, ProblemStatus } from "@prisma/client";
import React from "react";

const ProblemInfoMessage = ({
  status,
  officialEmail,
}: {
  status?: ProblemStatus;
  officialEmail?: ProblemOfficialEmail;
}) => {
  return (
    <div className="mt-4 w-full 2xl:w-2/3">
      <div className=" mb-2 space-y-1">
        {officialEmail === ProblemOfficialEmail.REQUESTED &&
          status !== ProblemStatus.ARCHIVE && (
            <p className="bg-success-100 text-primary-900 p-1 px-[15px]">
              Korisnik je zatrazio zvanicnu prijavu problema nadležnim službama.
            </p>
          )}
        {officialEmail === ProblemOfficialEmail.SENT &&
          status !== ProblemStatus.ARCHIVE && (
            <p className="bg-danger-100 text-primary-900 p-1 px-[15px]">
              Prijava je zvanicno prosleđena nadležnim službama. Nisu dozvoljene
              naknadne izmene, osim izmene statusa problema.
            </p>
          )}
        {status === ProblemStatus.ARCHIVE && (
          <p className="bg-danger-100 text-primary-900 p-1 px-[15px]">
            Problem je ariviran (obrisan) od strane korisnika.{" "}
          </p>
        )}
        {status === ProblemStatus.WAITING && (
          <p className="bg-secondary-500 text-primary-900 p-1 px-[15px]">
            Problem čeka na odobrenje za prikazivanje na mapi.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProblemInfoMessage;
