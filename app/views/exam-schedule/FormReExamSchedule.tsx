import { useState } from "react";
import dayjs from "dayjs";
import { UpdateExamSchedule } from "~/services/ExamSchedule.Service";
import InputDateFormat from "~/components/@date-picker/InputDateFormat";

interface FormReExamScheduleProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData: {
    scheduleId: number;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    totalQuestions: number;
    reason: string;
  };
}

export default function FormReExamSchedule({
  onClose,
  onSuccess,
  initialData,
}: FormReExamScheduleProps) {
  const [date, setDate] = useState(initialData.scheduleDate);
  const [reason, setReason] = useState(initialData.reason || "");
  const [startTime, setStartTime] = useState(initialData.startTime.slice(0, 5));
  const [endTime, setEndTime] = useState(initialData.endTime.slice(0, 5));

  const [touchedReason, setTouchedReason] = useState(false);

  function convertBuddhistToGregorian(dateStr: string): string {
    const [d, m, by] = dateStr.split("/").map((n) => parseInt(n, 10));
    const gy = by - 543;
    return dayjs()
      .set("year", gy)
      .set("month", m - 1)
      .set("date", d)
      .format("YYYY-MM-DD");
  }

  const handleSubmit = async () => {
    setTouchedReason(true);
    if (!reason || !date || !startTime) {
      return;
    }

    const scheduleId = 1;

    const [hour, minute] = startTime.split(":");
    const timeString = (h: string, m: string) =>
      `${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`;

    const payload = {
      scheduleId,
      scheduleDate: convertBuddhistToGregorian(date),
      startTime: timeString(hour, minute),
      endTime: timeString(hour, String(Number(minute) + 30)),
      reason,
    };

    console.log("จะส่ง payload →", payload);

    try {
      await UpdateExamSchedule(payload);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("ไม่สามารถส่งข้อมูลได้", error);
      // คุณอาจแสดง error ด้วย toast หรือ dialog
    }
  };

  const handleClear = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setReason("");
    setTouchedReason(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">ขอเลื่อนการสอบ</h2>

        <div className="grid grid-cols-6 gap-4 items-center mb-4">
          <label className="col-span-1 font-semibold text-gray-700">
            วันที่
          </label>
          <div className="col-span-5">
            <InputDateFormat value={date} onChange={(d) => setDate(d)} />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="font-semibold text-gray-700 mr-5">เวลา</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ml-5"
            required
          />
          :
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-semibold text-gray-700">เหตุผล</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onBlur={() => setTouchedReason(true)}
            rows={4}
            className={`mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              touchedReason && !reason
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="กรุณาระบุเหตุผล"
          />
          {touchedReason && !reason && (
            <span className="text-red-600 text-sm mt-1">กรุณาระบุเหตุผล</span>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!date || !startTime || !reason}
            className="bg-sky-600 text-white px-6 py-2 rounded shadow hover:bg-sky-700 disabled:opacity-50"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-100 text-gray-800 px-6 py-2 rounded shadow hover:bg-gray-200"
          >
            ล้างค่า
          </button>
        </div>
      </div>
    </div>
  );
}
