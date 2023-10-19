import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import { permissionSelector } from "src/redux/reducers/auth";
import { useAppSelector } from "src/redux/utils/types";
import { MainPermissions } from "src/utils/types";

interface Props {
  add: MainPermissions;
}

const OrdersFilter: FC<Props> = ({ add }) => {
  const navigate = useNavigate();
  const perms = useAppSelector(permissionSelector);
  const [created_at, $created_at] = useState<Date | null>();
  const [range, $range] = useState<any>([null, null]);
  const handleDateRange = (dates: any) => {
    $range(dates);
  };
  const [startDate, endDate] = range;
  return (
    <div className="flex gap-1 my-4">
      <MainInput inputStyle={InputStyle.white} placeholder={"Поиск заявки"} />
      <MainSelect
        className="flex-1"
        inputStyle={InputStyle.white}
        values={[
          { id: 1, name: "Сфера: Бенто" },
          { id: 2, name: "Сфера: Test" },
        ]}
      />
      <MainDatePicker
        className="flex-1"
        inputStyle={InputStyle.white}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onChange={handleDateRange}
      />

      <MainSelect
        className="flex-1"
        inputStyle={InputStyle.white}
        values={[
          { id: 1, name: "Сфера: Бенто" },
          { id: 2, name: "Сфера: Test" },
        ]}
      />

      <MainDatePicker
        className="flex-1"
        inputStyle={InputStyle.white}
        selected={created_at}
        selectsRange
        onChange={(date: Date) => $created_at(date)}
      />

      <MainSelect
        className="flex-1"
        inputStyle={InputStyle.white}
        values={[
          { id: 1, name: "Сфера: Бенто" },
          { id: 2, name: "Сфера: Test" },
        ]}
      />

      <MainSelect
        className="flex-1"
        inputStyle={InputStyle.white}
        values={[
          { id: 1, name: "Сфера: Бенто" },
          { id: 2, name: "Сфера: Test" },
        ]}
      />
      {perms?.[add] && (
        <Button
          className="bg-yellow ml-2 flex-1"
          textClassName="text-black"
          textSize={TextSize.L}
          onClick={() => navigate("/orders/add-phone")}
        >
          Создать
        </Button>
      )}
    </div>
  );
};

export default OrdersFilter;
