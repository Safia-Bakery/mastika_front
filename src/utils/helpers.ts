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

export const StatusArr = [
  { id: OrderStatus.new, name: "Новый" },
  { id: OrderStatus.accepted, name: "Принят" },
  { id: OrderStatus.rejected, name: "Отклонён" },
];

export const orderStatus = (status: OrderStatus | undefined) => {
  switch (status) {
    case OrderStatus.new:
      return { text: "Новый", color: "" };
    case OrderStatus.accepted:
      return { text: "Принят", color: "bg-success" };
    case OrderStatus.rejected:
      return { text: "Отклонён", color: "bg-rejected" };

    default:
      return {};
  }
};

export const rowColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.accepted:
      break;

    default:
      break;
  }
};

export const getFillingType = (val: fillingType) => {
  switch (val) {
    case fillingType.pp:
      return { name: "ПП", val: "bc3e7b6e-7bf7-4a1d-b2f4-95dc8b929371" };
    case fillingType.premium:
      return { name: "Премиум", val: "bc3e7b6e-7bf7-4a1d-b2f4-95dc8b929371" };
    case fillingType.standart:
      return {
        name: "Стандартная",
        val: "c514deb0-e2a2-4f19-987d-b204f544a0c9",
      };

    default:
      break;
  }
};

export const imageConverter = (img: File) => {
  if (img?.size) return URL.createObjectURL(img);
  return "";
};
export const numberWithCommas = (val: number) => {
  return val
    ?.toFixed(2)
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

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
export const complexityArr = [
  { id: 1, name: "Средний" },
  { id: 2, name: "Сложный" },
  { id: 3, name: "Гравитационный Свадебдный" },
];

export const floorsArr = [
  { id: 1, name: "1 этажный" },
  { id: 2, name: "2 этажный" },
  { id: 3, name: "3 этажный" },
];
export const packageArr = [
  { id: 2, name: "Бесплатная" },
  { id: 1, name: "Премиум" },
];

export const FillingArr = [
  { name: "ПП", id: fillingType.pp },
  { name: "Премиум", id: fillingType.premium },
  { name: "Стандартная", id: fillingType.standart },
];

export const PortonNumbers: { [key: number]: number[] } = {
  1: [
    7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 40, 42,
    44, 46, 48, 50,
  ],
  2: [17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37],
  3: [37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57],
  4: [72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92],
};
export const productsID = "4b35d02b-af33-4175-ab84-c8beb646083b";
export const packagesID = "bce298d5-e3aa-4b4c-b53f-322bdae63f59";
export const deliveryPrice = 100000;
