import { FC, PropsWithChildren } from "react";
import styles from "./index.module.scss";
import cl from "classnames";
import { useLocation } from "react-router-dom";
import Typography, { TextSize } from "../Typography";

interface Props extends PropsWithChildren {
  title?: string;
  subTitle?: string;
}

const Header: FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div className="flex items-center gap-2 bg-mainGray w-full py-3">
      <Typography size={TextSize.XXL} className="font-medium text-black">
        {title}
      </Typography>
    </div>
  );
};

export default Header;
