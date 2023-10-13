import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { CategoriesFullType } from "src/utils/types";

export const useCategoriesFull = ({
  enabled = true,
  id,
}: {
  enabled?: boolean;
  id?: number;
}) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/category/full", params: { id } })
        .then(({ data: response }) => {
          return response as CategoriesFullType;
        }),
    enabled,
    refetchOnMount: true,
  });
};
export default useCategoriesFull;
