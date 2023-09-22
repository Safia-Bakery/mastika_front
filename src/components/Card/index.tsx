import cl from "classnames";
import { FC, PropsWithChildren } from "react";
import Typography, { TextSize } from "../Typography";

interface Props extends PropsWithChildren {
  className?: string;
  title?: string;
}

const Card: FC<Props> = ({ children, className, title }) => {
  return (
    <>
      <div
        className={cl("bg-white rounded-2xl w-full h-full mb-4 ", className)}
      >
        {title && <Typography size={TextSize.XXL}>{title}</Typography>}
        {children}
      </div>
    </>
  );
};

export default Card;
