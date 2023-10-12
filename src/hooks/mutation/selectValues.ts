import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface Body {
  content: string;
  value?: string;
  subcat_id: number;
  id?: number;
  status?: number;
}

const selectValsMutation = () => {
  return useMutation(
    ["select_values"],
    async ({ value, status, content, id, subcat_id }: Body) => {
      if (!id) {
        const { data } = await apiClient.post({
          url: "/v1/sel/value",
          body: { content, value, subcat_id },
        });
        return data;
      } else {
        const { data } = await apiClient.put({
          url: "/v1/sel/value",
          body: { id, status, content, value },
        });
        return data;
      }
    }
  );
};
export default selectValsMutation;
