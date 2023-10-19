import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import PhoneInput from "src/components/BaseInputs/PhoneInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import userMutation from "src/hooks/mutation/user";
import useRoles from "src/hooks/useRoles";
import useUsers from "src/hooks/useUsers";
import { successToast } from "src/utils/toast";

const EditAddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: roles } = useRoles({});
  const { data: userData, refetch } = useUsers({
    id: Number(id),
    enabled: !!id,
  });
  const [phone_number, $phone_number] = useState("");
  const user = userData?.items?.[0];

  const { mutate } = userMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const handlePhone = (e: string) => $phone_number(e);

  const onSubmit = () => {
    const { username, password, role_id, full_name, status } = getValues();

    mutate(
      {
        username,
        password,
        phone_number,
        role_id,
        full_name,
        status,
        ...(!!id && { id: Number(id) }),
      },
      {
        onSuccess: () => {
          if (id) refetch();
          navigate("/users?update=1");
          successToast("success");
        },
      }
    );
  };

  useEffect(() => {
    if (id && user) {
      $phone_number(user?.phone_number);
      reset({
        full_name: user?.full_name,

        role_id: user?.role_id,
        username: user?.username,
        status: !!user?.status,
      });
    }
  }, [id, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Header title="Добавить">
          <Button
            className="bg-primary"
            textClassName="text-white"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </Header>
        <div className="flex flex-1 gap-4 flex-col px-8 pb-4">
          <div className="flex gap-8">
            <BaseInput label="ФИО" className="flex flex-1 flex-col">
              <MainInput
                register={register("full_name", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <BaseInput label="РОЛЬ" className="flex flex-1 flex-col">
              <MainSelect
                values={roles}
                register={register("role_id", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
          </div>
          <div className="flex gap-8">
            <BaseInput label="ЛОГИН" className="flex flex-1 flex-col">
              <MainInput
                register={register("username", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <BaseInput label="ПАРОЛЬ" className="flex flex-1 flex-col">
              <MainInput
                register={register("password", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
          </div>
          <div className="flex gap-8">
            <BaseInput label="ТЕЛЕФОН" className="flex flex-1 flex-col">
              <PhoneInput onChange={handlePhone} value={phone_number} />
            </BaseInput>
            <BaseInput label="СТАТУС" className="flex flex-1 flex-col">
              <MainCheckBox
                label="Активный"
                register={register("status")}
                className="flex items-center"
              />
            </BaseInput>
          </div>
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

export default EditAddUser;
