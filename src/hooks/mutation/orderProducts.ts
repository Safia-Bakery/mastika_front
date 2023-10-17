import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface BodyTypes {
  order_id: number;
  product_id: string;
  comment: string;
  amount: number;
}
const orderProducts = () => {
  return useMutation(["order_products_nutate"], (body: BodyTypes[]) =>
    apiClient
      .post({
        url: "/v1/orders/products",
        body,
      })
      .then(({ data }) => data)
      .catch((e) => e.message)
  );
};
export default orderProducts;
