import clx from "classnames";
import { FC, ReactNode } from "react";
import styles from "./index.module.scss";

export enum TextSize {
  XXL = "xxl",
  XL = "xl",
  L = "l",
  M = "m",
  S = "s",
  XS = "xs",
  welcome = "welcome",
  sixty = "sixty",
  hundredTwelve = "hundredTwelve",
  fourty = "fourty",
  eight = "eight",
}

export enum Weight {
  regular = "regular",
  semiBold = "semiBold",
  bold = "bold",
  extraBold = "extraBold",
  medium = "medium",
}
interface Props {
  className?: string;
  size?: TextSize;
  uppercase?: boolean;
  weight?: Weight;
  alignCenter?: boolean;
  children: ReactNode;
}

const Typography: FC<Props> = ({
  children,
  className,
  size = TextSize.L,
  uppercase = false,
  weight = Weight.regular,
  alignCenter = false,
  ...props
}) => {
  return (
    <span
      className={clx(
        styles.base,
        styles[size],
        styles[weight],
        className,
        { [styles.uppercase]: uppercase },
        { [styles.alignCenter]: alignCenter }
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Typography;
