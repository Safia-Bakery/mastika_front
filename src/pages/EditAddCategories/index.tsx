import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";

import Typography, { TextSize } from "src/components/Typography";

const EditAddCategories = () => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (id) {
      reset({
        name: "name edited",
      });
    }
  }, [id]);

  return (
    <form>
      <Card>
        <Header title="Добавить">
          <Button className="bg-primary" textClassName="text-white">
            Назад
          </Button>
        </Header>
        <div className="flex flex-1 gap-4 flex-col px-8 pb-4">
          <BaseInput label="НАИМЕНОВАНИЕ" className="mt-4">
            <MainInput
              // placeholder={"Введите имя"}
              register={register("name", { required: "Обязательное поле" })}
            />
          </BaseInput>

          {/* <BaseInput label="СТАТУС">
            <MainCheckBox label="Активный" register={register("status")} />
          </BaseInput> */}
          <BaseInput>
            <MainCheckBox label="Сложность" register={register("status")} />
          </BaseInput>
          <BaseInput>
            <MainCheckBox label="Этажность" register={register("status")} />
          </BaseInput>
          <BaseInput>
            <MainCheckBox label="Тип начинки" register={register("status")} />
          </BaseInput>
          <BaseInput>
            <MainCheckBox label="Выбор палитры" register={register("status")} />
          </BaseInput>
          <BaseInput label="СТАТУС">
            <MainCheckBox label="Активный" register={register("status")} />
          </BaseInput>
          <MainCheckBox
            label="Срочно"
            className="mt-4"
            register={register("urgent")}
          />
          <BaseInput label="ОПИСАНИЕ">
            <MainTextArea
              placeholder={"Комментарии"}
              register={register("comments", { required: "Обязательное поле" })}
            />
          </BaseInput>
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="bg-darkYellow mt-4 mr-8" type="submit">
            Создать
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default EditAddCategories;
