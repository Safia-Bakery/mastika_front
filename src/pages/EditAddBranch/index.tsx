import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainRadioBtns from "src/components/BaseInputs/MainRadioBtns";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import useBranches from "src/hooks/useBranches";

const EditAddBranch = () => {
  const { id } = useParams();
  const [is_fabrica, $is_fabrica] = useState<boolean>();
  const navigate = useNavigate();
  const handleNavigate = (url: string) => navigate(url);

  const { data } = useBranches({ id: id!, enabled: !!id });
  const branch = data?.items?.[0];
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (id && branch) {
      $is_fabrica(!!branch.is_fabrica);
      reset({
        name: branch.name,
        lat: branch.latitude,
        lng: branch.longtitude,
        status: !!branch.status,
        region: branch.country,
      });
    }
  }, [id, branch]);

  return (
    <form>
      <Card>
        <Header title="Добавить">
          <Button
            className="bg-primary"
            textClassName="text-white"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </Header>
        <div className="flex flex-1 gap-4 flex-col px-8 pb-4">
          <BaseInput label="НАЗВАНИЕ">
            <MainInput
              // placeholder={"Введите имя"}
              register={register("name", { required: "Обязательное поле" })}
            />
          </BaseInput>
          <BaseInput label="РЕГИОН">
            <MainInput
              // placeholder={"Введите имя"}
              register={register("region", { required: "Обязательное поле" })}
            />
          </BaseInput>
          <BaseInput label="ШИРОТА">
            <MainInput
              type="number"
              register={register("lat", { required: "Обязательное поле" })}
            />
          </BaseInput>
          <BaseInput label="ДОЛГОТА">
            <MainInput
              type="number"
              register={register("lng", { required: "Обязательное поле" })}
            />
          </BaseInput>

          {/* <MainCheckBox label="СТАТУС" register={register("status")} /> */}

          <BaseInput label="СФЕРА">
            <MainRadioBtns
              onChange={(e) => $is_fabrica(e)}
              value={is_fabrica}
              values={[
                { id: 0, name: "Розница" },
                { id: 1, name: "Фабрика" },
              ]}
            />
          </BaseInput>

          <BaseInput label="СТАТУС">
            <MainCheckBox label="Активный" register={register("status")} />
          </BaseInput>
        </div>
        {/* <div className="flex flex-1 justify-end">
          <Button className="bg-darkYellow mt-4 mr-8" type="submit">
            Сохранить
          </Button>
        </div> */}
      </Card>
    </form>
  );
};

export default EditAddBranch;
