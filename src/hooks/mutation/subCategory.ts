import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  name: string;
  status?: string;
  category_id?: number;
  contenttype_id?: number;
  id?: number;
}

const subCategoryMutation = () => {
  return useMutation(
    ["handle_sub_category"],
    async ({ name, status, category_id, contenttype_id, id }: Body) => {
      if (!id) {
        const { data } = await apiClient.post({
          url: "/v1/sub/category",
          body: { name, category_id, contenttype_id },
        });
        return data;
      } else {
        const { data } = await apiClient.put({
          url: "/v1/sub/category",
          body: { id, contenttype_id, name, status },
        });
        return data;
      }
    }
  );
};
export default subCategoryMutation;
