import { FC, ReactNode } from "react";
import styles from "./index.module.scss";
import cl from "classnames";

interface Props {
  className?: string;
  children: ReactNode;
  onClick: () => void;
}

const TgBtn: FC<Props> = ({ className, children, onClick }) => {
  return (
    <div onClick={onClick} className={cl(className, styles.btn)}>
      {children}
    </div>
  );
};

export default TgBtn;
