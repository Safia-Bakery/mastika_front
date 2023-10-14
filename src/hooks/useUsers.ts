import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { UsersType } from "src/utils/types";

export const useUsers = ({
  enabled = true,
  page,
  size,
  id,
  is_client,
}: {
  enabled?: boolean;
  page?: number;
  size?: number;
  id?: number;
  is_client?: number;
}) => {
  return useQuery({
    queryKey: ["get_create_user", page, size, id, is_client],
    queryFn: () =>
      apiClient
        .get({ url: "/user", params: { page, size, id, is_client } })
        .then(({ data: response }) => response as UsersType),
    enabled,
  });
};

export default useUsers;
