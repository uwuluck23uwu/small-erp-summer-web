// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router";
import { useEffect } from "react";

type Props = {
  imageList?: string[];
  delay?: number;
  setLoading?: (val: boolean) => void;
  pagination?: boolean;
  lengthLinkPage?: number | undefined;
  linkPage?: string;
};

export default function ImageSlider({ linkPage, lengthLinkPage, pagination = true, setLoading, imageList, delay = 6000 }: Props) {
  const navigate = useNavigate();

  function handleLoadImage() {
    if (setLoading) return setLoading(false);
  }

  return (
    <Swiper
      pagination={pagination}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      autoplay={{
        delay: delay,
        disableOnInteraction: false,
      }}
    >
      {imageList?.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            key={img}
            onClick={() => {
              if (lengthLinkPage === index) {
                linkPage && navigate(linkPage);
              }
            }}
            onLoad={handleLoadImage}
            src={img}
            alt={img}
            className="w-full h-[220px] object-cover img-grayscale"
            // className="w-full object-cover img-grayscale"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}