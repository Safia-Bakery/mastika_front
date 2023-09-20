import Container from "src/components/Container";
import styles from "./index.module.scss";
import useToken from "src/hooks/useToken";

const ControlPanel = () => {
  const { data: user } = useToken({ enabled: false });

  return (
    <div className={styles.card}>
      <Container>
        <div className="header text-center m-3">
          <h4 className="title m-0">Добро пожаловать {user?.username}</h4>
          <p className={styles.category}>{user?.role?.toString()}</p>
        </div>
      </Container>
    </div>
  );
};

export default ControlPanel;
