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
        className={cl("bg-white rounded-2xl w-full mb-4 mt-4 pb-4 ", className)}
      >
        <div className="flex justify-between ">
          {title && (
            <Typography className="flex" size={TextSize.XXL}>
              {title}
            </Typography>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Card;
