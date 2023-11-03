import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PhoneInput from "src/components/BaseInputs/PhoneInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import Typography, { TextSize } from "src/components/Typography";
import useUser from "src/hooks/useUser";

const AddPhone = () => {
  const navigate = useNavigate();
  const [phone, $phone] = useState("");
  const [error, $error] = useState("");

  const { refetch, isSuccess } = useUser({
    phone_number: phone,
    enabled: false,
  });

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    if (phone.split("").length < 7) $error("input valid number");
    else {
      $error("");
      refetch();
    }
  };

  useEffect(() => {
    if (isSuccess) navigate(`/orders/add?phone=${phone}`);
  }, [isSuccess]);

  return (
    <>
      <Header title="Создать заказ" />

      <Card className="p-24 h-[80vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-3 justify-center"
        >
          <Typography size={TextSize.XL}>Получатель</Typography>
          <div>
            <PhoneInput
              autoFocus
              value={phone}
              onChange={(val: string) => $phone(val)}
            />

            {!!error && (
              <Typography size={TextSize.XS} className="text-red-500">
                {error}
              </Typography>
            )}
          </div>
          <Button
            className="bg-yellow ml-2 w-[110px]"
            textClassName="text-black"
            textSize={TextSize.L}
            type="submit"
          >
            Создать
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddPhone;
