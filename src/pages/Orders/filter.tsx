import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useToken from "src/hooks/useToken";
import { MainPermissions } from "src/utils/types";
import { orderArray } from "../AddOrder";
import BranchSelect from "src/components/BranchSelect";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { StatusArr } from "src/utils/helpers";
import useCategories from "src/hooks/useCategories";
import dayjs from "dayjs";

interface Props {
  add: MainPermissions;
}

const OrdersFilter: FC<Props> = ({ add }) => {
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();
  const removeParams = useRemoveParams();
  const { data } = useToken({});
  const perms = data?.permissions;
  const [branchEn, $branchEn] = useState(false);
  const [categoryEn, $categoryEn] = useState(false);

  const sphere = useQueryString("sphere");
  const status = useQueryString("status") || undefined;
  const orderType = useQueryString("orderType") || undefined;
  const created_at = useQueryString("created_at") || undefined;

  const { data: spheres } = useCategories({ enabled: categoryEn || !!sphere });
  const rendeerBranches = useMemo(() => {
    return (
      <div className="cursor-pointer" onClick={() => $branchEn(true)}>
        <BranchSelect inputStyle={InputStyle.white} enabled={branchEn} />
      </div>
    );
  }, [branchEn]);

  const renderStatus = useMemo(() => {
    return (
      <MainSelect
        className="flex-1"
        inputStyle={InputStyle.white}
        onChange={(e) => navigateParams({ status: e.target.value })}
        onClear={() => removeParams(["status"])}
        values={StatusArr}
        value={status}
        placeholder="Статус"
      />
    );
  }, [status]);

  const renderDate = useMemo(() => {
    return (
      <MainDatePicker
        className="flex-1"
        inputStyle={InputStyle.white}
        selected={
          created_at !== "null" && created_at
            ? dayjs(created_at).toDate()
            : undefined
        }
        placeholder="Дата"
        shouldCloseOnSelect
        onChange={(created_at: Date) => navigateParams({ created_at })}
      />
    );
  }, [created_at]);

  const renderSphere = useMemo(() => {
    return (
      <div className="" onClick={() => $categoryEn(true)}>
        <MainSelect
          className="flex-1"
          onClear={() => removeParams(["sphere"])}
          inputStyle={InputStyle.white}
          placeholder="Сфера"
          value={sphere || undefined}
          onChange={(e) => navigateParams({ sphere: e.target.value })}
          values={spheres}
        />
      </div>
    );
  }, [sphere, spheres]);

  const renderOrderType = useMemo(() => {
    return (
      <MainSelect
        className="flex-1"
        inputStyle={InputStyle.white}
        values={orderArray}
        onClear={() => removeParams(["orderType"])}
        value={orderType}
        onChange={(e) => navigateParams({ orderType: e.target.value })}
        placeholder="Тип заказа"
      />
    );
  }, [orderType]);

  useEffect(() => {
    if (created_at === "null") removeParams(["created_at"]);
  }, [created_at]);
  return (
    <div className="flex gap-1 my-4">
      <MainInput
        inputStyle={InputStyle.white}
        placeholder={"Поиск заявки"}
        className="flex flex-1"
      />
      {renderSphere}

      {renderOrderType}
      {renderDate}
      {rendeerBranches}
      {renderStatus}

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
