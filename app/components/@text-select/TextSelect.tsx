import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";

export function Select({ selectType = "", ...props }) {
    switch (selectType) {
        case "object":
            return <div {...props}>{props.value}</div>;
        default:
            return <input readOnly {...props} />;
    }
}

interface Props {
    isMultiDefault?: string;
    name?: string;
    placeholder?: string;
    options?: any;
    value?: any;
    isLoading?: boolean;
    isSearch?: boolean;
    messageLoading?: string;
    messageNoData?: string;
    className?: string;
    onChange?: any;
    onSearch?: any;
    onFocus?: any;
    optionValue?: string;
    optionLabel?: any;
    title?: string;
    isMulti?: boolean;
    disabled?: boolean;
    openError?: boolean;
    messageNoDataStyle?: string;
    titleElement?: ReactNode;
    titleElementStyle?: string;
    error?: any;
    touched?: any;
}

export default function TextSelect({ touched, error, titleElementStyle, titleElement, messageNoDataStyle = "", openError, disabled = false, isMulti = false, title = "", optionLabel = false, optionValue = "value", onFocus = false, onSearch = false, onChange = false, className = "", messageNoData = "ไม่พบข้อมูล", messageLoading = "กำลังโหลดข้อมูล...", isSearch = true, isLoading = false, value, options, placeholder = "", name = "", isMultiDefault = "", ...props }: Props) {
    const ref = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [searchKey, setSearchKey] = useState<string>("");

    useEffect(() => {
        if (open) {
            document.getElementById(`search-${name}`)?.focus();
            if (options.length > 0) {
                const result = options.map(function (item: any) {
                    return {
                        [optionValue]: item[optionValue],
                        labelOptions: options
                            .filter((a: any) => a[optionValue] === item[optionValue])
                            .map(optionLabel ? optionLabel : (a: any) => a["label"])
                            .toString(),
                        options: item,
                    };
                });
                setData(searchKey ? result.filter((a: any) => a.labelOptions.toLowerCase().includes(searchKey.trim().toLowerCase())) : result);
            } else {
                setData([]);
            }
        }
    }, [name, open, optionLabel, optionValue, options, searchKey, value]);

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(!open);
                setSearchKey("");
                setShowAll(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [open]);

    function SetValue(data: any) {
        let value = "";
        if (data.length > 0) {
            if (data.length === 1) {
                if (Array.isArray(data[0])) {
                    value = data[0][0]
                        .split(" ")
                        .filter((a: any) => a !== "")
                        .join(" ");
                } else {
                    value = data[0]
                        .split(" ")
                        .filter((a: any) => a !== "")
                        .join(" ");
                }
            } else {
                value = data;
            }
        }
        return value;
    }

    return (
        <Fragment>
            <div className="w-full relative" ref={ref}>
                <div className={`${titleElementStyle} flex items-center justify-between`}>
                    <label htmlFor={`select-${name}`} className={title ? "font-light" : "hidden"}>
                        {title}
                    </label>
                    {titleElement && titleElement}
                </div>
                <div className="flex items-center relative">
                    <Select
                        {...props}
                        id={`select-${name}`}
                        disabled={disabled ? disabled : false}
                        value={value.length > 0 && Array.isArray(value) ? (isMulti ? (isMultiDefault ? isMultiDefault : `${value.length} รายการ`) : SetValue(value.map(optionLabel ? optionLabel : (a) => a["label"]))) : placeholder ? placeholder : "- เลือก -"}
                        selectType={typeof (value.length > 0 && Array.isArray(value) && value.map(optionLabel ? optionLabel : (a) => a["label"])[0])}
                        name={name}
                        className={`${className ? className : `${touched ? error ? "input-error" : "input-success" : "input-default pr-8"}`}  ${disabled ? "input-disabled pr-8" : ""}`}
                        onClick={() => {
                            setOpen(!open);
                            setSearchKey("");
                            setShowAll(false);
                            onFocus && onFocus();
                        }}
                    />
                    <i className="fas fa-angle-down -ml-6 fill-current text-gray-600 text-base"></i>
                </div>
                <div className={`border rounded-md shadow-sm p-2 w-full absolute z-[50] bg-white ${!open && "hidden"}`}>
                    {isSearch && (
                        <div className="flex items-center mb-2 relative">
                            <i className="fas fa-search ml-3 mt-[2px] fill-current text-gray-400 text-md z-10"></i>
                            <input
                                autoComplete="off"
                                id={`search-${name}`}
                                value={searchKey}
                                className="w-full py-1 font-light rounded-lg outline-none h-10 px-2 border border-gray-400 pl-9 -ml-7"
                                onChange={(e) => {
                                    const keySearch = (e.target.value) ?? "";
                                    onSearch && onSearch(keySearch);
                                    setSearchKey(keySearch);
                                }}
                            />
                        </div>
                    )}
                    <ul className={`list-none max-h-64 ${open ? "overflow-y-auto" : ""}`}>
                        {isLoading ? (
                            <li className="p-2 rounded-md">
                                <span>{messageLoading}</span>
                            </li>
                        ) : data.length === 0 ? (
                            <li className={`p-2 rounded-md ${messageNoDataStyle}`}>
                                <span>{messageNoData}</span>
                            </li>
                        ) : (
                            data.slice(0, showAll ? data.length : 50).map((item: any, index: number) => (
                                <li
                                    key={optionValue ? item[optionValue] : index}
                                    className={`p-2 rounded-md my-0.5 hover:bg-[#2C4150] hover:text-white cursor-pointer font-light ${Array.isArray(value) && value.filter((a) => a[optionValue] === item[optionValue]).length > 0 && "bg-[#2C4150] text-white"}`}
                                    onClick={() => {
                                        onChange && onChange(item.options);
                                        setOpen(!open);
                                        setSearchKey("");
                                        setShowAll(false);
                                        document.getElementById(`select-${name}`)?.focus();
                                    }}
                                >
                                    {item.labelOptions}
                                </li>
                            ))
                        )}
                        {data.length > 50 && !isLoading && (
                            <li
                                className="p-2 rounded-md text-center hover:bg-blue-s5 cursor-pointer"
                                onClick={() => {
                                    setShowAll(!showAll);
                                }}
                            >
                                <span>{showAll ? "-- แสดงน้อยลง --" : "-- แสดงทั้งหมด --"}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}