import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";
import { errorToast } from "src/utils/toast";

const orderDynamic = () => {
  return useMutation(["order_dynamic"], (body: object) =>
    apiClient
      .post({ url: "/v1/orders/dynamic", body })
      .then(({ data }) => data)
      .catch((e) => errorToast(e.message))
  );
};
export default orderDynamic;
