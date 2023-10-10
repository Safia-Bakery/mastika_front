import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { UserTypes } from "src/utils/types";

export const useUser = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["get_create_user"],
    queryFn: () =>
      apiClient
        .get("/user/get/create")
        .then(({ data: response }) => response as UserTypes),
    enabled,
  });
};

export default useUser;
