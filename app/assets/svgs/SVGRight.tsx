import type { ISvg } from "../../@types/@global";

export default function SVGRight({ className }: ISvg) {
  return (
    <svg width={8} height={21} viewBox="0 0 8 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M1 1L6.5 11L1 20.5" strokeLinecap="round" />
    </svg>
  );
}