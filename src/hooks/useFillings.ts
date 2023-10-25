import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { FillingTypes } from "src/utils/types";

export const useFillings = ({
  enabled = true,
  name,
  id,
  status,
  category_id,
  ptype,
}: {
  enabled?: boolean;
  name?: string;
  id?: number;
  status?: number;
  category_id?: number;
  ptype?: number;
}) => {
  return useQuery({
    queryKey: ["fillings", name, id, status, category_id, ptype],
    queryFn: () =>
      apiClient
        .get({
          url: "/v1/fillings",
          params: { name, id, status, category_id, ptype },
        })
        .then(({ data: response }) => {
          return response as FillingTypes[];
        }),
    enabled,
    refetchOnMount: true,
  });
};
export default useFillings;
