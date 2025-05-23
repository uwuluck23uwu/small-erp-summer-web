/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import type { DMYTRes } from "./CalendarCustom";

type Props = {
  firstDay: number;
  lastDayInMonth: number;
  row: number;
  valueMonth: number;
  valueYear: number;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  onClick?: (e: number) => void;
  min?: DMYTRes;
  max?: DMYTRes;
};

function CalendarRow({ firstDay, lastDayInMonth, row, valueMonth, valueYear, currentDay, currentMonth, currentYear, onClick, max, min }: Props) {
  const content = [];
  const today = new Date();

  function isToday(day: number) {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  }

  //first row with empty spaces
  if (!row) {
    for (let i = 0; i < firstDay; i++) {
      content.push(<td className="relative py-2 px-2 hover:text-gray-500 text-center text-gray-300" key={"first-null" + i}></td>);
    }
    const len = 6 - content.length;
    for (let i = 0; i <= len; i++) {
      content.push(
        currentDay === i + 1 && valueMonth === currentMonth && valueYear === currentYear ? (
          <td key={"first" + i}>
            <button
              type="button"
              disabled={
                (min ? (currentMonth + 1 === parseInt(min.month) && currentYear === parseInt(min.year) - 543 ? parseInt(min.day) > i + (7 * row - firstDay) : false) : false)
                  ? min
                    ? currentMonth + 1 === parseInt(min.month) && currentYear === parseInt(min.year) - 543
                      ? parseInt(min?.day) > i + 1
                      : false
                    : false
                  : max
                    ? currentMonth + 1 === parseInt(max.month) && currentYear === parseInt(max.year) - 543
                      ? parseInt(max.day) < i + (7 * row - firstDay)
                      : false
                    : false
              }
              onClick={() => onClick && onClick(i + 1)}
              className="w-7 h-7 bg-blue-s1 text-white rounded-full flex justify-center items-center  disabled:cursor-not-allowed"
            >
              {i + 1}
            </button>
          </td>
        ) : (
          <td key={"first" + i}>
            <button
              type="button"
              disabled={
                (min ? (currentMonth + 1 === parseInt(min.month) && currentYear === parseInt(min.year) - 543 ? parseInt(min.day) > i + (7 * row - firstDay) : false) : false)
                  ? min
                    ? currentMonth + 1 === parseInt(min.month) && currentYear === parseInt(min.year) - 543
                      ? parseInt(min?.day) > i + 1
                      : false
                    : false
                  : max
                    ? currentMonth + 1 === parseInt(max.month) && currentYear === parseInt(max.year) - 543
                      ? parseInt(max?.day) < i + 1
                      : false
                    : false
              }
              className="relative py-2 px-2 hover:text-gray-600 text-center text-gray-800 cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
              onClick={() => onClick && onClick(i + 1)}
            >
              {i + 1}
            </button>
          </td>
        )
      );
    }

    return <Fragment>{content}</Fragment>;
  }

  //other rows
  for (let i = 1; i <= 7; i++) {
    if (i + (7 * row - firstDay) <= lastDayInMonth) {
      content.push(
        isToday(i + (7 * row - firstDay)) ? (
          <td key={"other" + i}>
            <button
              type="button"
              disabled={
                (min ? (currentMonth + 1 === parseInt(min.month) && currentYear === parseInt(min.year) - 543 ? parseInt(min.day) > i + (7 * row - firstDay) : false) : false)
                  ? min
                    ? currentMonth + 1 === parseInt(min.month) && currentYear === parseInt(min.year) - 543
                      ? parseInt(min.day) > i + (7 * row - firstDay)
                      : false
                    : false
                  : max
                    ? currentMonth + 1 === parseInt(max.month) && currentYear === parseInt(max.year) - 543
                      ? parseInt(max.day) < i + (7 * row - firstDay)
                      : false
                    : false
              }
              onClick={() => onClick && onClick(i + (7 * row - firstDay))}
              className="w-7 h-7 bg-blue-500 text-white rounded-full flex justify-center items-center disabled:cursor-not-allowed"
            >
              {i + (7 * row - firstDay)}
            </button>
          </td>
        ) : (
          <td key={"other" + i}>
            <button
              type="button"
              disabled={
                (min ? (currentMonth + 1 === parseInt(min.month) && currentYear === parseInt(min.year) - 543 ? parseInt(min.day) > i + (7 * row - firstDay) : false) : false)
                  ? min
                    ? currentMonth + 1 === parseInt(min.month) && currentYear === parseInt(min.year) - 543
                      ? parseInt(min.day) > i + (7 * row - firstDay)
                      : false
                    : false
                  : max
                    ? currentMonth + 1 === parseInt(max.month) && currentYear === parseInt(max.year) - 543
                      ? parseInt(max.day) < i + (7 * row - firstDay)
                      : false
                    : false
              }
              onClick={() => {
                onClick && onClick(i + (7 * row - firstDay));
              }}
              className="relative py-2 px-2 hover:text-gray-600 text-center text-gray-800 cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              {i + (7 * row - firstDay)}
            </button>
          </td>
        )
      );
    }
  }

  return <Fragment>{content}</Fragment>;
}

export default CalendarRow;