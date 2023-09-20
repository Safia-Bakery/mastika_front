import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";

const OrdersFilter = () => {
  const navigate = useNavigate();
  const [created_at, $created_at] = useState<Date | null>();
  const [range, $range] = useState<any>([null, null]);
  const handleDateRange = (dates: any) => {
    console.log(dates);
    $range(dates);
  };
  const [startDate, endDate] = range;
  return (
    <div className="flex gap-1 my-4">
      <BaseInput className="flex-1">
        <MainInput placeholder={"Поиск заявки"} />
      </BaseInput>
      <MainSelect
        className="flex-1"
        values={[
          { id: 1, name: "Сфера: Бенто" },
          { id: 2, name: "Сфера: Test" },
        ]}
      />
      <MainDatePicker
        className="flex-1"
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onChange={handleDateRange}
      />

      <MainSelect
        className="flex-1"
        values={[
          { id: 1, name: "Сфера: Бенто" },
          { id: 2, name: "Сфера: Test" },
        ]}
      />

      <MainDatePicker
        className="flex-1"
        selected={created_at}
        selectsRange
        onChange={(date: Date) => $created_at(date)}
      />

      <MainSelect
        className="flex-1"
        values={[
          { id: 1, name: "Сфера: Бенто" },
          { id: 2, name: "Сфера: Test" },
        ]}
      />

      <MainSelect
        className="flex-1"
        values={[
          { id: 1, name: "Сфера: Бенто" },
          { id: 2, name: "Сфера: Test" },
        ]}
      />
      <Button
        className="bg-yellow h-[40px] ml-2 flex-1"
        textClassName="text-black"
        textSize={TextSize.L}
        onClick={() => navigate("/orders/add-phone")}
      >
        Создать
      </Button>
    </div>
  );
};

export default OrdersFilter;
