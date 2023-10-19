import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseInputs from "src/components/BaseInputs";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";

import useCategories from "src/hooks/useCategories";
import useDebounce from "src/hooks/useDebounce";
import useQueryString from "src/hooks/useQueryString";
import useUpdateEffect from "src/hooks/useUpdateEffect";
import { StatusName, itemsPerPage } from "src/utils/helpers";

const CategoriesFilter: FC = () => {
  const navigate = useNavigate();
  const currentPage = Number(useQueryString("page")) || 1;
  const [name, $name] = useDebounce("");
  const [department, $department] = useDebounce("");
  const [category_status, $category_status] = useState<string>();

  const { refetch } = useCategories({
    // size: itemsPerPage,
    // page: currentPage,
    enabled: false,
    // body: {
    //   ...(!!name && { name }),
    //   ...(!!category_status && { category_status }),
    //   ...(!!department && { department }),
    // },
  });

  useUpdateEffect(() => {
    refetch();
  }, [category_status, name]);

  return (
    <div className="flex gap-1 my-4">
      <BaseInputs>
        <MainInput
          inputStyle={InputStyle.white}
          onChange={(e) => $name(e.target.value)}
        />
      </BaseInputs>
      <BaseInputs>
        <MainInput
          inputStyle={InputStyle.white}
          onChange={(e) => $department(e.target.value)}
        />
      </BaseInputs>
      <BaseInputs>
        <MainSelect
          inputStyle={InputStyle.white}
          values={StatusName}
          onChange={(e) => $category_status(e.target.value)}
        />
      </BaseInputs>

      <Button
        className="bg-yellow ml-2 w-24"
        textClassName="text-black"
        textSize={TextSize.L}
        onClick={() => navigate("add")}
      >
        Создать
      </Button>
    </div>
  );
};

export default CategoriesFilter;
