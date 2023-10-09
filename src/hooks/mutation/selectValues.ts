import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";
import { errorToast } from "src/utils/toast";

interface Body {
  content: string;
  value: string;
  subcat_id: number;
}

const selectValsMutation = () => {
  return useMutation(["select_values"], (body: Body) =>
    apiClient
      .post({ url: "/v1/sel/value", body })
      .then(({ data }) => data)
      .catch((e) => errorToast(e.message))
  );
};
export default selectValsMutation;
