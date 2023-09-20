import clx from "classnames";
import { FC, ReactNode } from "react";
import Typography, { TextSize, Weight } from "../Typography";
import styles from "./index.module.scss";

export enum BtnColor {
  primary = "primary",
  secondary = "secondary",
  yellow = "yellow",
  white = "white",
  gradient = "gradient",
}

interface Props {
  icon?: string;
  mainIcon?: string;
  children?: ReactNode;
  hasShadow?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  textClassName?: string;
  textSize?: TextSize;
  textWeight?: Weight;
  className?: string;
  reversed?: boolean;
  badge?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: FC<Props> = ({
  icon,
  mainIcon,
  hasShadow = true,
  onClick,
  textSize,
  className,
  reversed,
  children,
  textClassName,
  badge,
  type = "button",
  disabled = false,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clx(
        className,
        textClassName,
        styles.block,
        {
          [styles.hasShadow]: hasShadow,
        },
        {
          [styles.disabled]: disabled,
        },
        {
          [styles.reversed]: reversed,
        }
      )}
    >
      <div className={styles.text}>
        {mainIcon && (
          <img src={mainIcon} alt="action-icon" className={styles.mainIcon} />
        )}
        <Typography
          className={clx(styles.textChild, textClassName)}
          size={textSize}
        >
          {children}
        </Typography>
        {badge && (
          <div className={styles.badge}>
            <Typography
              className={textClassName}
              size={TextSize.S}
              weight={Weight.medium}
            >
              {badge}
            </Typography>
          </div>
        )}
      </div>

      {isLoading && (
        <>
          <span className={styles.loaders} />
          <span className={styles.loaders} />
          <span className={styles.loaders} />
          <span className={styles.loaders} />
        </>
      )}

      {icon && <img src={icon} alt="action-icon" className={styles.icon} />}
    </button>
  );
};

export default Button;
