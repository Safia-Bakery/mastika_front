import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";
import fillingMutation from "src/hooks/mutation/filling";
import useCategories from "src/hooks/useCategories";
import useFillings from "src/hooks/useFillings";
import { fillingType } from "src/utils/types";

export const FillingArr = [
  { name: "ПП", id: fillingType.pp },
  { name: "Премиум", id: fillingType.premium },
  { name: "Стандартная", id: fillingType.standart },
];

const EditAddFillings = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, reset, handleSubmit, getValues } = useForm();
  const { data: categories } = useCategories({});

  const { data } = useFillings({ id: Number(id), enabled: !!id });
  const filling = data?.[0];

  const { mutate } = fillingMutation();

  const onSubmit = () => {
    const { name, status, category, filling } = getValues();
    mutate(
      {
        name,
        status,
        category_id: Number(category),
        ptype: filling,
        id: Number(id),
      },
      {
        onSuccess: () => {
          navigate("/fillings?update=1");
        },
      }
    );
  };

  useEffect(() => {
    if (id && filling) {
      reset({
        name: filling.name,
        category: filling.category_id,
        filling: filling.ptype,
      });
    }
  }, [id, filling]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography size={TextSize.XXL} className="flex my-4 ml-1">
        Добавить
      </Typography>
      <Card className="px-8 py-4">
        <div className="flex flex-1 gap-4 flex-col">
          <BaseInput label="НАИМЕНОВАНИЕ" className="mt-4">
            <MainInput
              // placeholder={"Введите имя"}
              register={register("name", { required: "Обязательное поле" })}
            />
          </BaseInput>

          <BaseInput label="Category">
            <MainSelect values={categories} register={register("category")} />
          </BaseInput>

          <BaseInput label="FillingArr">
            <MainSelect values={FillingArr} register={register("filling")} />
          </BaseInput>

          {!!id && (
            <BaseInput label="СТАТУС">
              <MainCheckBox label="Активный" register={register("status")} />
            </BaseInput>
          )}
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="bg-darkYellow mt-4 w-64" type="submit">
            Создать
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default EditAddFillings;
