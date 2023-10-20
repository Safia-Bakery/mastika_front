import { TextSize } from "src/components/Typography";
import Texts from "../Texts";
import TgModal from "../TgConfirmModal";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";

const TgBranchSelect = () => {
  return (
    <TgModal isOpen={!true}>
      <div className="relative ">
        <div className="rounded-full h-5 w-5 bg-[#C3D2DC] flex items-center justify-center absolute top-[50%] -translate-y-[50%]">
          <img
            height={7}
            width={7}
            src="/assets/icons/backArrow.svg"
            alt="backArrow"
          />
        </div>
        <Texts size={TextSize.XL} uppercase alignCenter>
          ВЫБЕРИТЕ ФИЛИАЛ
        </Texts>
      </div>

      <MainInput
        inputStyle={InputStyle.white}
        className="border rounded-xl border-tgBorder mt-3"
        placeholder="Поиск"
      />
    </TgModal>
  );
};

export default TgBranchSelect;
