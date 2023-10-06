import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { ContentTypes } from "src/utils/types";

export const useContentType = ({ enabled = true }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["content_types"],
    queryFn: () =>
      apiClient.get("/v1/content/types").then(({ data: response }) => {
        return response as ContentTypes[];
      }),
    enabled,
    refetchOnMount: true,
  });
};
export default useContentType;
