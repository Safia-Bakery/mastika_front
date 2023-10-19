import { FC, ReactNode } from "react";
import styles from "./index.module.scss";
import cl from "classnames";

interface Props {
  className?: string;
  children: ReactNode;
}

const WebBtn: FC<Props> = ({ className, children }) => {
  return <button className={cl(className, styles.btn)}>{children}</button>;
};

export default WebBtn;
