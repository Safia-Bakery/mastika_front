import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  id?: number;
  content: string;
  value: string;
  status?: number;
  selval_id?: number;
}

const childSubCategoryMutation = () => {
  return useMutation(
    ["handle_sub_category_child"],
    async ({ status, id, content, value, selval_id }: Body) => {
      if (!id) {
        const { data } = await apiClient.post({
          url: "/v1/child/sel/value",
          body: { selval_id, content, value },
        });
        return data;
      } else {
        const { data } = await apiClient.put({
          url: "/v1/child/sel/value",
          body: { id, content, value, status },
        });
        return data;
      }
    }
  );
};
export default childSubCategoryMutation;
