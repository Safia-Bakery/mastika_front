import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";
import { errorToast } from "src/utils/toast";

const categorySyncMutation = () => {
  return useMutation(["category_sync"], () =>
    apiClient
      .put({ url: "/v1/iiko/cakes" })
      .then(({ data }) => data)
      .catch((e) => errorToast(e.message))
  );
};
export default categorySyncMutation;
