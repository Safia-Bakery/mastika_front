import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  name: string;
  status?: number;
  id?: string;
  price?: number;
  image?: any;
}

const categoryMutation = () => {
  return useMutation(["handle_category"], async (body: Body) => {
    const contentType = "multipart/form-data";
    if (!body.id) {
      const { data } = await apiClient.post({
        url: "/v1/category",
        body,
        contentType,
      });
      return data;
    } else {
      const { data } = await apiClient.put({
        url: "/v1/category",
        body,
        contentType,
      });
      return data;
    }
  });
};
export default categoryMutation;
