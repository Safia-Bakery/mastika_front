import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";
import roleMutation from "src/hooks/mutation/roleMutation";
import useRoles from "src/hooks/useRoles";
import { errorToast, successToast } from "src/utils/toast";

const EditAddRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues } = useForm();

  const { refetch: roleRefetch, data } = useRoles({
    enabled: !!id,
    id: Number(id),
  });
  const { mutate: postRole } = roleMutation();
  const role = data?.[0];

  const onSubmit = () => {
    postRole(
      { name: getValues("name"), role_id: Number(id) },
      {
        onSuccess: () => {
          successToast(!id ? "role created" : "role updated");
          navigate("/roles");
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (id && role?.name) {
      reset({
        name: role.name,
      });
    }
  }, [role?.name, id]);

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
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="bg-darkYellow mt-4 w-64" type="submit">
            {!!id ? "Изменить" : "Создать"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default EditAddRole;
