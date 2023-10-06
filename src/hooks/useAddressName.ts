import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
// import { Category } from "src/utils/types";
const apiKey = "51697f82-c9b3-463e-8305-c7ed2bfe3ad3";

export const useAddressName = ({
  enabled = true,
  coords,
}: {
  enabled?: boolean;
  coords: number[];
}) => {
  return useQuery({
    queryKey: ["address_name"],
    queryFn: () =>
      apiClient
        .get(`/category`)
        .then(({ data: response }) => (response as any) || null),
    enabled,
    refetchOnMount: true,
  });
};
export default useAddressName;
