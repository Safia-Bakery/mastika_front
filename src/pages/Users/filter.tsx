import { useState } from "react";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";

const UsersFilter = () => {
  const [created_at, $created_at] = useState<Date | null>();
  const [range, $range] = useState<any>([null, null]);
  const handleDateRange = (dates: any) => $range(dates);

  const [startDate, endDate] = range;

  return (
    <div className="flex gap-1 my-4">
      <MainInput
        inputStyle={InputStyle.white}
        className="flex flex-1"
        placeholder={"Пользователи"}
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
    </div>
  );
};

export default UsersFilter;
