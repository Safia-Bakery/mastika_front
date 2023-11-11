import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  id: string;
  status: number;
  price: number;
}

const editProductMutation = () => {
  return useMutation(["handle_products"], async (body: Body) => {
    const { data } = await apiClient.put({
      url: "/v1/cakes",
      body,
    });
    return data;
  });
};
export default editProductMutation;
