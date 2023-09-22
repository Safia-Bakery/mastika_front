import { ChangeEvent, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.scss";
import cl from "classnames";
import { InputStyle } from "./MainInput";

interface Props {
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
  value?: boolean;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  label: string;
  inputStyle?: InputStyle;
  className?: string;
}
const MainCheckBox: FC<Props> = ({
  value,
  register,
  label,
  inputStyle = InputStyle.primary,
  className,
  ...others
}) => {
  return (
    <div className={cl(styles.inputBox, styles[inputStyle], className)}>
      <label className="mb-0 mr-2">{label}</label>
      <input type="checkbox" defaultChecked={value} {...register} {...others} />
    </div>
  );
};

export default MainCheckBox;
