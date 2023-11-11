import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { ProductType } from "src/utils/types";

export const useProducts = ({
  enabled = true,
  id,
  name,
  status,
  group_id,
  price,
}: {
  enabled?: boolean;
  id?: string;
  name?: string;
  status?: number;
  group_id?: string;
  price?: number;
}) => {
  return useQuery({
    queryKey: ["products", id, name, status, group_id, price],
    queryFn: () =>
      apiClient
        .get({
          url: "/v1/products",
          params: { id, name, status, group_id, price },
        })
        .then(({ data: response }) => response as ProductType[]),
    enabled,
    refetchOnMount: true,
  });
};
export default useProducts;
