import { Fragment, type ChangeEvent } from "react";
import { CommaNumber } from "../../helpers/Convert";
import type { IPagin } from "../../@types/@global";

interface FormSelectProps extends Omit<React.ComponentPropsWithoutRef<"select">, "size"> {
    onSizeChange: (page: number) => void;
    size?: IPagin;
    isShowLabel?: boolean;
}

const paginDefault = {
    currentPage: 1,
    pageSize: 10,
    totalRows: 0,
    totalPages: 1,
};

function PageSize(props: FormSelectProps) {
    const { className = "w-20 !box", onSizeChange, size = paginDefault, isShowLabel = true, ...computedProps } = props;
    const jsonOption = [10, 20, 50, 80, 100, 500, 1000];

    const handleChange = (e: ChangeEvent<{ value: string }>) => {
        onSizeChange(parseInt(e.currentTarget.value));
    };

    return (
        <Fragment>
            <div className={size?.totalPages > 0 ? "flex flex-wrap w-full gap-x-2 justify-end items-center" : "hidden"}>
                {isShowLabel ? (
                    <label>
                        แสดง {CommaNumber(size.currentPage)} จาก {CommaNumber(size.totalPages)} (ทั้งหมด {CommaNumber(size.totalRows)} รายการ)
                    </label>
                ) : null}
                <select value={size?.pageSize} onChange={handleChange} {...computedProps} className={size ? `input-default h-[35px] !py-0 ${className}` : "hidden"}>
                    {jsonOption.map((items) => (
                        <option className="font-normal" key={items}>
                            {items}
                        </option>
                    ))}
                </select>
            </div>
        </Fragment>
    );
}

export default PageSize;