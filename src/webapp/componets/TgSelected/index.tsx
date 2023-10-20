import cl from "classnames";
import { FC } from "react";

interface Props {
  className?: string;
}

const WebSelected: FC<Props> = ({ className }) => {
  return (
    <div>
      <img
        src="/assets/icons/selected.svg"
        alt="selected"
        height={42}
        width={42}
        className={cl(
          className,
          "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0 transition-opacity duration-[0.6s]"
        )}
      />
    </div>
  );
};

export default WebSelected;
