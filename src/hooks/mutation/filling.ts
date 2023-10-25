import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  name: string;
  category_id: number;
  ptype: number;

  status?: number;
  id?: number;
}

const fillingMutation = () => {
  return useMutation(["handle_fillings"], async (body: Body) => {
    if (!body.id) {
      const { data } = await apiClient.post({
        url: "/v1/fillings",
        body,
      });
      return data;
    } else {
      const { data } = await apiClient.put({
        url: "/v1/fillings",
        body,
      });
      return data;
    }
  });
};
export default fillingMutation;
