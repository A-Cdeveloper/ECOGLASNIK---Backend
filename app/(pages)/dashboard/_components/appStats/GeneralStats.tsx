import {
  HiOutlineBellAlert,
  HiOutlineSquare3Stack3D,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

import StatBox from "./StatBox";
import { getCounts } from "../../_actions";

const GeneralStats = async () => {
  const { problems, categories, users, organisations } = await getCounts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-[1fr_1fr_1fr_1fr] my-8 gap-2 w-full 2xl:w-[60%] ">
      <StatBox
        key={1}
        total={categories}
        label="Kategorije"
        icon={<HiOutlineSquare3Stack3D />}
        link="categories"
      />
      <StatBox
        key={2}
        total={organisations}
        label="Službe"
        icon={<HiOutlineWrenchScrewdriver />}
        link="organisations"
      />
      <StatBox
        key={3}
        total={problems}
        label="Problemi"
        icon={<HiOutlineBellAlert />}
        link="problems"
      />
      <StatBox
        key={4}
        total={users}
        label="Korisnici"
        icon={<HiOutlineUsers />}
        link="users"
      />
    </div>
  );
};

export default GeneralStats;
