import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { BranchesType } from "src/utils/types";

export const useBranches = ({
  enabled = true,
  size,
  page = 1,
  id,
  name,
}: {
  enabled?: boolean;
  size?: number;
  page?: number;
  id?: string;
  name?: string;
}) => {
  return useQuery({
    queryKey: ["get_branches", page, id, name],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/departments", params: { page, size, id, name } })
        .then(({ data: response }) => (response as BranchesType) || null),
    enabled,
  });
};
export default useBranches;
