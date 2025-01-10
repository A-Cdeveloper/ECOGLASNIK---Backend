import { getAllCategories } from "@/app/_utils/api_utils/categories";

export const problemStatusOptions = [
  { value: "", label: "Svi" },
  { value: "active", label: "Aktivni" },
  { value: "done", label: "Rešeni" },
  { value: "archive", label: "Arhivirani" },
];

const categoriesApi = await getAllCategories();

export const categoriesSelection = categoriesApi?.map((cat) => {
  return {
    id: cat.cat_id.toString(),
    label: cat.cat_name,
  };
});
