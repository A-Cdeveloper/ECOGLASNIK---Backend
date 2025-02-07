import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { getProblemById } from "@/app/_utils/api_utils/problems";
import { ProblemCustumTypeWithUser } from "@/app/types/prismaTypes";
import ProblemForm from "../../_components/ProblemForm";

const EditProblem = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { categories: categoriesApi } = (await getAllCategories()) as {
    categories: { cat_id: number; cat_name: string }[];
  };

  const problem = await getProblemById((await params).id);

  const categoriesSelection = categoriesApi?.map((cat) => {
    return {
      value: cat.cat_id.toString(),
      label: cat.cat_name,
    };
  });
  return (
    <div>
      <BackButton />
      <Headline level={1}>Izmeni problem</Headline>
      <ProblemForm
        categoriesSelection={categoriesSelection || []}
        problem={problem as ProblemCustumTypeWithUser}
      />
    </div>
  );
};

export default EditProblem;
