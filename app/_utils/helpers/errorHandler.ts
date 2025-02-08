import { Prisma } from "@prisma/client";
import { ZodSchema } from "zod";

type ErrorHandlerOptions = {
  customMessage?: string; // Optional custom error message
  throwError?: boolean; // Whether to throw an error instead of returning a message
};

type ValidationResult = {
  success: boolean;
  message?: string[];
};

//
export function validateSchemaRedirect<T>(
  schema: ZodSchema<T>,
  data: T
): string[] | null {
  const validation = schema.safeParse(data);

  if (!validation.success) {
    return validation.error.issues.map((issue) => issue.message);
  }

  return null;
}

export function validateSchemaResponse<T>(
  schema: ZodSchema<T>,
  data: T
): ValidationResult | void {
  const validation = schema.safeParse(data);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue) => issue.message);
    return {
      success: false,
      message: [...errors] as string[],
    };
  }

  return; // Validation successful
}

///////////////////////////////////////////////////////////////
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
    errorMessage = customMessage ? customMessage : "Greška na serveru.";
  } else {
    errorMessage = customMessage ? customMessage : "Greška na serveru.";
  }

  if (throwError) {
    throw new Error(errorMessage);
  }

  return [errorMessage];
}
