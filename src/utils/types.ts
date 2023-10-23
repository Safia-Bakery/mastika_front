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
  items: any[];
}

export enum OrderingType {
  pickup = 1,
  delivery = 2,
}

// export enum MainPermissions {
//   fillings = 1,
//   filling = 2,

//   roles = 1,
//   add_roles = 1,
//   edit_roles = 1,

//   comments = 1,
//   add_comments = 1,

//   all_orders = 1,
//   add_all_orders = 1,
//   edit_all_orders = 1,

//   rec_orders = 1,
//   edit_rec_orders = 1,
//   add_rec_orders = 1,

//   users = 1,
//   add_users = 1,
//   edit_users = 1,

//   categories = 1,
//   add_categories = 1,
//   edit_categories = 1,

//   branches = 1,

//   clients = 1,
//   add_clients = 1,
//   edit_clients = 1,

//   products = 1,
// }

export enum MainPermissions {
  fillings = 1,
  filling = 2,

  roles = 2,
  add_roles = 3,
  edit_roles = 4,

  comments = 5,
  add_comments = 6,

  all_orders = 7,
  add_all_orders = 8,
  edit_all_orders = 9,

  rec_orders = 10,
  edit_rec_orders = 11,
  add_rec_orders = 12,

  users = 13,
  add_users = 14,
  edit_users = 15,

  categories = 16,
  add_categories = 17,
  edit_categories = 18,

  branches = 19,

  clients = 20,
  add_clients = 21,
  edit_clients = 22,

  products = 23,
}
export interface MeTypes {
  user: {
    username: string;
    status: number;
    created_at: string;
    full_name: string;
    is_client: number;
    id: number;
    role_id: number;
    phone_number: string;
    user_role: any;
  };
  permissions: { [key: number]: boolean };
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
    full_name: string | null;
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
    }
  ];
}

export interface OrdersTypes extends BasePaginatedRes {
  items: OrdersType[];
}

export interface OrderValueType {
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

export interface OrderType {
  order: [
    {
      id: number;
      order_user: string;
      order_vs_user: {
        username: string;
        status: number;
        created_at: string;
        full_name: string;
        is_client: number;
        id: number;
        role_id: number;
        phone_number: string;
      };
      phone_number: string;
      extra_number: string;
      payment_type: number;
      firstly_payment: number;
      is_delivery: number;
      comment: string;
      reject_reason: string;
      created_at: string;
      updated_at: string;
      deliver_date: Date;
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
      lat: string;
      long: string;
      order_br: {
        id: string;
        name: string;
        branch_id: string;
        origin: number;
        status: number;
        branch_dr: {
          id: string;
          name: string;
          latitude: number;
          langtitude: number;
          country: string;
          status: number;
          is_fabrica: number;
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
        }
      ];
    }
  ];
  value: OrderValueType[];
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

export enum FirstlyPayment {
  yes = 1,
  no = 0,
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
export interface BranchJsonType {
  id: string;
  name: string;
}

export interface BranchesType extends BasePaginatedRes {
  items: BranchType[];
}

export interface UserType {
  username: string;
  status: number;
  created_at: string;
  full_name: string;
  is_client: number;
  id: number;
  role_id: number;
  phone_number: string;
}

export interface UsersType extends BasePaginatedRes {
  items: UserType[];
}

export interface BranchType {
  id: string;
  name: string;
  latitude: number;
  longtitude: number;
  country: string;
  status: number;
  is_fabrica: number;
}
export interface RoleTypes {
  id: number;
  name: string;
  role_permission: [
    {
      id: number;
      pagecrud_id: number;
      permission_crud: {
        id: number;
        name: string;
      };
    }
  ];
}
export interface PermissionTypes {
  id: number;
  name: string;
  pages_crud: [
    {
      id: number;
      name: string;
    }
  ];
}
export interface ProductGroupType {
  id: string;
  name: string;
  code: string;
  status: number;
}

export interface ProductType {
  id: string;
  name: string;
  productType: string;
  group_id: string;
  price: number;
  status: number;
}

export interface CartItems extends ProductType {
  count: number;
  comment?: string;
  total?: number;
}

export enum HandleCount {
  increment = "increment",
  decrement = "decrement",
}
