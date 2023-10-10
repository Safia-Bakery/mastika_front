import { QueryClient } from "@tanstack/react-query";
import { EPresetTimes } from "./types";

export const itemsPerPage = 50;

export const StatusName = [
  { name: "Активный", id: 1 },
  { name: "Не активный", id: 0 },
];
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
