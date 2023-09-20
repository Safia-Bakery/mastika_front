import { ChangeEvent, FC, HTMLInputTypeAttribute, useRef } from "react";
import cl from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.scss";

export enum InputStyle {
  primary = "primary",
}

interface Props {
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  onFocus?: () => void;
  ref?: any;
  inputStyle?: InputStyle;
}

const MainInput: FC<Props> = ({
  className,
  placeholder = "",
  register,
  ref,
  inputStyle = InputStyle.primary,
  ...others
}) => {
  return (
    <input
      className={cl(
        "form-control mb-2 w-full rounded-lg",
        styles.inputBox,
        styles[inputStyle],
        className
      )}
      placeholder={placeholder || ""}
      ref={ref}
      {...register}
      {...others}
    />
  );
};

export default MainInput;
