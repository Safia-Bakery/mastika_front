import { FC } from "react";
import DatePicker from "react-datepicker";
import cl from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.scss";

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
}

const MainDatePicker: FC<Props> = ({
  className,
  selected,
  register,
  onChange,
  startDate,
  endDate,
  selectsRange,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      className={cl(styles.inputBox, className)}
      startDate={startDate}
      endDate={endDate}
      isClearable
      shouldCloseOnSelect={false}
      selectsRange={selectsRange}
      {...register}
    />
  );
};

export default MainDatePicker;
