import { FC } from "react";
import DatePicker from "react-datepicker";
import cl from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.scss";
import { InputStyle } from "./MainInput";

interface Props {
  onChange?: any;
  className?: string;
  value?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  selected?: Date | null | undefined;
  startDate?: Date;
  endDate?: Date;
  selectsRange?: boolean;
  inputStyle?: InputStyle;
  placeholder?: string;
}

const MainDatePicker: FC<Props> = ({
  className,
  selected,
  register,
  onChange,
  startDate,
  endDate,
  selectsRange,
  inputStyle = InputStyle.primary,
  placeholder,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      className={cl(
        styles.inputBox,
        "w-full rounded-lg",
        styles[inputStyle],
        className
      )}
      wrapperClassName="mb-2 w-full"
      startDate={startDate}
      placeholderText={placeholder}
      endDate={endDate}
      isClearable
      shouldCloseOnSelect={false}
      selectsRange={selectsRange}
      {...register}
    />
  );
};

export default MainDatePicker;
