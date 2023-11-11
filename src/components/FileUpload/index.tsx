import { ChangeEvent, FC, useState } from "react";
import Typography, { TextSize } from "../Typography";
import { imageConverter } from "src/utils/helpers";
import MainInput from "../BaseInputs/MainInput";

export interface FileItem {
  file: File;
  id: number | string;
}
interface FileUploaderProps {
  onFilesSelected: (formData: FileItem[]) => void;
  inputRef?: any;
}

const UploadComponent: FC<FileUploaderProps> = ({
  onFilesSelected,
  inputRef,
}) => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [fileIdCounter, setFileIdCounter] = useState(0);
  // const upladedFiles = useAppSelector(reportImgSelector);

  // useEffect(() => {
  //   if (!upladedFiles) setFileList([]);
  // }, [upladedFiles]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const updatedFileList: FileItem[] = [...fileList];
      for (let i = 0; i < files.length; i++) {
        const newFileItem: FileItem = {
          file: files[i],
          id: fileIdCounter + i,
        };
        updatedFileList.push(newFileItem);
      }
      onFilesSelected(updatedFileList);
      setFileList(updatedFileList);
      setFileIdCounter(fileIdCounter + files.length);
    }
  };

  const handleFileDelete = (id: number | string) => {
    const updatedFileList = fileList.filter((item) => item.id !== id);
    setFileList(updatedFileList);
    onFilesSelected(updatedFileList);
  };

  return (
    <div>
      <div className="rounded-md relative">
        <MainInput
          className="mb-2 w-full rounded-lg"
          placeholder="Выбрать файл"
        />
        <input
          className="absolute inset-0 opacity-0 cursor-pointer"
          id="fileUploader"
          type="file"
          ref={inputRef}
          multiple
          onChange={handleFileUpload}
        />
      </div>

      {!fileList?.length ? (
        <div className="gap-2 flex mt-2">
          {...[Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center flex-1 h-12 border border-mainGray rounded-md bg-lightGray"
            >
              <Typography size={TextSize.S} className="text-[#9F9FA0]">
                (image)
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        <div className="gap-2 flex mt-2">
          {fileList.map((item, idx) => (
            <div className="relative" key={idx}>
              <img
                src={imageConverter(item.file)}
                className="max-h-12 object-contain h-full"
                alt={`image-${idx}`}
              />
              <div
                className="absolute top-1 right-1 border border-black rounded-full"
                onClick={() => handleFileDelete(item.id)}
              >
                <img src="/assets/icons/clear.svg" alt="delete" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
