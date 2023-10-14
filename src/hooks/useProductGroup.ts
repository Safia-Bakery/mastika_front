import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { ProductGroupType } from "src/utils/types";

export const useProductGroup = ({
  enabled = true,
  id,
  name,
}: {
  enabled?: boolean;
  id?: number;
  name?: string;
}) => {
  return useQuery({
    queryKey: ["products_groups", id, name],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/products/groups", params: { id, name } })
        .then(({ data: response }) => response as ProductGroupType[]),
    enabled,
    refetchOnMount: true,
  });
};
export default useProductGroup;
