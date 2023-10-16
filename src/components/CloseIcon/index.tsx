import cl from "classnames";
import { FC } from "react";

interface Props {
  className?: string;
  onClick: () => void;
}

const CloseIcon: FC<Props> = ({ className, onClick }) => {
  return (
    <span
      className={cl(
        className,
        "flex items-center justify-center text-4xl cursor-pointer"
      )}
      onClick={onClick}
      aria-hidden="true"
    >
      &times;
    </span>
  );
};

export default CloseIcon;
