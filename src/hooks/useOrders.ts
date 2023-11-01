import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { OrdersTypes } from "src/utils/types";

export const useOrders = ({
  enabled = true,
  size,
  page = 1,
  status,
  branch_id,
  created_at,
  is_delivery,
  sphere,
}: {
  enabled?: boolean;
  size?: number;
  page?: number;
  status?: number;
  branch_id?: string;
  created_at?: string;
  is_delivery?: number;
  sphere?: string;
}) => {
  return useQuery({
    queryKey: [
      "get_orders",
      page,
      status,
      branch_id,
      created_at,
      is_delivery,
      sphere,
    ],
    queryFn: () =>
      apiClient
        .get({
          url: "/v1/orders/all",
          params: {
            page,
            size,
            status,
            branch_id,
            created_at,
            is_delivery,
            sphere,
          },
        })
        .then(({ data: response }) => (response as OrdersTypes) || null),
    enabled,
  });
};
export default useOrders;
