import { FC, PropsWithChildren } from "react";
import Typography, { TextSize } from "../Typography";

interface Props extends PropsWithChildren {
  title?: string;
  subTitle?: string;
}

const Header: FC<Props> = ({ children, title }) => {
  return (
    <div className="flex items-center justify-between w-full px-8 py-4">
      <Typography className="flex" size={TextSize.XXL}>
        {title}
      </Typography>

      {children}
    </div>
  );
};

export default Header;
