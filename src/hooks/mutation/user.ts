import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";
import { errorToast } from "src/utils/toast";

interface Body {
  username: string;
  password: string;
  phone_number: string;
  role_id: number;
  full_name: string;
  status: number;

  id?: number;
}

const userMutation = () => {
  return useMutation(
    ["create_update_user"],
    (body: Body) => {
      if (body.id)
        return apiClient
          .put({ url: "/users", body })
          .then((res) => {
            if (res.status === 200) return res;
          })
          .catch((e) => errorToast(e.message));
      return apiClient
        .post({
          url: "/user",
          body,
        })
        .then((res) => {
          if (res.status === 200) return res;
        });
    },
    {
      onError: (e: any) =>
        errorToast(
          e.response?.data.detail ? e.response?.data.detail : e.message
        ),
    }
  );
};
export default userMutation;
