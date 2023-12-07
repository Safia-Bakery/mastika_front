import { FC } from "react";
import styles from "./index.module.scss";
import cl from "classnames";

interface Props {
  absolute?: boolean;
  className?: string;
}

const Loading: FC<Props> = ({ absolute = false, className }) => {
  return (
    <div
      className={cl(className, styles.wrap, { [styles.absolute]: absolute })}
    >
      <div className="spinner-border text-primary" role="status">
        <img src="/assets/images/loader.gif" alt="loading..." />
      </div>
    </div>
  );
};

export default Loading;
