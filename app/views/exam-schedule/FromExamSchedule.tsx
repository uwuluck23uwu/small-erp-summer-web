import { useState } from "react";
import dayjs from "dayjs";
import { CreateMyExamEnrollment } from "~/services/ExamSchedule.Service";
import InputDateFormat from "~/components/@date-picker/InputDateFormat";
import InputTimeFormat from "~/components/@date-picker/InputTimeFormat";
import type { ISaveExamData } from "~/@types/assessment/AssessmentMultipleChoice";

export default function FromExamSchedule({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [numDays, setNumDays] = useState(1);
  const [examSchedules, setExamSchedules] = useState([
    { date: "", startTime: "", endTime: "" },
  ]);

  function handleScheduleChange(
    index: number,
    field: "date" | "startTime" | "endTime",
    value: string
  ) {
    const newSchedules = [...examSchedules];
    newSchedules[index][field] = value;
    setExamSchedules(newSchedules);
  }

  function handleNumDaysChange(value: number) {
    setNumDays(value);
    const newSchedules = [...examSchedules];
    if (value > newSchedules.length) {
      for (let i = newSchedules.length; i < value; i++) {
        newSchedules.push({ date: "", startTime: "", endTime: "" });
      }
    } else {
      newSchedules.length = value;
    }
    setExamSchedules(newSchedules);
  }

  function convertBuddhistToGregorian(dateStr: string): string {
    const [day, month, buddhistYear] = dateStr
      .split("/")
      .map((v) => parseInt(v));
    const gregorianYear = buddhistYear - 543;
    return `${gregorianYear}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">จัดตารางสอบ</h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          การสอบนี้จัดขึ้นเพื่อประเมินสมรรถนะของผู้เข้าสอบในด้านการบริหารจัดการเทคโนโลยีสารสนเทศภาครัฐ
          (GCIO) โดยเน้นความสามารถในการวางแผน วิเคราะห์
          และตัดสินใจเกี่ยวกับนโยบายและโครงการดิจิทัล
        </p>

        <div className="flex items-center gap-4 mb-6">
          <label className="w-[200px] font-semibold text-gray-700">
            จำนวนวันในการสอบ
          </label>
          <input
            type="number"
            min={1}
            value={numDays}
            onChange={(e) => handleNumDaysChange(Number(e.target.value))}
            className="border rounded px-3 py-2 w-24"
          />
        </div>

        <div className="border-t pt-4">
          {examSchedules.map((schedule, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center mb-4"
            >
              <div>ครั้งที่ {index + 1}</div>

              <InputDateFormat
                value={schedule.date}
                onChange={(date) => handleScheduleChange(index, "date", date)}
              />

              <InputTimeFormat
                value={schedule.startTime}
                onChange={(time) =>
                  handleScheduleChange(index, "startTime", time)
                }
              />

              <InputTimeFormat
                value={schedule.endTime}
                onChange={(time) =>
                  handleScheduleChange(index, "endTime", time)
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-sky-600 text-white px-6 py-2 rounded shadow hover:bg-sky-700"
            onClick={async () => {
              const saveData: ISaveExamData = {
                examEnrollment: {
                  enrollmentId: 0,
                  numDays: numDays,
                  personId: 1,
                  examsetId: 1,
                  createdDate: new Date(),
                },
                examSchedule: examSchedules.map((s) => ({
                  scheduleDate: convertBuddhistToGregorian(s.date),
                  scheduleStartTime: s.startTime,
                  scheduleEndTime: s.endTime,
                })),
              };

              try {
                const result = await CreateMyExamEnrollment(saveData);
                onClose();
                onSuccess();
              } catch (error) {
                console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
              }
            }}
          >
            บันทึก
          </button>

          <button
            className="bg-gray-100 text-gray-800 px-6 py-2 rounded shadow"
            onClick={() => {
              setNumDays(1);
              setExamSchedules([{ date: "", startTime: "", endTime: "" }]);
            }}
          >
            ล้างค่า
          </button>
        </div>
      </div>
    </div>
  );
}
