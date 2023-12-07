import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";
import { errorToast } from "src/utils/toast";

const tgUploadImage = () => {
  const contentType = "multipart/form-data";
  const config = { timeout: 100000 };

  return useMutation(["tg_upload_image"], (body: any) =>
    apiClient
      .post({ url: "/v1/image/upload", body, contentType, config })
      .then(({ data }) => data)
      .catch((e) => errorToast(e.message))
  );
};
export default tgUploadImage;
