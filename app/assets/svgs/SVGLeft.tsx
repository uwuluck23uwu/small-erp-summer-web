import type { ISvg } from "../../@types/@global";

export default function SVGLeft({ className }: ISvg) {
  return (
    <svg width={7} height={21} viewBox="0 0 7 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6.5 20.5L0.999999 10.5L6.5 1" strokeLinecap="round" />
    </svg>
  );
}