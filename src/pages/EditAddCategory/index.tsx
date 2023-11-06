import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";
import categoryMutation from "src/hooks/mutation/category";
import useCategories from "src/hooks/useCategories";
import { baseURL } from "src/main";
import { imageConverter } from "src/utils/helpers";

const EditAddCategory: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    watch,
  } = useForm();

  const { data, refetch } = useCategories({
    ...(!!id && { id: Number(id) }),
    enabled: !!id,
  });
  const { mutate, isLoading: mutateLoading } = categoryMutation();

  const onSubmit = () => {
    const { name, status, image } = getValues();
    mutate(
      {
        name,
        image: image[0],
        ...(!!id && { id: String(id) }),
        ...(!!status.toString() && { status: Number(status) }),
      },
      {
        onSuccess: () => {
          refetch();
          navigate("/categories?update=1");
        },
      }
    );
  };

  const renderImage = useMemo(() => {
    if (!!watch("image"))
      return (
        <img
          src={imageConverter(watch("image")?.[0])}
          alt="category-image"
          height={150}
          width={150}
        />
      );

    if (data?.[0].image && !!id)
      return (
        <img
          src={`${baseURL}/${data?.[0].image}`}
          alt="category-image"
          height={150}
          width={150}
        />
      );
  }, [watch("image"), data?.[0].image, id]);

  useEffect(() => {
    if (id && data?.length) {
      reset({
        name: data[0].name,
        status: !!data[0].status,
        ...(!!data[0].image && { image_name: data[0].image }),
      });
    }
  }, [id, data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography size={TextSize.XXL} className="flex my-4 ml-1">
        {!!id ? `Изменить ${data?.[0].name}` : "Добавить"}
      </Typography>
      <Card className="px-8 py-4">
        <div className="flex flex-1 gap-4 flex-col">
          <BaseInput label="НАИМЕНОВАНИЕ" className="mt-4">
            <MainInput
              register={register("name", { required: "Обязательное поле" })}
            />
          </BaseInput>

          {!!id && (
            <BaseInput label="СТАТУС">
              <MainCheckBox label="Активный" register={register("status")} />
            </BaseInput>
          )}

          <BaseInput label="ЗАГРУЗИТЬ ФОТО" className="relative">
            <MainInput
              value={
                !!watch("image")?.length ? `${watch("image")?.[0].name}` : ""
              }
              register={register("image_name")}
            />
            <MainInput
              type="file"
              register={register("image", {
                required: !data?.[0].image ? "Обязательное поле" : false,
              })}
              className="opacity-0 absolute right-0 bottom-0"
            />
          </BaseInput>
          {renderImage}
        </div>
        <div className="flex flex-1 justify-end">
          <Button
            className="bg-darkYellow mt-4 w-64"
            isLoading={mutateLoading}
            type="submit"
          >
            {!!id ? "Изменить" : "Создать"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default EditAddCategory;
