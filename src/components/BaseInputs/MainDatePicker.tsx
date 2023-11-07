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
  showTimeInput?: boolean;
  inputStyle?: InputStyle;
  placeholder?: string;
  shouldCloseOnSelect?: boolean;
  isClearable?: boolean;
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
  showTimeInput,
  shouldCloseOnSelect,
  isClearable,
  disabled,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      disabled={disabled}
      className={cl(
        styles.inputBox,
        "w-full rounded-lg",
        styles[inputStyle],
        className
      )}
      wrapperClassName="mb-2 w-full flex flex-1"
      startDate={startDate}
      placeholderText={placeholder}
      endDate={endDate}
      timeFormat="HH:mm"
      dateFormat="dd.MM.yyyy HH:mm"
      isClearable={isClearable}
      popperClassName="!z-[105]"
      showTimeSelect={showTimeInput}
      shouldCloseOnSelect={shouldCloseOnSelect}
      selectsRange={selectsRange}
      {...register}
    />
  );
};

export default MainDatePicker;
