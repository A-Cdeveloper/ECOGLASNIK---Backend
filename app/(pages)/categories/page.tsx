import {
  HiOutlineDocumentDuplicate,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import Headline from "../../_components/ui/Headline";
import prisma from "../../_utils/db/db";

const CategoriesPage = async () => {
  let categories;
  try {
    categories = await prisma.problemCategory.findMany({
      orderBy: {
        cat_id: "asc",
      },
      include: {
        organisations: true,
        problems: true,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Greška prilikom preuzimanja kategorija");
  }

  return (
    <>
      <Headline level={1}>Kategorije problema</Headline>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full 2xl:w-3/4 text-left mt-4">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-secondary-500/20 uppercase text-[14px]">
              <th className="px-2 lg:px-4 py-1">ID</th>
              <th className="px-2 lg:px-4 py-1">Kategorija</th>
              <th className="px-2 lg:px-4 py-1">Nadležnost</th>
              <th className="px-2 lg:px-4 py-1">Problemi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr
                key={cat.cat_id}
                className={`${
                  index % 2 === 0 ? "" : "bg-secondary-100/10"
                } md:table-row block border-b border-secondary-500/20`}
              >
                <td className="px-2 lg:px-4 py-1 lg:py-2 block md:table-cell text-[13px]">
                  <span className="font-bold md:hidden">ID: </span>
                  {cat.cat_id}
                </td>
                <td className="px-2 lg:px-4 py-1 lg:py-2 block md:table-cell text-[13px]">
                  <span className="font-bold md:hidden">Kategorija: </span>
                  {cat.cat_name}
                </td>
                <td className="px-2 lg:px-4 py-1 lg:py-2 block md:table-cell text-[13px]">
                  <span className="font-bold md:hidden">Nadležnost: </span>
                  {cat.organisations.map((org) => (
                    <p key={org.oid}>{org.organisation_name}</p>
                  ))}
                </td>
                <td className="px-2 lg:px-4 py-1 lg:py-2 block md:table-cell text-[13px] text-start md:text-center">
                  <span className="font-bold md:hidden">Problemi: </span>
                  {cat.problems.length}
                </td>
                <td className="px-2 lg:px-4 py-1 lg:py-2 block md:table-cell">
                  <div className="flex justify-end items-center gap-x-2 text-[18px] text-winter-100/70">
                    <HiOutlineEye />
                    <HiOutlinePencil />
                    <HiOutlineDocumentDuplicate />
                    <HiOutlineTrash />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoriesPage;
