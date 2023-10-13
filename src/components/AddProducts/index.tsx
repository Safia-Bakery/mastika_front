import React from "react";
import Typography, { TextSize } from "../Typography";
import Button from "../Button";
import Modal from "../Modal";
import MainInput from "../BaseInputs/MainInput";

const AddProduct = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Typography size={TextSize.XXL}>Товары</Typography>
        <Button className="bg-darkBlue mt-4 w-64 text-white" type="button">
          Добавить блюдо
        </Button>
      </div>
      <Modal isOpen={false} className="!w-[815px] max-w-none">
        <div className="rounded-md bg-white p-4">
          <Typography size={TextSize.XXL}>Товары</Typography>

          <MainInput placeholder={"Поиск продукции"} />
          <div className="mt-4">
            {[...Array(4)].map((item) => (
              <div className="flex items-center mb-2 gap-2">
                <img
                  src="/assets/icons/folder.svg"
                  alt="file-img"
                  height={35}
                  width={35}
                />
                <span className="text-xl text-darkBlue underline">
                  Круглые торты
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddProduct;
