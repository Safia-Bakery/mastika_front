import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { OrderType } from "src/utils/types";

export const useOrders = ({
  enabled = true,
  id,
}: {
  enabled?: boolean;
  id?: number;
}) => {
  return useQuery({
    queryKey: ["get_order", id],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/orders", params: { id } })
        .then(({ data: response }) => (response as OrderType) || null),
    enabled,
  });
};
export default useOrders;
