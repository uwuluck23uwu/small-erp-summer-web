// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, Fragment } from "react";
import CalendarRow from "./CalendarRow";
import moment from "moment";

type Props = {
  classCalendar: string;
  isOpen: boolean;
  value: string | null;
  onChange: (e: string) => void;
  minDate?: string;
  maxDate?: string;
  position?: 'top' | 'bottom';
};

const month: string[] = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

export type DMYTRes = {
  day: string;
  month: string;
  monthNumber: number;
  year: string;
  fullDate: string;
};

function getDMYT(date: string): DMYTRes {
  const day = date.substring(0, 2);
  const month = date.substring(3, 5);
  const year = date.substring(6, 10);

  return { day, month, monthNumber: parseInt(month), year, fullDate: date };
}

function CalendarCustom({ minDate, maxDate, isOpen, value, onChange, classCalendar = "", position = 'bottom', ...props }: Props) {
  const yearNow = new Date().getFullYear();
  const years = Array.from(new Array(200), (_, index) => {
    const year = yearNow - 100 + index;
    return {
      id: year,
      year: (year + 543).toString(),
    };
  });

  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const [activeMonth, setActiveMonth] = useState<any>(new Date().getMonth());
  const [activeYear, setActiveYear] = useState<any>(new Date().getFullYear());
  const [valueMonth, setValueMonth] = useState<any>(new Date().getMonth());
  const [valueYear, setValueYear] = useState<any>(new Date().getFullYear());
  const prevMonth = useRef<any>(null);
  const [firstDayInMonth, setFirstDayInMonth] = useState<any[]>([]);
  // min
  const min: DMYTRes = getDMYT(minDate ?? "");
  const max: DMYTRes = getDMYT(maxDate ?? "");


  useEffect(() => {
    const x = [];
    for (let i = 1; i <= 12; i++) {
      x.push(new Date(`${activeYear}/${i}/1`).getDay());
    }
    setFirstDayInMonth(x);
  }, [activeYear]);

  useEffect(() => {
    prevMonth.current = activeMonth;
  }, [activeMonth]);

  useEffect(() => {
    if (value) {
      const date = value.split("/");
      if (date.length === 3) {
        setValueMonth(date[1] ? parseInt(date[1]) - 1 : new Date().getMonth());
        setValueYear(date[2] ? parseInt(date[2]) - 543 : new Date().getFullYear());
        setActiveDay(date[0] ? parseInt(date[0]) : new Date().getDate());
        setActiveMonth(date[1] ? parseInt(date[1]) - 1 : new Date().getMonth());
        setActiveYear(date[2] ? parseInt(date[2]) - 543 : new Date().getFullYear());
      }
    }
  }, [value, isOpen]);

  useEffect(() => {
    if (minDate) {
      const minMoment = moment(minDate, "DD/MM/YYYY").subtract(543, "years");
      if (minMoment.isAfter(moment(), "month")) {
        setActiveMonth(minMoment.month());
        setActiveYear(minMoment.year());
        setValueMonth(minMoment.month());
        setValueYear(minMoment.year());
      }
    }
  }, [minDate]);

  return (
    <Fragment>
      <div className={`absolute z-40 flex flex-col h-auto w-fit max-w-[275px] break-words text-base ${classCalendar} ${isOpen ? "" : "hidden"} ${position === 'top' ? 'bottom-full' : 'top'}`} {...props}>
        <div className="flex-auto p-2 border bg-white rounded shadow-lg">
          <div className="w-full rounded">
            <div className="flex items-center justify-between space-x-5">
              <div className="font-medium text-left text-black">
                <div className="flex justify-start space-x-2">
                  <div>
                    <select
                      value={activeMonth + 1}
                      className="w-auto outline-none bg-white font-normal text-sm"
                      onChange={(e) => {
                        const setMonth = e.target.value ? parseInt(e.target.value) - 1 : new Date().getMonth();
                        const setYear = activeYear ? parseInt(activeYear + 543) - 543 : new Date().getFullYear();
                        setValueMonth(setMonth);
                        setValueYear(setYear);
                        setActiveDay(1);
                        setActiveMonth(setMonth);
                        setActiveYear(setYear);
                      }}
                    >
                      {month
                        .map((c, i) => ({
                          key: i + 1,
                          name: c,
                          disabledMin: minDate ? (parseInt(min.year) === valueYear + 543 ? min.monthNumber > i + 1 : false) : false,
                          disabledMax: maxDate ? (parseInt(max.year) === valueYear + 543 ? max.monthNumber < i + 1 : false) : false,
                        }))
                        .map((item, index: number) => (
                          <option disabled={item.disabledMin ? item.disabledMin : item.disabledMax} className="font-normal" key={index} value={item.key}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={activeYear + 543}
                      className="w-auto outline-none bg-white font-normal text-sm"
                      onChange={(e) => {
                        const setMonth = activeMonth ? parseInt(activeMonth + 1) - 1 : new Date().getMonth();
                        setValueYear(e.target.value ? parseInt(e.target.value) - 543 : new Date().getFullYear());
                        setActiveDay(1);
                        setActiveYear(e.target.value ? parseInt(e.target.value) - 543 : new Date().getFullYear());
                        if (parseInt(max.month) < setMonth) {
                          setValueMonth(parseInt(max.month) - 1);
                          setActiveMonth(parseInt(max.month) - 1);
                        } else if (parseInt(min.month) > setMonth) {
                          setValueMonth(parseInt(min.month) - 1);
                          setActiveMonth(parseInt(min.month) - 1);
                        } else {
                          setValueMonth(activeMonth ? parseInt(activeMonth + 1) - 1 : new Date().getMonth());
                          setActiveMonth(activeMonth ? parseInt(activeMonth + 1) - 1 : new Date().getMonth());
                        }
                      }}
                    >
                      {years
                        .map((c) => ({
                          yearTh: c.year,
                          yearEN: c.id,
                          disabledMin: minDate ? parseInt(min.year) > parseInt(c.year) : false,
                          disabledMax: maxDate ? parseInt(max.year) < parseInt(c.year) : false,
                        }))
                        .filter((item) => !(item.disabledMin || item.disabledMax))
                        .map((item) => (
                          <option className="font-normal" key={item.yearEN} value={item.yearTh}>
                            {item.yearTh}
                          </option>
                        ))}
                    </select>
                  </div>

                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  disabled={activeMonth + 1 === parseInt(min.month) && activeYear === parseInt(min.year) - 543}
                  type="button"
                  className="p-2 text-black rounded bg-pastel-blue-500 disabled:text-gray-400"
                  onClick={() => {
                    if (prevMonth.current === 0) {
                      setActiveYear(activeYear - 1);
                      setActiveMonth(11);
                    } else {
                      setActiveMonth(activeMonth - 1);
                    }
                  }}
                >
                  <svg width={15} height={15} fill="currentColor" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"></path>
                  </svg>
                </button>
                <button
                  disabled={activeMonth + 1 === parseInt(max.month) && activeYear === parseInt(max.year) - 543}
                  type="button"
                  className="p-2 text-black rounded bg-pastel-blue-500  disabled:text-gray-400"
                  onClick={() => {
                    if (prevMonth.current === 11) {
                      setActiveYear(activeYear + 1);
                      setActiveMonth(0);
                    } else {
                      setActiveMonth(activeMonth + 1);
                    }
                  }}
                >
                  <svg width={15} height={15} fill="currentColor" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="mx-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="px-2 py-3 md:px-3">อา</th>
                    <th className="px-2 py-3 md:px-3">จ</th>
                    <th className="px-2 py-3 md:px-3">อ</th>
                    <th className="px-2 py-3 md:px-3">พ</th>
                    <th className="px-2 py-3 md:px-3">พฤ</th>
                    <th className="px-2 py-3 md:px-3">ศ</th>
                    <th className="px-2 py-3 md:px-3">ส</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3, 4, 5].map((row) => (
                    <tr key={row} className="border-none font-normal text-sm">
                      <CalendarRow
                        min={min}
                        max={max}
                        firstDay={firstDayInMonth[activeMonth]}
                        lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                        row={row}
                        valueMonth={valueMonth}
                        valueYear={valueYear}
                        currentDay={activeDay}
                        currentMonth={activeMonth}
                        currentYear={activeYear}
                        onClick={(e: any) => {
                          const day = (parseInt(e, 10) < 10 ? `0${parseInt(e, 10)}` : parseInt(e, 10)).toString();
                          const month = (parseInt(activeMonth + 1, 10) < 10 ? `0${parseInt(activeMonth + 1, 10)}` : parseInt(activeMonth + 1, 10)).toString();
                          const year = (parseInt(activeYear, 10) + 543).toString();
                          const newSelectedDate = moment(`${day}/${month}/${year}`, "DD/MM/YYYY");
                          if (minDate && newSelectedDate.isBefore(moment(minDate, "DD/MM/YYYY"))) return;
                          if (maxDate && newSelectedDate.isAfter(moment(maxDate, "DD/MM/YYYY"))) return;

                          setActiveDay(e);
                          onChange(`${day}/${month}/${year}`);
                        }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CalendarCustom;