import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { RoleTypes } from "src/utils/types";

export const useRoles = ({
  enabled = true,
  id,
}: {
  enabled?: boolean;
  id?: number;
}) => {
  return useQuery({
    queryKey: ["user_role", id],
    queryFn: () =>
      apiClient
        .get({ url: "/roles", params: { id } })
        .then(({ data: response }) => response as RoleTypes[]),
    enabled,
    refetchOnMount: true,
  });
};
export default useRoles;
