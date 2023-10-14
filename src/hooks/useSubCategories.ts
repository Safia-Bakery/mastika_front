import { legacy_createStore } from "@reduxjs/toolkit";
import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { SubCategoryTypes } from "src/utils/types";

export const useSubCategories = ({
  enabled = true,
  name,
  id,
  category_id,
}: {
  enabled?: boolean;
  name?: string;
  id?: number;
  category_id?: number;
}) => {
  // /v1/child/sel/val
  return useQuery({
    queryKey: ["sub_categories", name, id, category_id],
    queryFn: async () => {
      const { data: response } = await apiClient.get({
        url: "/v1/sub/category",
        params: { name, id, category_id },
      });
      return response as SubCategoryTypes[];
    },
    enabled,
    refetchOnMount: true,
  });
};
export default useSubCategories;
