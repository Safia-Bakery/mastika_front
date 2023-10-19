import { FC, forwardRef, useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import childSubCategoryMutation from "src/hooks/mutation/childSubCategory";
import subCategoryMutation from "src/hooks/mutation/subCategory";
import useContentType from "src/hooks/useContentType";
import useSelectVal from "src/hooks/useSelectVal";
import useSubCategsChild from "src/hooks/useSubCategsChild";
import { errorToast, successToast } from "src/utils/toast";
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
  edited: boolean;
}

interface FormData {
  inputFields: InputFields[];
  name: string;
  status: boolean;
  content_type: ContentType;
}

const initialValues: InputFields = {
  content: "",
  edited: false,
};

const EditAddSubCategsChild: FC = () => {
  const { id, subid, child } = useParams();
  const navigate = useNavigate();
  const { data: contentType, isLoading: contentLoading } = useContentType({});
  const { mutate: mutateSelectVals } = childSubCategoryMutation();

  const {
    data,
    refetch,
    isLoading: subLoading,
  } = useSubCategsChild({
    enabled: !!child,
    selval_id: Number(child),
  });

  const selectChild = data?.[0];

  const { data: parentSelect, isLoading: selectLoading } = useSelectVal({
    id: Number(child),
  });
  const parent = parentSelect?.[0];

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

  const hanldleSelectVals = (index: number) => {
    const { inputFields, status } = getValues();
    mutateSelectVals(
      {
        // id: Number(child),
        content: inputFields[index].content,
        status: Number(status),
        // value: "ss",
        selval_id: Number(child),
      },
      {
        onSuccess: () => {
          refetch();
          successToast("added");
        },
      }
    );
  };

  const renderContentType = useMemo(() => {
    if (Number(watch("content_type")) === ContentType.select && !!child)
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
                disabled
                className="bg-red-400 w-9 mb-2"
                onClick={() => remove(index)}
              >
                <img src="/assets/icons/delete.svg" alt="delete" />
              </Button>
              {!field.edited && (
                <Button
                  className="bg-darkYellow w-9 mb-2"
                  onClick={() => hanldleSelectVals(index)}
                >
                  save
                </Button>
              )}
            </div>
          ))}
        </>
      );
  }, [watch("content_type"), fields, selectChild, watch("inputFields")]);

  const onSubmit = () => {
    const { status, name } = getValues();

    mutateSelectVals(
      {
        // content: name,
        selval_id: Number(subid),
        status: Number(status),
        value: name,
        ...(!!id && { id: Number(child) }),
      },
      {
        onSuccess: () => {
          navigate(`/categories/${id}/${subid}/show`);
          // if (subid) window.location.reload();
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (child && data) {
      reset({
        name: parent?.value,
        content_type: ContentType.select,
        status: false,
      });
    }
  }, [child, data]);

  useEffect(() => {
    setTimeout(() => {
      if (data?.length) {
        reset({
          inputFields: data.map((item) => {
            return { content: item.content, edited: !!item.id };
          }),
        });
      }
    }, 100);
  }, [data]);

  if ((selectLoading && !!child) || (subLoading && child) || contentLoading)
    return <Loading absolute />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Header title={child ? `Изменить ${parent?.content}` : "Добавить"}>
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

export default EditAddSubCategsChild;
