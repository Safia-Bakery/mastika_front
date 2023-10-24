import { FC, PropsWithChildren } from "react";
import Texts from "../Texts";
import cl from "classnames";
import { TextSize } from "src/components/Typography";

interface Props extends PropsWithChildren {
  active: boolean;
  className?: string;
}

const TgSelectedLabel: FC<Props> = ({ children, active, className }) => {
  return (
    <Texts
      className={cl(
        className,
        "text-selected opacity-0 transition-opacity delay-300 duration-500 mt-4",
        { ["opacity-100"]: !!active }
      )}
      size={TextSize.L}
      alignCenter
    >
      {!!active && children}
    </Texts>
  );
};

export default TgSelectedLabel;
