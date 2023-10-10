import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";

export const usePermissions = ({ enabled = true }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["all_permissions"],
    queryFn: () =>
      apiClient.get(`/all/permissions`).then(({ data: response }) => {
        return (response as any[]) || [];
      }),
    enabled,
  });
};
export default usePermissions;
