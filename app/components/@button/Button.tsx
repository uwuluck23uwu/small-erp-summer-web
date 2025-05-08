import { Fragment, type ReactNode } from "react";
import { TooltipButton } from "../@tooltip/Tooltip";

type Props = {
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    styleButton: "btn-blue" | "btn-green" | "btn-sky" | "icon-warning";
    structButton?: string;
    disabled?: boolean;
    iconName?: "icon-question-doc" | "icon-document" | "icon-add";
    btntext?: string;
    tooltipStyle?: "warning";
    tooltipText?: string;
};

export default function Button({
    type,
    onClick,
    styleButton,
    structButton = "btn-base",
    disabled = false,
    iconName,
    btntext,
    tooltipStyle,
    tooltipText = ""
}: Props) {
    let style = "";
    let icon: ReactNode;
    // tooltip
    let bgTooltip = "";
    let borderTooltip = "";
    let textColorTooltip = ""

    // style Button
    switch (styleButton) {
        case "btn-sky":
            style = "btn-sky-primary"
            break;
        case "btn-blue":
            style = "btn-blue"
            break;
        case "btn-green":
            style = "btn-green"
            break;
        case "icon-warning":
            style = "icon-warning"
        default:
            break;
    }

    // icon Name
    let beetweenIcon = btntext ? "pr-2" : ""
    switch (iconName) {
        case "icon-question-doc":
            icon = <i className={`${beetweenIcon} fa-solid fa-file-circle-question`}></i>
            break;
        case "icon-add":
            icon = <i className={`${beetweenIcon} fa-solid fa-circle-plus`}></i>
            break;
        case "icon-document":
            icon = <i className={`${beetweenIcon} fa-solid fa-file-lines`}></i>
            break;
        default:
            break;
    }

    switch (tooltipStyle) {
        case "warning":
            bgTooltip = "bg-[#FFF1D2]";
            borderTooltip = "border-t-[#FFF1D2]";
            textColorTooltip = "text-[#F7B026]"
            break;
        default:
            break;
    }

    return (
        <Fragment>
            <TooltipButton closeTooltip={tooltipStyle ? false : true} text={tooltipText} bg={bgTooltip} border={borderTooltip} textColor={textColorTooltip}>
                <button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    className={`${structButton} whitespace-normal ${style}`}
                >
                    {icon} {btntext}
                </button>
            </TooltipButton>
        </Fragment>
    );
};

;