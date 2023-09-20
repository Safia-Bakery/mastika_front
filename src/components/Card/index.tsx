import cl from "classnames";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

const Card: FC<Props> = ({ children, className }) => {
  return (
    <div className={cl("bg-white rounded-2xl w-full h-full mb-4 ", className)}>
      {children}
    </div>
  );
};

export default Card;
