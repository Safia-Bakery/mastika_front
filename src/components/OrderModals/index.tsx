import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import CloseIcon from "src/components/CloseIcon";
import Modal from "src/components/Modal";
import Typography, { TextSize } from "src/components/Typography";
import orderMutation from "src/hooks/mutation/order";
import { useRemoveParams } from "src/hooks/useCustomNavigate";
import useOrder from "src/hooks/useOrder";
import useQueryString from "src/hooks/useQueryString";
import { successToast } from "src/utils/toast";
import { OrderStatus } from "src/utils/types";
import { OrderModal } from "../../pages/ShowOrder";
import UploadComponent, { FileItem } from "src/components/FileUpload";
import tgUploadImage from "src/hooks/mutation/tgUploadImage";
import Button from "src/components/Button";

const Modals = () => {
  const { id } = useParams();
  const { mutate } = orderMutation();
  const modal = Number(useQueryString("modal"));
  const [files, $files] = useState<FormData>();
  const { mutate: uploadImage } = tgUploadImage();
  const removeParams = useRemoveParams();
  const { register, getValues } = useForm();

  const closeModal = () => removeParams(["modal"]);

  const { data, refetch } = useOrder({
    id: Number(id),
    enabled: !!id,
  });
  const order = data?.order?.[0];

  const handleFilesSelected = (data: FileItem[]) => {
    const formData = new FormData();
    data.forEach((item) => {
      formData.append("image", item.file, item.file.name);
    });
    $files(formData);
  };

  const handleImageSubmit = () => {
    uploadImage(files, {
      onSuccess: (data: any) => {
        // setImages?.(data.images);
        mutate(
          { id: Number(id), ...(data.images && { images: data.images }) },
          {
            onSuccess: () => {
              closeModal();
              successToast("image uploaded");
            },
          }
        );
      },
    });
  };

  const handleStatus = (status: OrderStatus) => {
    if (!order?.order_vs_category?.id && modal !== OrderModal.deny) {
      return alert("Выберите направление");
    } else {
      mutate(
        { status, id: Number(id), reject_reason: getValues("cancel_reason") },
        {
          onSuccess: () => {
            successToast("status changed");
            refetch();
            if (modal) closeModal();
          },
        }
      );
    }
  };

  const switchContent = (item: OrderModal) => {
    switch (item) {
      case OrderModal.deny:
        return (
          <form className="p-3 h-full">
            <div className="flex w-full justify-between items-center">
              <Typography size={TextSize.XXL}>Причина отклонении</Typography>
              <CloseIcon onClick={closeModal} />
            </div>

            <div className="flex flex-col justify-between h-full">
              <BaseInput label="Комментарии" className="mt-4">
                <MainTextArea register={register("cancel_reason")} />
              </BaseInput>

              <Button
                className="bg-primary text-white absolute bottom-2 w-[initial]"
                onClick={() => handleStatus(OrderStatus.rejected)}
              >
                Отправить
              </Button>
            </div>
          </form>
        );

      case OrderModal.image:
        return (
          <div className="p-4">
            <div className="flex justify-between items-center">
              <Typography size={TextSize.XXL} className="mr-6">
                Добавьте примерный вариант вашего торта
              </Typography>
              <CloseIcon onClick={closeModal} />
            </div>
            <div className="my-4">
              <BaseInput label="Добавить фото" className="relative">
                <UploadComponent onFilesSelected={handleFilesSelected} />
              </BaseInput>

              <div className="border-b w-full mt-4" />
            </div>

            <Button
              className="bg-yellow mt-8 w-full"
              type="button"
              onClick={handleImageSubmit}
            >
              Сохранить
            </Button>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <Modal isOpen={!!modal} onClose={closeModal}>
      {switchContent(modal)}
    </Modal>
  );
};

export default Modals;
