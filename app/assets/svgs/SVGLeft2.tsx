import type { ISvg } from "../../@types/@global";

export default function SVGLeft2({ className }: ISvg) {
  return (
    <svg width={10} height={21} viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9.5 20.5L4 10.5L9.5 1" strokeLinecap="round" />
      <path d="M6.5 20.5L0.999999 10.5L6.5 1" strokeLinecap="round" />
    </svg>
  );
}