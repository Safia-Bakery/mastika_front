import { FC, ReactNode } from "react";
import styles from "./index.module.scss";
import cl from "classnames";
import { TextSize, Weight } from "src/components/Typography";

interface Props {
  className?: string;
  children: ReactNode;

  size?: TextSize;
  uppercase?: boolean;
  weight?: Weight;
  alignCenter?: boolean;
}

const Texts: FC<Props> = ({
  children,
  className,
  size = TextSize.L,
  uppercase = false,
  weight = Weight.regular,
  alignCenter = false,
}) => {
  return (
    <span
      className={cl(
        className,
        styles[size],
        styles[weight],
        styles.base,
        { ["uppercase"]: uppercase },
        { ["text-center"]: alignCenter }
      )}
    >
      {children}
    </span>
  );
};

export default Texts;
