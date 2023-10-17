import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";
import { errorToast } from "src/utils/toast";

const orderDynamic = () => {
  const contentType = "multipart/form-data";
  return useMutation(["order_dynamic"], (body: any) =>
    apiClient
      .post({ url: "/v1/orders/dynamic", body, contentType })
      .then(({ data }) => data)
      .catch((e) => errorToast(e.message))
  );
};
export default orderDynamic;
