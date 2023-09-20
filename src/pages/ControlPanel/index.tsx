import Container from "src/components/Container";
import styles from "./index.module.scss";
import useToken from "src/hooks/useToken";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";

const ControlPanel = () => {
  const { data: user } = useToken({ enabled: false });

  return (
    <Card className="p-4 mt-28">
      <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center">
        <Typography size={TextSize.XXL}>
          Добро пожаловать, Нурмухаммад!
        </Typography>
        <div className="relative">
          <img
            className="absolute bottom-0 -left-8"
            src="/assets/images/small-gift.png"
            alt="small-gift"
          />
          <img src="/assets/images/big-gift.png" alt="big-gift" />
        </div>
      </div>

      <div className="flex flex-3 mt-8 gap-4">
        <div className="flex flex-col gap-4 flex-[1]">
          <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center cursor-pointer">
            <Typography size={TextSize.XXL}>Дашборд</Typography>
            <img src="/assets/images/dashboard.png" alt="dashboard-img" />
          </div>
          <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center cursor-pointer">
            <Typography size={TextSize.XXL}>Настройки</Typography>
            <img src="/assets/images/settings.png" alt="settings-img" />
          </div>
          <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center cursor-pointer">
            <Typography size={TextSize.XXL}>Отзывы</Typography>
            <img src="/assets/images/comments.png" alt="comments-img" />
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-[2]">
          <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center cursor-pointer">
            <Typography size={TextSize.XXL}>Персональные данные</Typography>
            <img
              src="/assets/images/personal-data.png"
              alt="personal-data-img"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;
