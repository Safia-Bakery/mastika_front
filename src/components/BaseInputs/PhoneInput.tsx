import { FC, HTMLInputTypeAttribute } from "react";
import Phone from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import cl from "classnames";
import styles from "./index.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  onChange?: any;
  className?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  onFocus?: () => void;
  ref?: any;
}

const PhoneInput: FC<Props> = ({
  className,
  placeholder = "",
  register,
  autoFocus,
  onChange,
  ...others
}) => {
  return (
    <Phone
      inputProps={{
        // name: 'phone',
        required: true,
        autoFocus: autoFocus,
        className: cl(
          className,
          "form-control mb-2 !bg-mainGray ",
          styles.inputBox
        ),
      }}
      country={"uz"}
      onChange={onChange}
      onlyCountries={["uz", "kz"]}
      placeholder={placeholder || ""}
      {...register}
      {...others}
    />
  );
};

export default PhoneInput;
