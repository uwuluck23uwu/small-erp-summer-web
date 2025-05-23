import type { IMenuList, IMenuListRight } from "~/@types/@global";

export const MenuList: IMenuList[] = [
  {
    code: "01",
    title: "ข้อมูลส่วนตัว",
    icon: "fa-regular fa-circle-user !text-4xl",
    backgroundColor: "bg-[#5D9CEC]",
    linkPage: "#",
  },
  {
    code: "02",
    title: "ประเมินตนเอง (Self Assessment)",
    icon: "fa-solid fa-clipboard-check",
    backgroundColor: "bg-[#F39C12]",
    linkPage: "/exam-history",
  },
  {
    code: "03",
    title: "สอบประเมิน",
    icon: "fa-solid fa-clock-rotate-left",
    backgroundColor: "bg-[#7DCE13]",
    // linkPage: "/assessment-history",
    linkPage: "/exam-schedule",
    // linkPage: "/exam-history",
  },
];

export const MenuListRight: IMenuListRight[] = [
  {
    code: "01",
    title: "FAQ คำถามที่พบบ่อย",
    icon: "fa-question-circle",
    color: "text-blue-500",
  },
  {
    code: "02",
    title: "ติดต่อสอบถาม",
    icon: "fa-brands fa-line",
    color: "text-green-500",
  },
  {
    code: "03",
    title: "คู่มือการใช้งานระบบ",
    icon: "fa-solid fa-book",
    color: "text-orange-500",
  },
];
