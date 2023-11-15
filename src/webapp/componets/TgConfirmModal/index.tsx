import { FC, PropsWithChildren, memo } from "react";
import styles from "./index.module.scss";
import clx from "classnames";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  centered?: boolean;
  onClose?: () => void;
  className?: string;
}

const TgModal: FC<Props> = memo(
  ({ isOpen, onClose = () => null, centered = true, children, className }) => {
    return (
      <>
        <div
          className={clx(styles.overlay, { [styles.closed]: !isOpen })}
          onClick={onClose}
        />
        {isOpen && (
          <div
            className={clx(
              className,
              { [styles.centered]: centered },
              styles.modal,
              [isOpen ? styles.fadeIn : styles.fadeOut]
            )}
          >
            {children}
          </div>
        )}
      </>
    );
  }
);
export default TgModal;
