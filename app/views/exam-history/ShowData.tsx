import { Fragment } from "react/jsx-runtime";
import type { IPagin } from "~/@types/@global";
import { FormatTime } from "~/helpers/Convert";
import AnimateEmptyData from "~/components/@animate-emptydata/AnimateEmptyData";
import type { IExamHistoryData } from "~/@types/assessment/AssessmentMultipleChoice";

type Props = {
  loading: boolean;
  pagin: IPagin;
  data: IExamHistoryData[];
  onHandleExamHistory: () => void;
};

export default function ShowHistoryData({
  loading,
  pagin,
  data,
  onHandleExamHistory,
}: Props) {
  let rowIndex = 0;

  return (
    <div className="table-main-center">
      <table>
        <thead>
          <tr>
            <th className="w-[5%]">ลำดับ</th>
            <th className="w-[10%]">ครั้งที่</th>
            <th className="w-[20%]">วันที่สอบ</th>
            <th className="w-[20%]">เวลาสอบ</th>
            <th className="w-[10%]">จำนวนข้อ</th>
            <th className="w-[15%]">ผลการสอบ</th>
            <th className="w-[20%]">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                กำลังโหลดข้อมูล...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <AnimateEmptyData />
              </td>
            </tr>
          ) : (
            data.map((history, index) => {
              rowIndex += 1;
              return (
                <tr key={index}>
                  <td className="text-center">{rowIndex}</td>
                  <td className="text-center">{history.examAttempt}</td>
                  <td className="text-center">{history.examDate}</td>
                  <td className="text-center">
                    {FormatTime(history.startTime)} - {FormatTime(history.endTime)}
                  </td>
                  <td className="text-center">{history.totalQuestions}</td>
                  <td className="text-center">{history.examResult}</td>
                  <td className="text-center">
                    <button
                      className="btn-sky"
                      onClick={() => onHandleExamHistory()}
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
