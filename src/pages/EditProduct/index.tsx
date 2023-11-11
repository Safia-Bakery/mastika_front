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
import editProductMutation from "src/hooks/mutation/editProduct";
import useBranches from "src/hooks/useBranches";
import useQueryString from "src/hooks/useQueryString";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const name = useQueryString("name");
  const price = Number(useQueryString("price"));
  const status = useQueryString("status");
  const handleNavigate = (url: string) => navigate(url);
  const { mutate } = editProductMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    reset({
      price,
      status,
    });
  }, []);

  const onSubmit = () => {
    const { status, price } = getValues();
    mutate(
      { status: Number(status), price, id: id! },
      {
        onSuccess: () => {
          handleNavigate("/products?update=1");
        },
      }
    );
  };

  //   useEffect(() => {
  //     if (id && branch) {

  //       reset({
  //         name: branch.name,
  //         lat: branch.latitude,
  //         lng: branch.longtitude,
  //         status: !!branch.status,
  //         region: branch.country,
  //       });
  //     }
  //   }, [id, branch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Header title={`Изменить ${name}`}>
          <Button
            className="bg-primary"
            textClassName="text-white"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </Header>
        <div className="flex flex-1 gap-4 flex-col px-8 pb-4">
          <BaseInput label="Цена">
            <MainInput
              // placeholder={"Введите имя"}
              register={register("price", { required: "Обязательное поле" })}
            />
          </BaseInput>
          {/* <MainCheckBox label="СТАТУС" register={register("status")} /> */}

          <BaseInput label="СТАТУС">
            <MainCheckBox label="Активный" register={register("status")} />
          </BaseInput>
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="bg-darkYellow mt-4 mr-8" type="submit">
            Сохранить
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default EditProduct;
