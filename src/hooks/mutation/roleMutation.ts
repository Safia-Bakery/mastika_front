import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

const roleMutation = () => {
  return useMutation(
    ["post_role"],
    ({
      name,
      role_id,
      ids,
    }: {
      name?: string;
      role_id?: number;
      ids?: number[];
    }) => {
      if (role_id)
        return apiClient
          .put({ url: "/roles", params: { name, role_id }, body: ids })
          .then(({ data }) => data);
      else
        return apiClient
          .post({ url: "/roles", body: { name } })
          .then(({ data }) => data);
    }
  );
};
export default roleMutation;
