import { FC, ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import styles from "./index.module.scss";
import cl from "classnames";
import Typography, { TextSize } from "../Typography";

interface BaseProps {
  label?: string;
  className?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  children?: ReactNode;
  labelClassName?: string;
}

const BaseInput: FC<BaseProps> = ({
  label,
  className,
  error,
  children,
  labelClassName,
}) => {
  return (
    <div className={cl(className)}>
      {label && (
        <label className={cl(styles.label, labelClassName)}>{label}</label>
      )}
      {children}
      {error && (
        <Typography size={TextSize.XS} className="text-danger">
          {error?.message?.toString()}
        </Typography>
      )}
    </div>
  );
};

export default BaseInput;
