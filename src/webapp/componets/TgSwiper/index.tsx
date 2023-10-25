import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "./index.scss";

import { EffectCards } from "swiper/modules";
import { useAppSelector } from "src/redux/utils/types";
import { tgItemsSelector } from "src/redux/reducers/tgWebReducer";
import { imageConverter } from "src/utils/helpers";

const TgSwiper = () => {
  const { examplePhoto } = useAppSelector(tgItemsSelector);
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {!!examplePhoto?.length &&
          examplePhoto?.map((item: File, idx) => (
            <SwiperSlide key={idx}>
              <img src={imageConverter(item)} alt={`image-${idx}`} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default TgSwiper;
