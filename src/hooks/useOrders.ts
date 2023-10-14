import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { OrderType, OrdersTypes } from "src/utils/types";

export const useOrders = ({
  enabled = true,
  size,
  page = 1,
}: {
  enabled?: boolean;
  size?: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: ["get_orders", page],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/orders/all", params: { page, size } })
        .then(({ data: response }) => (response as OrdersTypes) || null),
    enabled,
  });
};
export default useOrders;
