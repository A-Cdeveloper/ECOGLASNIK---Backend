import FilterSelector from "@/app/_components/ui/Filters/FilterSelector";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import { Organisation } from "@prisma/client";

const FilterOrganisations = async () => {
  const { organisations } = (await getAllOrganisations("oid-asc")) as {
    organisations: Organisation[];
  };

  const organisationSelection = organisations?.map((org) => ({
    id: org.oid.toString(),
    label: org.organisation_name,
  }));

  return (
    <FilterSelector
      filterList={organisationSelection}
      queryKey="organisationId"
      noDefaultLabel={true}
      className="w-full md:w-[250px]"
    />
  );
};

export default FilterOrganisations;
