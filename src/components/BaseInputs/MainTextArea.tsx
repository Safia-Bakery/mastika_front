import { ChangeEvent, FC } from "react";
import cl from "classnames";
import styles from "./index.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { InputStyle } from "./MainInput";
interface Props {
  onChange?: (val: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  value?: string;
  placeholder?: string | null;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  inputStyle?: InputStyle;
}

const MainTextArea: FC<Props> = ({
  className,
  placeholder = "Комментарии",
  register,
  inputStyle = InputStyle.primary,
  ...others
}) => {
  return (
    <textarea
      className={cl(
        className,
        "mb-2 w-full rounded-lg",
        styles[inputStyle],
        styles.textArea
      )}
      rows={4}
      placeholder={placeholder || ""}
      {...register}
      {...others}
    />
  );
};

export default MainTextArea;
