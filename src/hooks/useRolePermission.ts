import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";

export const useRolePermission = ({
  id,
  enabled = true,
}: {
  enabled?: boolean;
  id: number | string;
}) => {
  return useQuery({
    queryKey: ["role_permissions", id],
    queryFn: () =>
      apiClient
        .get({ url: `/user/group/permissions/${id}` })
        .then(({ data: response }) => (response as any) || null),
    enabled,
    refetchOnMount: true,
  });
};
export default useRolePermission;
