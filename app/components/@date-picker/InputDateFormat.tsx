/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, type ReactNode } from "react";
import moment from "moment";
import CalendarCustom from "./CalendarCustom";

type Props = {
  placeholder?: string;
  disabled?: boolean;
  stroke?: string;
  value: string;
  id?: string;
  name?: string;
  className?: string;
  classCalendar?: string;
  onChange: (e: string) => void;
  title?: string;
  minDate?: string;
  maxDate?: string;
  titleElement?: ReactNode;
  error?: any;
  touched?: any;
};

function InputDateFormat({ minDate, maxDate, title = "", placeholder = "วว/ดด/ปปปป", disabled = false, name = "", id = "", className = "input_default", onChange, value = "", stroke = "", classCalendar = "", titleElement, error, touched, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenCalendar, setOpenCalendar] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<string>("");
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const [calendarClassName, setCalendarClassName] = useState<string>(classCalendar);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (isOpenCalendar && ref.current && !ref.current.contains(e.target) && !disabled) {
        setOpenCalendar(!isOpenCalendar);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [disabled, isOpenCalendar]);

  useEffect(() => {
    setDefaultValue(value ?? "");
  }, [value]);

  useEffect(() => {
    if (isOpenCalendar && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;
      const calendarHeight = 300;

      if (spaceBelow < calendarHeight && spaceAbove > calendarHeight) {
        setPosition('top');
        setCalendarClassName(`${classCalendar} absolute bottom-full`);
      } else {
        setPosition('bottom');
        setCalendarClassName(`${classCalendar} absolute top-full`);
      }
    }
  }, [isOpenCalendar, classCalendar]);

  function isValidDateFormat(dateString: string) {
    if (dateString) {
      const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
      if (pattern.test(dateString)) {
        const parts = dateString.split("/");
        const day = (parseInt(parts[0], 10) < 10 ? `0${parseInt(parts[0], 10)}` : parseInt(parts[0], 10)).toString();
        const month = (parseInt(parts[1], 10) < 10 ? `0${parseInt(parts[1], 10)}` : parseInt(parts[1], 10)).toString();
        const year = (parseInt(parts[2], 10) - 543).toString();
        return moment(`${day}/${month}/${year}`, "DD/MM/YYYY", true).isValid();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <div ref={ref} className="w-full relative">
      <div className="flex justify-between">
        <label htmlFor={name} className="font-light">{title}</label>
        {titleElement && titleElement}
      </div>
      <div className="relative z-0">
        <input
          {...props}
          ref={inputRef}
          disabled={disabled}
          id={id}
          name={name}
          // readOnly={true}
          autoComplete="off"
          value={defaultValue}
          className={`placeholder-black pl-8 w-full ${disabled && "input-disabled"} ${className} ${touched ? error ? "input-error" : "input-success" : "input-default"} min-w-[140px] !pl-8`}
          type="text"
          placeholder={placeholder}
          onClick={() => setOpenCalendar(!isOpenCalendar)}
          onChange={(e) => {
            const data = e.target.value;
            setDefaultValue(data);
            const res = isValidDateFormat(data);
            if (res) {
              onChange(data);
            } else {
              onChange("");
            }
          }}
        />
        <button
          type="button"
          disabled={disabled}
          className={`flex absolute inset-y-0 left-2 -top-[2px] z-30 items-center cursor-pointer mt-1`}
          onClick={() => {
            setOpenCalendar(!isOpenCalendar);
          }}
        >
          <SVGPDatePicker stroke={stroke} />
        </button>
      </div>
      <CalendarCustom
        minDate={minDate}
        maxDate={maxDate}
        classCalendar={calendarClassName}
        isOpen={isOpenCalendar}
        value={value}
        onChange={(e) => {
          onChange(e);
          setOpenCalendar(!isOpenCalendar);
        }}
        position={position}
        {...props}
      />
    </div>
  );
}

export default InputDateFormat;

function SVGPDatePicker({ stroke = "" }) {
  return (
    <svg className={`icon icon-tabler icon-tabler-calendar-event ${stroke}`} width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.13314 13.6667C1.76647 13.6667 1.45258 13.5361 1.19147 13.275C0.93036 13.0139 0.799805 12.7 0.799805 12.3333V2.99999C0.799805 2.63333 0.93036 2.31944 1.19147 2.05833C1.45258 1.79722 1.76647 1.66666 2.13314 1.66666H2.7998V0.333328H4.13314V1.66666H9.46647V0.333328H10.7998V1.66666H11.4665C11.8331 1.66666 12.147 1.79722 12.4081 2.05833C12.6692 2.31944 12.7998 2.63333 12.7998 2.99999V12.3333C12.7998 12.7 12.6692 13.0139 12.4081 13.275C12.147 13.5361 11.8331 13.6667 11.4665 13.6667H2.13314ZM2.13314 12.3333H11.4665V5.66666H2.13314V12.3333ZM2.13314 4.33333H11.4665V2.99999H2.13314V4.33333Z"
        fill="#212121"
      />
    </svg>
  );
}