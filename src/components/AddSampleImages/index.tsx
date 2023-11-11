import { useState } from "react";
import BaseInput from "../BaseInputs";
import UploadComponent, { FileItem } from "../FileUpload";
import Typography, { TextSize } from "../Typography";
import Button from "../Button";
import tgUploadImage from "src/hooks/mutation/tgUploadImage";
import { successToast } from "src/utils/toast";

interface Props {
  setImages?: (arg: string[]) => void;
}

const AddSampleImages = ({ setImages }: Props) => {
  const [files, $files] = useState<FormData>();
  const { mutate: uploadImage } = tgUploadImage();

  const handleFilesSelected = (data: FileItem[]) => {
    const formData = new FormData();
    data.forEach((item) => {
      formData.append("image", item.file, item.file.name);
    });
    $files(formData);
  };

  const handleSubmit = () => {
    uploadImage(files, {
      onSuccess: (data: any) => {
        setImages?.(data.images);
        successToast("image uploaded");
      },
    });
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Typography size={TextSize.XXL}>
          Добавьте примерный вариант вашего торта
        </Typography>

        <Button
          className="bg-yellow mt-4 w-64 "
          type="button"
          onClick={handleSubmit}
        >
          Сохранить
        </Button>
      </div>
      <div className="">
        <BaseInput label="Добавить фото" className="relative w-1/3">
          <UploadComponent onFilesSelected={handleFilesSelected} />
        </BaseInput>
        <div className="border-b w-full mt-4" />
      </div>
    </div>
  );
};

export default AddSampleImages;
