import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";

const EditAddComplexity = () => {
  const { complexity } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (complexity) {
      reset({
        name: "name edited",
        comments: "comments edited",
        urgent: true,
        status: true,
      });
    }
  }, [complexity]);
  return (
    <form>
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

          <BaseInput label="СТАТУС">
            <MainCheckBox label="Активный" register={register("status")} />
          </BaseInput>
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

export default EditAddComplexity;
