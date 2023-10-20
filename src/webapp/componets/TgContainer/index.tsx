import cl from "classnames";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

const TgContainer: FC<Props> = ({ className, children }) => {
  return <div className={cl(className, "p-5")}>{children}</div>;
};

export default TgContainer;
