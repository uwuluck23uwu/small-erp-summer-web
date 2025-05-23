import { Fragment } from "react";
import { CommaNumber } from "../../helpers/Convert";
import type { IPagin } from "../../@types/@global";
import PageSize from "../@page-size/PageSize";

interface dataContent {
  content1?: string;
  content2?: string;
  content3?: string;
  icon1?: string;
  icon2?: string;
  icon3?: string;
}

interface Props {
  title?: string;
  titleData?: string;
  customElement?: React.ReactNode;
  pagin: IPagin;
  commaNumbers?: boolean;
  data?: Array<dataContent>;
  customData?: React.ReactNode;
  countUnit?: string;
  onSizeChange?: (val: number) => void;
  classNameContainer?: string;
}

function TableTop({ classNameContainer, onSizeChange, customData, countUnit = "รายการ", title = "ทั้งหมด", titleData, data = [], customElement = false, pagin, commaNumbers = true }: Props) {
  return (
    <Fragment>
      <div className="w-full">
        <div className="w-full flex justify-center md:justify-end items-center mt-6">{customData ? <div className="order-1 md:order-none flex justify-end">{customData}</div> : null}</div>
        {customElement ? (
          customElement
        ) : (
          <div className={`${classNameContainer} w-full flex flex-wrap items-center justify-end gap-3`}>
            <p className="text-[#2C4150] font-normal line-clamp-1 !page-size-content text-base md:text-lg">
              {title !== "" && (
                <span>
                  {title} {pagin?.totalRows ? (commaNumbers ? CommaNumber(pagin?.totalRows) : pagin?.totalRows) : "0"} {countUnit}
                </span>
              )}
            </p>
            <div className="flex sm:w-auto">
              {titleData && (
                <div className="mr-1 hidden sm:block line-clamp-1">
                  <label className="font-normal">{titleData}</label>
                </div>
              )}
              {data.length > 0 && (
                <div className="ml-1">
                  <div className="flex text-end">
                    {data.map((items, idx) => (
                      <Fragment key={idx}>
                        <i className={`${items.icon1} mx-2 mt-1`} />
                        <label>{items.content1}</label>
                        <i className={`${items.icon2} mx-2 mt-1`} />
                        <label>{items.content2}</label>
                        <i className={`${items.icon3} mx-2 mt-1`} />
                        <label>{items.content3}</label>
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

              <label className="ml-auto sm:mt-auto">
                <div className="font-normal">
                  <PageSize isShowLabel={false} size={pagin} onSizeChange={(size) => onSizeChange && onSizeChange(size)} />
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default TableTop;