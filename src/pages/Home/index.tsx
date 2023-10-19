import useToken from "src/hooks/useToken";
import Card from "src/components/Card";
import Typography, { TextSize } from "src/components/Typography";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data: user } = useToken({ enabled: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/home");
  }, []);

  return (
    <Card className="p-4 mt-28">
      <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center">
        <Typography size={TextSize.XXL}>
          Добро пожаловать, {user?.full_name}!
        </Typography>
        <div className="relative">
          <img
            className="absolute bottom-0 -left-8"
            src="/assets/icons/small-gift.svg"
            alt="small-gift"
          />
          <img src="/assets/icons/big-gift.svg" alt="big-gift" />
        </div>
      </div>

      <div className="flex flex-3 mt-8 gap-4">
        <div className="flex flex-col gap-4 flex-[1]">
          <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center cursor-pointer">
            <Typography size={TextSize.XXL}>Дашборд</Typography>
            <img src="/assets/icons/dashboard.svg" alt="dashboard-img" />
          </div>
          <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center cursor-pointer">
            <Typography size={TextSize.XXL}>Настройки</Typography>
            <img src="/assets/icons/settings.svg" alt="settings-img" />
          </div>
          <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center cursor-pointer">
            <Typography size={TextSize.XXL}>Отзывы</Typography>
            <div className="relative">
              <img src="/assets/icons/comments.svg" alt="comments-img" />
              <img
                className="absolute bottom-0 right-0"
                src="/assets/icons/comments2.svg"
                alt="comments-img"
              />
            </div>
          </div>
          {/* </div> */}
        </div>

        <div className="flex flex-col gap-4 flex-[2]">
          <div className="bg-mainGray rounded-2xl p-4 flex justify-between items-center cursor-pointer">
            <Typography size={TextSize.XXL}>Персональные данные</Typography>
            <img src="/assets/icons/wallet.svg" alt="personal-data-img" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Home;
