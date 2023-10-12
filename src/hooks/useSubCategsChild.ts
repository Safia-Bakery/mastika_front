import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { SubCategoryChildTypes } from "src/utils/types";

export const useSubCategsChild = ({
  enabled = true,
  id,
  selval_id,
  content,
  value,
  status,
}: {
  enabled?: boolean;
  id?: number;
  selval_id?: number;
  content?: string;
  value?: string;
  status?: number;
}) => {
  return useQuery({
    queryKey: ["sub_categories", selval_id, content, value, status, id],
    queryFn: () =>
      apiClient
        .get({
          url: "v1/child/sel/val",
          params: { value, selval_id, content, status, id },
        })
        .then(({ data: response }) => {
          return response as SubCategoryChildTypes[];
        }),

    enabled,
    refetchOnMount: true,
  });
};
export default useSubCategsChild;
