import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { OrdersType } from "src/utils/types";

export const useOrders = ({
  enabled = true,
  size,
  page = 1,
  id,
}: {
  enabled?: boolean;
  size?: number;
  page?: number;
  id?: number;
}) => {
  return useQuery({
    queryKey: ["get_orders", page, id],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/orders", params: { page, size, id } })
        .then(({ data: response }) => (response as OrdersType[]) || null),
    enabled,
  });
};
export default useOrders;
