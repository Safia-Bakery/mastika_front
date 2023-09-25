import cl from "classnames";
import { FC, PropsWithChildren, ReactNode } from "react";
import Typography, { TextSize } from "../Typography";

interface Props extends PropsWithChildren {
  className?: string;
  title?: string;
  titleContent?: ReactNode;
}

const Card: FC<Props> = ({ children, className, title, titleContent }) => {
  return (
    <>
      <div
        className={cl("bg-white rounded-2xl w-full h-full mb-4 ", className)}
      >
        <div className="flex justify-between ">
          {title && (
            <Typography className="mt-4 ml-4 flex" size={TextSize.XXL}>
              {title}
            </Typography>
          )}

          {titleContent}
        </div>
        {children}
      </div>
    </>
  );
};

export default Card;
