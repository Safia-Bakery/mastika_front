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

export enum MainPermissions {
  fillings = 1,
  filling = 2,
}
export interface MeTypes {
  username: string;
  status: number;
  created_at: string;
  id: number;
}

export interface CategoryTypes {
  name: string;
  id: number;
  status: number;
  price: number;
}

export interface ContentTypes {
  name: string;
  id: number;
  status: number;
}

export enum ContentType {
  string = 1,
  image = 2,
  number = 3,
  select = 4,
}
export interface SubCategoryTypes {
  id: number;
  name: string;
  category_id: number;
  contenttype_id: number;
  subcategory_vs_category: {
    name: string;
    price: number;
    id: number;
    status: number;
  };
  subcategory_vs_contenttype: {
    id: number;
    name: string;
    status: number;
  };
}

export interface SubCatSelectVals {
  id: number;
  content: string;
  value: string;
  selval_vs_subcat: {
    id: number;
    name: string;
    category_id: number;
    contenttype_id: number;
    subcategory_vs_category: {
      name: string;
      price: number;
      id: number;
      status: number;
    };
    subcategory_vs_contenttype: {
      id: number;
      name: string;
      status: number;
    };
  };
}

export interface UserTypes {
  username: string | null;
  status: number;
  created_at: string;
  id: number;
  phone_number: string;
}
export interface SubCategoryChildTypes {
  id: number;
  selval_id: number;
  content: string;
  value: string;
  childselval_vs_selval: {
    id: number;
    content: string;
    value: null;
    selval_vs_subcat: {
      id: number;
      name: string;
      category_id: number;
      contenttype_id: number;
      subcategory_vs_category: {
        name: string;
        id: number;
        status: number;
      };
      subcategory_vs_contenttype: {
        id: number;
        name: string;
        status: number;
      };
    };
  };
}

export interface OrdersType {
  order: [
    {
      id: number;
      order_vs_user: {
        username: string;
        status: number;
        created_at: Date;
        id: number;
        phone_number: string;
      };
      phone_number: string;
      order_vs_category: {
        name: string;
        id: number;
        status: number;
      };
    }
  ];
  value: [
    {
      id: number;
      content: string;
      order_id: number;
      subcat_id: number;
      value_vs_subcat: {
        id: number;
        name: string;
        category_id: number;
        contenttype_id: number;
        subcategory_vs_category: {
          name: string;
          id: number;
          status: number;
        };
        subcategory_vs_contenttype: {
          id: number;
          name: string;
          status: number;
        };
      };
      select_id: number;
      value_vs_select: {
        id: number;
        content: string;
        value: string;
        selval_vs_subcat: {
          id: number;
          name: string;
          category_id: number;
          contenttype_id: number;
          subcategory_vs_category: {
            name: string;
            id: number;
            status: number;
          };
          subcategory_vs_contenttype: {
            id: number;
            name: string;
            status: number;
          };
        };
      };
      selchild_id: number;
      value_vs_selchild: {
        id: number;
        content: string;
        value: string;
        status: number;
      };
    }
  ];
}

export enum OrderStatus {
  new = 0,
  accepted = 1,
  rejected = 2,
}
export enum PaymentTypes {
  cash = 0,
  payme = 1,
  click = 2,
}

export enum SystemTypes {
  mastika = 0,
  tg = 1,
  web = 2,
}
