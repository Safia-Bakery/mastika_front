import { useQueryClient } from "@tanstack/react-query";
import { forwardRef, useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import subCategoryMutation from "src/hooks/mutation/subCategory";
import useContentType from "src/hooks/useContentType";
import useSelectVal from "src/hooks/useSelectVal";
import useSubCategories from "src/hooks/useSubCategories";
import { ContentType } from "src/utils/types";

const InputWrapper = forwardRef<
  HTMLInputElement,
  {
    field: any;
    type?: string;
    index: number;
  }
>(({ field, type = "text", index }, ref) => {
  return (
    <BaseInput label={`Название опции №${index + 1}`} className="w-full">
      <MainInput {...field} ref={ref} type={type} />
    </BaseInput>
  );
});

interface InputFields {
  content: string;
}

interface FormData {
  inputFields: InputFields[];
  name: string;
  status: boolean;
  content_type: ContentType;
}

const initialValues: InputFields = {
  content: "",
};

const EditAddSubCategories = () => {
  const { id, subid } = useParams();
  const navigate = useNavigate();
  const { data: contentType, isLoading: contentLoading } = useContentType({});
  const { mutate } = subCategoryMutation();
  const {
    data,
    refetch,
    isLoading: subLoading,
  } = useSubCategories({
    enabled: !!subid,
    id: Number(subid),
  });

  const subCategory = data?.[0];

  const { data: selectVals, isLoading: selectLoading } = useSelectVal({
    enabled: !!subid && subCategory?.contenttype_id === ContentType.select,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
    getValues,
  } = useForm<FormData>({
    defaultValues: { inputFields: [initialValues], name: "" },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputFields",
  });

  const renderContentType = useMemo(() => {
    if (Number(watch("content_type")) === ContentType.select)
      return (
        <>
          <div className="flex justify-end">
            <Button
              className="bg-primary w-9"
              textClassName="text-white"
              onClick={() => append(initialValues)}
            >
              Добавить
            </Button>
          </div>
          {fields.map((field, index) => (
            <div className="flex gap-3 items-end justify-end" key={index}>
              <Controller
                name={`inputFields.${index}.content`}
                control={control}
                defaultValue={field.content}
                render={({ field }) => (
                  <InputWrapper field={field} index={index} />
                )}
              />

              <Button
                disabled={fields.length < 2}
                className="bg-red-400 w-9 mb-2"
                onClick={() => remove(index)}
              >
                <img src="/assets/icons/delete.svg" alt="delete" />
              </Button>
            </div>
          ))}
        </>
      );
  }, [watch("content_type"), fields, selectVals, watch("inputFields")]);

  const onSubmit = () => {
    const { status, name, content_type } = getValues();
    mutate(
      {
        name,
        category_id: Number(id),
        status: String(+status),
        contenttype_id: +content_type,
        ...(!!id && { id: Number(subid) }),
      },
      {
        onSuccess: () => {
          navigate(`/categories/${id}/show${!subid ? "?update=1" : ""}`);
        },
      }
    );
  };

  useEffect(() => {
    if (subid && subCategory) {
      reset({
        name: subCategory.name,
        content_type: subCategory.contenttype_id,
        status: !!subCategory.subcategory_vs_contenttype?.status,
      });
    }
  }, [subid, subCategory]);

  useEffect(() => {
    if (selectVals?.length) {
      reset({
        inputFields: selectVals.map((item) => {
          return { content: item.content };
        }),
      });
    }
  }, [subid, selectVals]);

  useEffect(() => {
    if (subid) {
      return () => {
        window.location.reload();
      };
    }
  }, []);

  if (
    (selectLoading &&
      !!subid &&
      subCategory?.contenttype_id === ContentType.select) ||
    (subLoading && subid) ||
    contentLoading
  )
    return <div>loading</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Header title={subid ? `Изменить ${subCategory?.name}` : "Добавить"}>
          <Button className="bg-primary" textClassName="text-white">
            Назад
          </Button>
        </Header>
        <div className="flex flex-1 gap-4 flex-col px-8 pb-4">
          <BaseInput label="НАИМЕНОВАНИЕ" className="mt-4">
            <MainInput
              register={register("name", { required: "Обязательное поле" })}
            />
          </BaseInput>

          <BaseInput label="Тип контента">
            <MainSelect
              values={contentType}
              register={register("content_type")}
            />
          </BaseInput>

          {renderContentType}

          <BaseInput label="СТАТУС">
            <MainCheckBox label="Активный" register={register("status")} />
          </BaseInput>
          {/* <MainCheckBox
            label="Срочно"
            className="mt-4"
            register={register("status")}
          /> */}
          {/* <BaseInput label="ОПИСАНИЕ">
            <MainTextArea
              placeholder={"Комментарии"}
              register={register("comments", { required: "Обязательное поле" })}
            />
          </BaseInput> */}
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

export default EditAddSubCategories;
