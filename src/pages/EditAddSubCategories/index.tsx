import { ChangeEvent, forwardRef, useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import useContentType from "src/hooks/useContentType";
import { ContentType } from "src/utils/types";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: contentType } = useContentType({});

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
        {/* <input type={type} {...field} ref={ref} /> */}
        <MainInput {...field} ref={ref} type={type} />
      </BaseInput>
    );
  });

  useEffect(() => {
    if (id) {
      reset({
        name: "name edited",
      });
    }
  }, [id]);

  // console.log(watch("inputFields"), 'watch("inputFields"');

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
  }, [watch("content_type"), fields, initialValues]);

  const onSubmit = () => {
    console.log(getValues("inputFields"), "submit");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Header title="Добавить">
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
