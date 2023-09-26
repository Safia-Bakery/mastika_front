import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainCheckBox from "src/components/BaseInputs/MainCheckBox";
import MainInput from "src/components/BaseInputs/MainInput";
import MainRadioBtns from "src/components/BaseInputs/MainRadioBtns";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import PhoneInput from "src/components/BaseInputs/PhoneInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";

const EditAddUser = () => {
  const { id } = useParams();
  const [is_fabrica, $is_fabrica] = useState<boolean>();
  const navigate = useNavigate();
  const handleNavigate = (url: string) => navigate(url);
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
              <MainInput
                // placeholder={"Введите имя"}
                register={register("role", { required: "Обязательное поле" })}
              />
            </BaseInput>
          </div>
          <div className="flex gap-8">
            <BaseInput label="ЛОГИН" className="flex flex-1 flex-col">
              <MainInput
                register={register("login", { required: "Обязательное поле" })}
              />
            </BaseInput>
            <BaseInput label="ПАРОЛЬ" className="flex flex-1 flex-col">
              <MainInput
                // placeholder={"Введите имя"}
                register={register("password", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
          </div>
          <div className="flex gap-8">
            <BaseInput label="ТЕЛЕФОН" className="flex flex-1 flex-col">
              <PhoneInput
                register={register("phone", { required: "Обязательное поле" })}
              />
            </BaseInput>
            <BaseInput label="E-MAIL" className="flex flex-1 flex-col">
              <MainInput
                // placeholder={"Введите имя"}
                register={register("email")}
              />
            </BaseInput>
          </div>
          <div className="flex gap-8">
            <BaseInput label="СФЕРА" className="flex flex-1 flex-col">
              <MainRadioBtns
                onChange={(e) => $is_fabrica(e)}
                value={is_fabrica}
                values={[
                  { id: 0, name: "Розница" },
                  { id: 1, name: "Фабрика" },
                ]}
              />
            </BaseInput>
            <BaseInput label="СТАТУС" className="flex flex-1 flex-col">
              <MainCheckBox
                label="Активный"
                register={register("status")}
                className="flex items-center"
              />
            </BaseInput>
          </div>
          <BaseInput label="ОПИСАНИЕ" className="flex flex-1 flex-col">
            <MainTextArea
              register={register("comments")}
              // className="flex items-center"
            />
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

export default EditAddUser;
