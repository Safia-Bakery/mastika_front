import { QueryClient } from "@tanstack/react-query";
import {
  EPresetTimes,
  OrderStatus,
  PaymentTypes,
  SystemTypes,
  fillingType,
} from "./types";

export const itemsPerPage = 50;

export const StatusName = [
  { name: "Активный", id: 1 },
  { name: "Не активный", id: 0 },
];

export const orderStatus = (status: OrderStatus | undefined) => {
  switch (status) {
    case OrderStatus.new:
      return "Новый";
    case OrderStatus.accepted:
      return "Принят";
    case OrderStatus.rejected:
      return "Отклонён";

    default:
      return "";
  }
};

export const getFillingType = (val: fillingType) => {
  switch (val) {
    case fillingType.pp:
      return "ПП";
    case fillingType.premium:
      return "Премиум";
    case fillingType.standart:
      return "Стандартная";

    default:
      break;
  }
};

export const imageConverter = (img: File) => {
  if (img?.size) return URL.createObjectURL(img);
  return "";
};
// export const numberWithCommas = (val: number) => {
//   return val
//     ?.toFixed(2)
//     ?.toString()
//     ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

// export const fixedString = (value: string) => {
//   return value
//     .split("")
//     .filter((item) => {
//       return [" ", "-", "(", ")"].indexOf(item) === -1;
//     })
//     .join("");
// };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: EPresetTimes.MINUTE * 5,
      staleTime: EPresetTimes.MINUTE * 5,
    },
  },
});

export const isMobile = window.innerWidth <= 1200;

export const payments = [
  { id: PaymentTypes.payme, name: "Payme" },
  { id: PaymentTypes.cash, name: "Наличные" },
  { id: PaymentTypes.click, name: "click" },
];

export const systems = [
  { id: SystemTypes.mastika, name: "Отдел Мастики" },
  { id: SystemTypes.tg, name: "Телеграм бот" },
  { id: SystemTypes.web, name: "Сайт" },
];
