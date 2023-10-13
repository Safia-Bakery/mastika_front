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
  id: number;
  order_user: string;
  order_vs_user: {
    username: string;
    status: number;
    created_at: string;
    first_name: null | string;
    last_name: null | string;
    is_client: number;
    id: number;
    role_id: null | string;
    phone_number: null | string;
  };
  phone_number: string;
  extra_number: string;
  payment_type: number;
  firstly_payment: number;
  is_delivery: number;
  comment: string;
  reject_reason: null | string;
  created_at: string;
  updated_at: null | string;
  deliver_date: string;
  status: number;
  address: string;
  apartment: string;
  home: string;
  near_to: string;
  order_vs_category: {
    name: string;
    id: number;
    status: number;
  };
  lat: null | number;
  long: null | number;
  order_br: {
    id: string;
    name: string;
    branch_id: string;
    origin: number;
    status: number;
    branch_dr: {
      id: string;
      name: string;
      latitude: null | number;
      langtitude: null | number;
      country: string;
      status: number;
      is_fabrica: boolean;
    };
  };
  product_order: [
    {
      id: number;
      order_vs_product: {
        id: string;
        status: number;
        name: string;
        productType: string;
        group_id: string;
        price: number;
      };
      product_id: string;
      comment: string;
      amount: number;
    },
    {
      id: number;
      order_vs_product: {
        id: string;
        status: number;
        name: string;
        productType: string;
        group_id: string;
        price: number;
      };
      product_id: string;
      comment: string;
      amount: number;
    }
  ];
}
export interface SelValType {
  id: number;
  content: string;
  value: string;
  status: number;
  selval_vs_childselval: [
    {
      id: number;
      content: string;
      value: string;
      status: number;
    }
  ];
}

export interface SubCategType {
  id: number;
  name: string;
  category_id: number;
  contenttype_id: number;
  status: number;
  subcat_vs_selval: SelValType[];
  subcategory_vs_contenttype: {
    id: number;
    name: string;
    status: number;
  };
}

export interface CategoriesFullType {
  name: string;
  price: number;
  id: number;
  status: number;
  category_vs_subcategory: SubCategType[];
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
