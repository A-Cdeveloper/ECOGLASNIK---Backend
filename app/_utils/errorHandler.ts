import { Prisma } from "@prisma/client";

type ErrorHandlerOptions = {
  customMessage?: string; // Optional custom error message
  throwError?: boolean; // Whether to throw an error instead of returning a message
};

export function handleError(
  error: unknown,
  { customMessage, throwError }: ErrorHandlerOptions = {}
): string[] | never {
  let errorMessage: string;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P1001") {
      errorMessage = "Baza podataka nije dostupna.";
    } else {
      errorMessage = "Greška u bazi podataka.";
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    errorMessage = "Baza podataka nije dostupna.";
  } else if (error instanceof Error) {
    errorMessage = customMessage ? customMessage : `Greška: ${error.message}`;
  } else {
    errorMessage = customMessage ? customMessage : "Nepoznata greška.";
  }

  if (throwError) {
    throw new Error(errorMessage);
  }

  return [errorMessage];
}
