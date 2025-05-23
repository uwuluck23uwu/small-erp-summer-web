import { Fragment, useState } from "react";
import Business from "../assets/images/banner/Business.jpg";
import SummerSeason from "../assets/images/banner/SummerSeason.jpg";
import Mouse from "../assets/images/profile/Mouse.jpg";
import QrcodeContact from "../assets/images/qrcode/Qrcode-Contact.jpg";
import { useNavigate } from "react-router";
import AssessmentHistory from "./assessment/AssessmentHistory";
import LoadingImageSlider from "~/components/loading-animate/LoadingImageSlider";
import ImageSlider from "~/components/slide-swiper/ImageSlider";
import { MenuList, MenuListRight } from "./@data/menu";

export default function MainHome() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isMenuModal, setIsMenuModal] = useState<string>("");
  const navigate = useNavigate();

  function renderContentModal() {
    switch (isMenuModal) {
      case "02":
        return {
          titleModal: "ประเมินตนเอง",
          contentModal: <AssessmentHistory />,
        };
      default:
        return { titleModal: "", contentModal: null };
    }
  }
  const { titleModal, contentModal } = renderContentModal();

  return (
    <Fragment>
      <div className="flex flex-wrap h-full gap-x-5">
        <section className="w-full lg:w-8/12 h-full">
          <div className="flex flex-col h-full">
            <div className="relative h-max">
              {loading ? (
                <LoadingImageSlider />
              ) : (
                <ImageSlider
                  pagination={!loading}
                  setLoading={(load) => setLoading(load)}
                  imageList={[Business, SummerSeason]}
                  delay={1000}
                />
              )}
            </div>
            <div className="pt-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4 h-full">
              {MenuList.length > 0 &&
                MenuList.map((menuItem, index) => (
                  <menu
                    onClick={() =>
                      index === 1
                        ? setIsMenuModal(menuItem.code)
                        : navigate(menuItem.linkPage)
                    }
                    key={index}
                    className={`${menuItem.backgroundColor} cursor-pointer p-5 text-white col-span-2 flex flex-col justify-center items-center gap-y-3 h-full`}
                  >
                    {menuItem.code === "01" && Mouse ? (
                      <img
                        src={Mouse}
                        alt="profile-image"
                        className="w-14 h-14 rounded-full object-cover bg-cover"
                      />
                    ) : index === 2 ? (
                      <div className="relative">
                        <i className="fa-regular fa-file-lines text-2xl lg:text-3xl"></i>
                        <i className="bg-[#7DCE13] fa-solid fa-clock-rotate-left absolute top-5 shadow-2xl rotate-[190deg] -right-2"></i>
                      </div>
                    ) : (
                      <i
                        className={`${menuItem.icon} text-2xl lg:text-3xl`}
                      ></i>
                    )}
                    <p className="text-base text-center">{menuItem.title}</p>
                  </menu>
                ))}
            </div>
          </div>
        </section>

        <section className="flex-1 mt-5 lg:mt-0 2xl:pl-24">
          <p className="text-title-sub lg:pb-6 xl:pb-0">
            การช่วยเหลือผู้ใช้งานระบบ
          </p>
          <div className="flex flex-col h-full mt-2">
            {MenuListRight.map((item, index) => {
              const marginClass = index > 0 ? "mt-5" : "";
              return (
                <div
                  key={index}
                  className={`card-home-container ${marginClass} cursor-pointer relative`}
                >
                  {index === 1 && (
                    <img
                      src={QrcodeContact}
                      alt="qrcode-contact"
                      className="!cursor-default h-14 w-14 xl:h-20 xl:w-20 absolute top-[36%] left-10 xl:left-16 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                  <i
                    className={`fa-solid ${item.icon} ${item.color} text-responsive-s2`}
                  />
                  <p className="text-xl text-steel mt-1">{item.title}</p>
                  {index === 1 && (
                    <p className="text-steel text-xs pt-1">
                      เพื่อความสะดวกและรวดเร็วในการติดต่อ กรุณา Add Line
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Fragment>
  );
}
