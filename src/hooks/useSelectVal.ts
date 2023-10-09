import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { SubCatSelectVals } from "src/utils/types";

export const useSelectVal = ({
  enabled = true,
  content,
  id,
  status,
  value,
  subcat_id,
}: {
  enabled?: boolean;
  content?: string;
  id?: number;
  status?: number;
  value?: number;
  subcat_id?: number;
}) => {
  return useQuery({
    queryKey: ["select_values", content, id, status, value, subcat_id],
    queryFn: () =>
      apiClient
        .get("/v1/sel/value", { content, id, status, value, subcat_id })
        .then(({ data: response }) => {
          return response as SubCatSelectVals[];
        }),
    enabled,
    refetchOnMount: true,
  });
};
export default useSelectVal;
