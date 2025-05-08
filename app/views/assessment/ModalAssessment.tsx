import { useNavigate } from "react-router";

export default function ModalAssessment() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/exam-taken");
  };

  return (
    <div>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-8 text-center">
        <div className="flex justify-between gap-4">
          <div className="flex-1 border rounded-lg p-4">
            <div className="text-sky-600 text-3xl mb-2">
              <i className="fa-solid fa-file-lines"></i>
            </div>
            <p className="text-xl font-semibold">10 ข้อ</p>
            <p className="text-sm text-gray-500">จำนวน</p>
          </div>
          <div className="flex-1 border rounded-lg p-4">
            <div className="text-sky-600 text-3xl mb-2">
              <i className="fa-solid fa-clock"></i>
            </div>
            <p className="text-xl font-semibold">15 นาที</p>
            <p className="text-sm text-gray-500">เวลาทำ</p>
          </div>
          <div className="flex-1 border rounded-lg p-4">
            <div className="text-sky-600 text-3xl mb-2">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <p className="text-xl font-semibold">-</p>
            <p className="text-sm text-gray-500">ดูผลลัพธ์</p>
          </div>
        </div>

        <div className="flex justify-between items-center relative mt-6 gap-4 px-4">
          {[
            { icon: "fa-play", label: "เริ่ม" },
            { icon: "fa-pen", label: "ทำแบบทดสอบ" },
            { icon: "fa-paper-plane", label: "ส่งคำตอบ" },
            { icon: "fa-check", label: "ดูผลลัพธ์" },
          ].map((step, index, array) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center w-full"
            >
              <div className="w-12 h-12 rounded-full border-2 border-sky-500 text-sky-500 flex items-center justify-center text-xl bg-white z-10">
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <p className="text-sm mt-1">{step.label}</p>

              {index < array.length - 1 && (
                <div className="absolute top-6 right-0 w-full h-px bg-sky-300 z-0 translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={handleStart}
            className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-medium px-8 py-2 rounded-full shadow"
          >
            เริ่มทำแบบทดสอบ
          </button>
        </div>
      </div>
    </div>
  );
}
