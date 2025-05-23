import type { FC, ReactNode } from "react";

interface TooltipProps {
    text: string;
    children: ReactNode;
    className?: string;
    hidden?: boolean;
    value?: string | number;
    width?: string | number;
}

const Tooltip: FC<TooltipProps> = ({ text, children }) => {
    let backgroundColor: string = "";
    let tooltipColor: string = "";
    let textTooltipColor: string = "";
    let borderTooltipColor: string = "";

    switch (text) {
        case "รายละเอียด":
            backgroundColor = "bg-blue-main";
            tooltipColor = "bg-blue-100";
            textTooltipColor = "text-blue-main";
            borderTooltipColor = "border-t-blue-100";
            break;
        case "แก้ไข":
            backgroundColor = "bg-yellow-main";
            tooltipColor = "bg-yellow-100";
            textTooltipColor = "text-yellow-main";
            borderTooltipColor = "border-t-yellow-100";
            break;
        case "ลบ":
        case "ยกเลิก Pay-in":
            backgroundColor = "bg-red-main";
            tooltipColor = "bg-red-100";
            textTooltipColor = "text-red-main";
            borderTooltipColor = "border-t-red-100";
            break;
        case "พิมพ์ Pay-in":
        case "ใบประกาศ":
        case "ลิ้งค์":
            backgroundColor = "bg-sky-blue-main";
            tooltipColor = "bg-blue-100";
            textTooltipColor = "text-sky-blue-main";
            borderTooltipColor = "border-t-blue-100";
            break;
        case "พิจารณา":
            backgroundColor = "bg-violet-main";
            tooltipColor = "bg-violet-100";
            textTooltipColor = "text-violet-main";
            borderTooltipColor = "border-t-violet-100";
            break;
        case "พิมพ์ใบคำขอ":
            backgroundColor = "bg-sky-blue-main";
            tooltipColor = "bg-cyan-main";
            textTooltipColor = "text-sky-blue-main";
            borderTooltipColor = "border-t-cyan-main";
            break;
        case "ชำระเงิน":
            backgroundColor = "bg-green-main";
            tooltipColor = "bg-green-100";
            textTooltipColor = "text-green-main";
            borderTooltipColor = "border-t-cyan-main";
            break;
        default:
            backgroundColor = "";
            tooltipColor = "";
            textTooltipColor = "";
            break;
    }

    return (
        <div role="tooltip" className={`tooltip-container rounded-md text-white ${backgroundColor}`}>
            {children}
            <div className={`tooltip ${tooltipColor}`}>
                <div className={`arrow border-t-[4px] border-solid ${borderTooltipColor}`} />
                <label className={`font-medium ${textTooltipColor}`}>{text}</label>
            </div>
        </div>
    );
};

export default Tooltip;

export function TooltipRight({ text, hidden = false, className, children }: TooltipProps) {
    return (
        <div role="tooltip" className="tooltip-container-right">
            {children}
            <div className={hidden ? "hidden" : "tooltip-right " + className}>
                <div className="arrow-right" />
                <p dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </div>
    );
}

export function TooltipBar({ text, value, children, width }: TooltipProps) {
    return (
        <div role="tooltip" id="tooltip2" className="tooltip-bar-container w-full">
            {children}
            <div className="tooltip-bar bg-transparent text-[#3D3D3D] border rounded-t-md" style={{ top: -50, left: width === "100%" ? `calc(60% + 15px)` : `calc(${width} + 10px)` }}>
                <div className="block">
                    <div className="bg-slate-200 p-2 text-sm">{text}</div>
                    <div className="bg-white p-3 text-base flex items-center gap-2 rounded-b-md">
                        <div className="h-4 w-4 bg-[#81D4FA] rounded-full"></div>
                        {value}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ITooltipButtonProps {
    text: string;
    children: ReactNode;
    bg?: string;
    border?: string;
    textColor?: string;
    disabled?: boolean;
    className?: string;
    closeTooltip?: boolean
}

export function TooltipButton({ text, children, bg = "#aaaaaa", border = "#aaaaaa", textColor = "#aaaaaa", disabled = false, className, closeTooltip = false }: ITooltipButtonProps) {
    return (
        <div>
            {closeTooltip ? children :
                <div role="tooltip" className={`tooltip-container rounded-md text-white ${bg} ${className}`}>
                    {children}
                    {!disabled ? (
                        <div className={`tooltip -top-11 ${bg}`}>
                            <div className={`arrow border-t-[4px] border-solid ${border}`} />
                            <label className={`font-semibold ${textColor}`}>{text}</label>
                        </div>
                    ) : null}
                </div>
            }
        </div>
    );
}