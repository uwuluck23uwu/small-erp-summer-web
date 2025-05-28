import { useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import type { IPagin } from "~/@types/@global";
import type { IExamData } from "~/@types/assessment/AssessmentMultipleChoice";
import { CommaNumber, FormatTime } from "~/helpers/Convert";
import Button from "~/components/@button/Button";
import AnimateNodata from "../../components/@animate-emptydata/AnimateEmptyData";

type Props = {
  loading: boolean;
  pagin: IPagin;
  data: IExamData[];
  onhandleExam?: () => void;
  onhandleExamScheduling: any;
};

export default function ShowData({
  onhandleExamScheduling,
  onhandleExam,
  data,
  pagin,
  loading,
}: Props) {
  const navigate = useNavigate();

  let rowIndex = 0;
  function convertThaiDateToISO(thaiDate: string): string {
    const thaiMonths: { [key: string]: string } = {
      "ม.ค": "01",
      "ก.พ": "02",
      "มี.ค": "03",
      "เม.ย": "04",
      "พ.ค": "05",
      "มิ.ย": "06",
      "ก.ค": "07",
      "ส.ค": "08",
      "ก.ย": "09",
      "ต.ค": "10",
      "พ.ย": "11",
      "ธ.ค": "12",
    };

    const parts = thaiDate.trim().split(" ");
    if (parts.length !== 3) throw new Error("Invalid Thai date format");

    const day = parts[0].padStart(2, "0");
    const month = thaiMonths[parts[1]];
    const year = (parseInt(parts[2], 10) - 543).toString();

    if (!month) throw new Error(`Invalid Thai month: ${parts[1]}`);

    return `${year}-${month}-${day}`;
  }

  function isWithinSchedule(
    _Date: string | Date,
    startTime: string,
    endTime: string
  ): boolean {
    const date = typeof _Date === "string" ? new Date(_Date) : new Date(_Date);

    const [startHourStr, startMinuteStr, startSecondStr] = startTime.split(":");
    const [endHourStr, endMinuteStr, endSecondStr] = endTime.split(":");

    const startHour = Number(startHourStr);
    const startMinute = Number(startMinuteStr);
    const startSecond = Number(startSecondStr ?? "0");

    const endHour = Number(endHourStr);
    const endMinute = Number(endMinuteStr);
    const endSecond = Number(endSecondStr ?? "0");

    const start = new Date(date);
    start.setHours(startHour, startMinute, startSecond, 0);

    const end = new Date(date);
    end.setHours(endHour, endMinute, endSecond, 0);

    if (end <= start) {
      end.setDate(end.getDate() + 1);
    }

    const now = new Date();

    return now >= start && now <= end;
  }

  return (
    <div className="table-main-center">
      <table>
        <thead>
          <tr>
            <th className="w-[11%]">ครั้งที่</th>
            <th className="w-[21%]">วันที่สอบ</th>
            <th className="w-[23%]">เวลาสอบ</th>
            <th className="w-[5%]">จำนวนข้อสอบ</th>
            <th className="w-[20%]">สถานะ</th>
            <th className="w-[20%]">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <AnimateNodata colSpan={11} type="table" />
          ) : data?.length === 0 ? (
            <tr>
              <td colSpan={6} className="w-full">
                <div className="flex justify-center">
                  <button
                    onClick={onhandleExam}
                    type="button"
                    className="btn-sky-primary"
                  >
                    <i className="fa-solid fa-circle-plus pr-2"></i>
                    จัดตารางสอบ
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <Fragment key={index}>
                {item.examEnrollments?.map((items, subIndex) => (
                  <Fragment key={subIndex}>
                    <tr>
                      <td colSpan={11} className="!py-0">
                        <p className="bg-dark-navy-primary/70 text-white font-medium px-4 py-2 -mx-3 !text-start">
                          วันที่ลงทะเบียน : {item.createdDate ?? ""} ::{" "}
                          {items.examSet.examsetName} :: {items.examSet.stdName}
                        </p>
                      </td>
                    </tr>

                    {items.examSchedules?.map(
                      (itemsSchedule, IndexSchedule) => {
                        rowIndex++;
                        const reschedules = itemsSchedule.reschedules ?? [];

                        return (
                          <Fragment key={IndexSchedule}>
                            <tr>
                              <td>
                                {CommaNumber(
                                  (pagin.currentPage - 1) * pagin.pageSize +
                                    rowIndex
                                )}
                              </td>
                              <td>
                                <p className="whitespace-nowrap">
                                  {itemsSchedule.scheduleDate ?? ""}
                                </p>
                              </td>
                              <td>
                                <div className="flex-col items-start whitespace-nowrap">
                                  {reschedules.length > 0 && (
                                    <p className="text-xs text-red-500 line-through">
                                      เวลาเก่า:{" "}
                                      {FormatTime(reschedules[0].startTime)} -{" "}
                                      {FormatTime(reschedules[0].endTime)} น.
                                    </p>
                                  )}
                                  <p className="font-medium text-gray-800">
                                    {FormatTime(itemsSchedule.startTime)} -{" "}
                                    {FormatTime(itemsSchedule.endTime)} น.
                                  </p>
                                </div>
                              </td>
                              <td>{itemsSchedule.totalQuestions}</td>
                              <td>
                                <div className="whitespace-nowrap">
                                  {(() => {
                                    switch (itemsSchedule.status.toString()) {
                                      case "0":
                                        return "ยังไม่ได้สอบ";
                                      case "1":
                                        return "สอบแล้ว";
                                      case "2":
                                        return "เลื่อนเวลาสอบ";
                                      default:
                                        return "ไม่ได้สอบ";
                                    }
                                  })()}
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                  <Button
                                    onClick={() =>
                                      onhandleExamScheduling({
                                        scheduleId: itemsSchedule.scheduleId,
                                        scheduleDate:
                                          itemsSchedule.scheduleDate,
                                        startTime: itemsSchedule.startTime,
                                        endTime: itemsSchedule.endTime,
                                        totalQuestions:
                                          itemsSchedule.totalQuestions,
                                        reason: reschedules?.[0]?.reason ?? "",
                                      })
                                    }
                                    type="button"
                                    styleButton="btn-blue"
                                    btntext="ขอเลื่อนสอบ"
                                    iconName="icon-add"
                                  />

                                  <Button
                                    onClick={() => {
                                      navigate(`/assessment-history/`);
                                    }}
                                    type="button"
                                    styleButton="btn-blue"
                                    btntext="ทำแบบทดสอบ"
                                    iconName="icon-add"
                                  />
                                </div>
                              </td>
                            </tr>

                            {reschedules.length > 0 && (
                              <tr className="bg-gray-50 text-sm text-gray-600">
                                <td></td>
                                <td colSpan={5}>
                                  <div className="pl-4">
                                    <p>
                                      <strong>เหตุผลการเลื่อนสอบ:</strong>{" "}
                                      {reschedules[0].reason ?? "-"}
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      }
                    )}
                  </Fragment>
                ))}
              </Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
