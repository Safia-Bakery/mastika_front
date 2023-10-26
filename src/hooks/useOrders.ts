import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { OrderType, OrdersTypes } from "src/utils/types";

export const useOrders = ({
  enabled = true,
  size,
  page = 1,
  status,
  branch_id,
  created_at,
  is_delivery,
}: {
  enabled?: boolean;
  size?: number;
  page?: number;
  status?: number;
  branch_id?: string;
  created_at?: string;
  is_delivery?: 1 | 0;
}) => {
  return useQuery({
    queryKey: ["get_orders", page, status, branch_id, created_at, is_delivery],
    queryFn: () =>
      apiClient
        .get({
          url: "/v1/orders/all",
          params: { page, size, status, branch_id, created_at, is_delivery },
        })
        .then(({ data: response }) => (response as OrdersTypes) || null),
    enabled,
  });
};
export default useOrders;
