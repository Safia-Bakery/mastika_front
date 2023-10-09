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
  category_id?: string;
}) => {
  return useQuery({
    queryKey: ["sub_categories", name, id, category_id],
    queryFn: () =>
      apiClient
        .get("/v1/sub/category", { name, id, category_id })
        .then(({ data: response }) => {
          return response as SubCategoryTypes[];
        }),
    enabled,
    refetchOnMount: true,
  });
};
export default useSubCategories;
