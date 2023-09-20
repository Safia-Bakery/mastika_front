export enum EPresetTimes {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  TEN_DAYS = DAY * 10,
}

export interface BasePaginatedRes {
  total: number;
  page: number;
  size: number;
  pages: number;
}

export enum OrderType {
  pickup = 1,
  delivery = 2,
}

export interface BranchType {
  id: string;
  name: string;
  longtitude: number | null;
  latitude: number | null;
  country: string;
  status: number;
  // origin: number;
  fillial_department: {
    id: string;
    name: string;
    origin: number;
    parentfillial: {
      name: string;
    };
  }[];
  is_fabrica: number;
}
export interface BranchTypes extends BasePaginatedRes {
  items: BranchType[];
}
