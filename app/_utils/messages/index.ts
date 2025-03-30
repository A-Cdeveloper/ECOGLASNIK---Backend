import messages from "@/app/locales/rs.json";

type Messages = typeof messages;

export function t<Key extends string>(key: Key): string {
  const keys = key.split(".") as (keyof Messages)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = messages;

  for (const k of keys) {
    if (result?.[k] === undefined) return key; // Return key if not found
    result = result[k];
  }

  return typeof result === "string" ? result : key; // Ensure result is a string
}
