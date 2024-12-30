export const getDisplayName = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};
