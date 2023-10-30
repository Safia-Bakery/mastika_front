import { ChangeEvent, FC, ReactNode, useRef } from "react";
import cl from "classnames";
import styles from "./index.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { InputStyle } from "./MainInput";

interface Props {
  onChange?: (val: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  value?: string | number;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  values?: { id: number | string; name: string; status?: number }[];
  children?: ReactNode;
  onFocus?: () => void;
  inputStyle?: InputStyle;
  placeholder?: string;
  onClear?: () => void;
}

const MainSelect: FC<Props> = ({
  className,
  register,
  values,
  children,
  onFocus,
  placeholder,
  inputStyle = InputStyle.primary,
  onClear,
  ...others
}) => {
  const selectInputRef = useRef<any>();

  const handleClear = () => {
    onClear?.();
    selectInputRef.current.value = undefined;
  };

  return (
    <div className={styles.select}>
      {onClear && others.value && (
        <img
          onClick={handleClear}
          src="/assets/icons/clear.svg"
          alt="clear"
          width={15}
          height={15}
          className={styles.selectClear}
        />
      )}

      <select
        ref={selectInputRef}
        className={cl(
          className,
          "mb-2 w-full rounded-lg",
          styles.inputBox,
          styles[inputStyle]
        )}
        onFocus={onFocus}
        {...others}
        {...register}
      >
        {!children ? (
          <>
            <option className="opacity-0" value={undefined} hidden>
              {placeholder}
            </option>
            {values?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </>
        ) : (
          children
        )}
      </select>
    </div>
  );
};

export default MainSelect;
