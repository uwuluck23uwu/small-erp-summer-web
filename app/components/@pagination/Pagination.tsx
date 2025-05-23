import { useEffect, useState } from "react";
import SVGLeft from "../../assets/svgs/SVGLeft";
import SVGLeft2 from "../../assets/svgs/SVGLeft2";
import SVGRight from "../../assets/svgs/SVGRight";
import SVGRight2 from "../../assets/svgs/SVGRight2";

interface Props {
    pagin: {
        currentPage: number;
        pageSize: number;
        totalRows: number;
        totalPages: number;
    };
    className?: string;
    onPageChange: (page: number) => void;
    size?: string;
    dataLength?: number;
    containerClassName?: string;
}

function formatNumber(number: number, digits = 0) {
    if (number) {
        return number.toLocaleString("en-GB", {
            maximumFractionDigits: digits,
        });
    } else {
        return 0;
    }
}

const Pagination = ({ pagin, onPageChange, className = "", size = "full", dataLength = 0, containerClassName = "" }: Props) => {
    const amountStart = ((pagin.currentPage ?? 0) - 1) * (pagin.pageSize ?? 0) + 1;
    const amountEnd = (pagin.currentPage - 1) * pagin.pageSize + (dataLength - 1 + 1);
    const [page, setPage] = useState<any>(pagin.currentPage);
    const [pagesToShow, setPagesToShow] = useState(pagin.totalPages);

    useEffect(() => {
        if (pagin.totalPages >= 5) {
            setPagesToShow(5);
        } else if (pagin.totalPages <= 0) {
            setPagesToShow(1);
        } else {
            setPagesToShow(pagin.totalPages);
        }
    }, [pagin.totalPages]);

    useEffect(() => {
        setPage(pagin.currentPage);
    }, [pagin.currentPage]);

    const getPageNumbers = () => {
        const halfPagesToShow = Math.floor(pagesToShow / 2);

        let startPage = pagin.currentPage - halfPagesToShow;
        if (startPage < 1) {
            startPage = 1;
        }
        let endPage = startPage + pagesToShow - 1;
        if (endPage > pagin.totalPages) {
            endPage = pagin.totalPages;
            startPage = endPage - pagesToShow + 1;
        }
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const renderPageNumbers = (className = "") => {
        const pageNumbers = getPageNumbers();
        return pageNumbers.map((page: number) => (
            <button
                disabled={pagin.currentPage === page}
                type="button"
                key={page}
                className={`min-w-[35px] px-2 shadow-none font-normal flex items-center justify-center text-[#212121] ${className}`}
                onClick={() => {
                    onPageChange(page);
                }}
            >
                <label className={`${pagin.currentPage === page && "text-[#FD6655] underline underline-offset-2"} cursor-pointer font-semibold`}>{formatNumber(page, 0)}</label>
            </button>
        ));
    };

    return (
        <div className={dataLength === 0 ? "hidden" : `${containerClassName} flex flex-wrap md:justify-between justify-center w-full my-5 gap-5`}>
            <div>
                <label className="whitespace-nowrap">
                    แสดง {formatNumber(amountStart, 0)} ถึง {formatNumber(amountEnd, 0)} (ทั้งหมด {formatNumber(pagin.totalRows ?? 0, 0)} รายการ)
                </label>
            </div>
            <div className="flex flex-nowrap md:flex-none items-center justify-end gap-x-1 gap-y-3 ">
                <div className={`${pagin.totalPages > 0 ? "pagination" : "hidden"} flex gap-1 items-center`}>
                    <div
                        className={`${pagin.currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={() => {
                            if (pagin.currentPage !== 1) onPageChange(1);
                        }}
                    >
                        <SVGLeft2 className={`${pagin.currentPage === 1 ? "stroke-[#8D8D8D] cursor-not-allowed" : "stroke-blue-main cursor-pointer"}`} />
                    </div>
                    <div
                        className={`${pagin.currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={() => {
                            if (pagin.currentPage !== 1) onPageChange(pagin.currentPage - 1);
                        }}
                    >
                        <SVGLeft className={`${pagin.currentPage === 1 ? "stroke-[#8D8D8D] cursor-not-allowed" : "stroke-blue-s1 cursor-pointer"}`} />
                    </div>
                    {renderPageNumbers(className)}
                    <div
                        className={`${pagin.currentPage === pagin.totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={() => {
                            if (pagin.currentPage !== pagin.totalPages) onPageChange(pagin.currentPage + 1);
                        }}
                    >
                        <SVGRight className={`${pagin.currentPage === pagin.totalPages ? "stroke-[#8D8D8D] cursor-not-allowed" : "stroke-blue-main cursor-pointer"}`} />
                    </div>
                    <div
                        className={`${pagin.currentPage === pagin.totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={() => {
                            if (pagin.currentPage !== pagin.totalPages) onPageChange(pagin.totalPages);
                        }}
                    >
                        <SVGRight2 className={`${pagin.currentPage === pagin.totalPages ? "stroke-[#8D8D8D] cursor-not-allowed" : "stroke-blue-main cursor-pointer"}`} />
                    </div>
                </div>
                <div className={`${pagin.totalPages > 0 && size === "full" ? "flex w-full sm:w-fit justify-end items-center px-2" : "hidden"}`}>
                    <label className="pr-2 whitespace-nowrap">ไปยังหน้าที่</label>
                    <input
                        type="number"
                        min={1}
                        value={page}
                        className="w-16 input_default h-[35px]"
                        onChange={(e) => {
                            if (e.target.value) {
                                const convert = e.target.value ? parseInt(e.target.value) : 1;
                                if (convert > pagin.totalPages) {
                                    setPage(pagin.totalPages);
                                } else if (convert < -1) {
                                    setPage(1);
                                } else {
                                    setPage(convert);
                                }
                            } else {
                                setPage(e.target.value);
                            }
                        }}
                        onBlur={(event) => {
                            event.preventDefault();
                            page ? onPageChange(page) : onPageChange(1);
                        }}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                page ? onPageChange(page) : onPageChange(1);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
export default Pagination;