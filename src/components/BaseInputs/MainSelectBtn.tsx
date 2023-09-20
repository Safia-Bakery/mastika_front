import { FC, useState } from "react";
import cl from "classnames";
import styles from "./index.module.scss";
import Typography, { TextSize } from "../Typography";

export enum InputStyle {
  primary = "primary",
}
type ValueType = { id: number; name: string };

interface Props {
  onChange: (val: ValueType) => void;
  className?: string;
  value?: string | number;
  values: ValueType[];
  disabled?: boolean;

  inputStyle?: InputStyle;
}

const MainSelectBtn: FC<Props> = ({
  className,
  values,
  onChange,
  value,
  inputStyle = InputStyle.primary,
}) => {
  const handleChange = (val: ValueType) => {
    onChange(val);
  };
  return (
    <div
      className={cl(
        "bg-mainGray rounded-md p-1 flex",
        styles.primary,
        className
      )}
    >
      {values.map((item) => (
        <div
          key={item.id}
          onClick={() => handleChange(item)}
          className={cl(
            "rounded-xl bg-transparent cursor-pointer text-center flex-1 p-1",
            { [styles.activeBtn]: item.id === value }
          )}
        >
          <Typography size={TextSize.M} className="text-black text-center">
            {item.name}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default MainSelectBtn;
