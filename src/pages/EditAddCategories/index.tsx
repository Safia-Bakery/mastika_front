import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelectBtn from "src/components/BaseInputs/MainSelectBtn";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import PhoneInput from "src/components/BaseInputs/PhoneInput";
import BranchSelect from "src/components/BranchSelect";
import Button from "src/components/Button";
import Card from "src/components/Card";

import Typography, { TextSize } from "src/components/Typography";
import YandexMap from "src/components/YandexMap";
import { OrderType } from "src/utils/types";

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
        comments: "comments edited",
        urgent: true,
        status: true,
      });
    }
  }, [id]);

  return (
    <form>
      <Typography size={TextSize.XXL} className="flex my-4 ml-1">
        Добавить категорие
      </Typography>
      <Card className="px-8 py-4">
        <div className="flex flex-1 gap-4 flex-col">
          <BaseInput label="НАИМЕНОВАНИЕ" className="mt-4">
            <MainInput
              // placeholder={"Введите имя"}
              register={register("name", { required: "Обязательное поле" })}
            />
          </BaseInput>
          <BaseInput label="ОПИСАНИЕ">
            <MainTextArea
              placeholder={"Комментарии"}
              register={register("comments", { required: "Обязательное поле" })}
            />
          </BaseInput>

          <MainCheckBox label="Срочно" register={register("urgent")} />

          <MainCheckBox
            className="mt-2"
            label="Активный"
            register={register("status")}
          />
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

export default EditAddCategories;
