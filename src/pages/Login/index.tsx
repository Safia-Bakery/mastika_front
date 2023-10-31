import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import cl from "classnames";
import loginMutation from "src/hooks/mutation/login";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { loginHandler, tokenSelector } from "src/store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useToken from "src/hooks/useToken";
import { successToast } from "src/utils/toast";

import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);
  const { refetch } = useToken({});
  const [error, $error] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { mutate, isLoading } = loginMutation();

  useEffect(() => {
    if (token) navigate("/home");
  }, [token]);

  const onSubmit = () => {
    const { username, password } = getValues();

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          dispatch(loginHandler(data.access_token));
          refetch();
          navigate("/home");
          successToast("Добро пожаловать");
          if (error) $error(false);
        },
        onError: () => $error(true),
      }
    );
  };
  return (
    <div className={styles.login_wrap}>
      <div className={cl(styles.content, "p-5 shadow bg-white rounded-xl")}>
        <h2 className="text-center mb-3">Авторизация</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <BaseInput className="mb-0" error={errors.username}>
            <MainInput
              register={register("username", { required: "required" })}
              autoFocus
              placeholder={"Логин"}
            />
          </BaseInput>
          <BaseInput className="mb-0" error={errors.password}>
            <MainInput
              register={register("password", { required: "required" })}
              type="password"
              placeholder={"Пароль"}
            />
            {error && (
              <p className={styles.error}>
                Неправильное имя пользователя или пароль.
              </p>
            )}
          </BaseInput>

          {/* <button
            onClick={() =>
              dispatch(
                loginHandler(
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc1NDA4NTQsInN1YiI6InRlc3QifQ.MfExu598BBcw3fSC2uiYzeVwSiyrrPHcDl84s0Imgc0"
                )
              )
            }
          >
            submit
          </button> */}

          <Button
            isLoading={isLoading}
            className="bg-yellow w-full"
            type="submit"
          >
            Логин
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
