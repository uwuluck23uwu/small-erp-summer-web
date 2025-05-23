import { useState } from "react";

const mockQuestions = [
  {
    id: 1,
    question: "HTML ย่อมาจากอะไร?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Leveler",
    ],
  },
  {
    id: 2,
    question: "CSS ใช้ทำอะไรในเว็บ?",
    options: [
      "ควบคุมโครงสร้างของเว็บ",
      "จัดรูปแบบการแสดงผล",
      "เก็บข้อมูลในเว็บ",
      "เขียนคำสั่งเงื่อนไข",
    ],
  },
  {
    id: 3,
    question: "JavaScript ทำงานฝั่งใด?",
    options: [
      "Server-side เท่านั้น",
      "Client-side เท่านั้น",
      "ทั้ง Client-side และ Server-side",
      "ไม่สามารถทำงานได้บนเว็บ",
    ],
  },
  {
    id: 4,
    question: "React เป็นอะไร?",
    options: [
      "Framework สำหรับ Backend",
      "Library สำหรับจัดการ UI",
      "ฐานข้อมูล",
      "เครื่องมือเขียนเกม",
    ],
  },
  {
    id: 5,
    question: "ข้อใดคือชนิดข้อมูลใน JavaScript?",
    options: ["float", "boolean", "double", "char"],
  },
  {
    id: 6,
    question: "ข้อใดคือการประกาศตัวแปรแบบ ES6?",
    options: ["var", "define", "let", "const let"],
  },
  {
    id: 7,
    question: "DOM ย่อมาจากอะไร?",
    options: [
      "Document Object Model",
      "Display Output Module",
      "Data Object Manager",
      "Document Order Method",
    ],
  },
  {
    id: 8,
    question: "คำสั่ง `console.log()` ใช้ทำอะไร?",
    options: [
      "รับค่าจากผู้ใช้",
      "แสดงผลในหน้าเว็บ",
      "แสดงผลใน console",
      "เก็บค่าตัวแปร",
    ],
  },
  {
    id: 9,
    question: "อะไรคือ JSX?",
    options: [
      "ภาษาโปรแกรมใหม่",
      "ภาษาสำหรับจัดการฐานข้อมูล",
      "JavaScript ที่มี XML/HTML ผสม",
      "รูปแบบของ CSS",
    ],
  },
  {
    id: 10,
    question: "Blazor ใช้ภาษาอะไรเขียน?",
    options: ["C#", "Python", "Java", "JavaScript"],
  },
  {
    id: 11,
    question: "React ใช้หลักการอะไร?",
    options: ["MVC", "Virtual DOM", "Routing Engine", "OOP Interface"],
  },
  {
    id: 12,
    question: "ข้อใดไม่ใช่ภาษาในเว็บมาตรฐาน?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
  },
  {
    id: 13,
    question: "อะไรคือ component ใน React?",
    options: [
      "คลาสสำหรับจัดการ Routing",
      "ฟังก์ชัน/คลาสที่ใช้สร้าง UI แบบแยกส่วน",
      "ฐานข้อมูลเฉพาะของ React",
      "ไฟล์ HTML",
    ],
  },
  {
    id: 14,
    question: "State ใน React คืออะไร?",
    options: [
      "ค่าคงที่",
      "ตัวแปรที่เปลี่ยนค่าไม่ได้",
      "ข้อมูลภายใน component ที่สามารถเปลี่ยนแปลงได้",
      "ค่าจาก API",
    ],
  },
  {
    id: 15,
    question: "Tailwind CSS คืออะไร?",
    options: [
      "Framework เขียน backend",
      "UI library ของ React",
      "CSS Utility-first Framework",
      "Theme สำเร็จรูป",
    ],
  },
  {
    id: 16,
    question: "คำสั่ง fetch() ใช้เพื่ออะไร?",
    options: [
      "ดึงข้อมูลจาก API",
      "ประกาศตัวแปร",
      "แสดงข้อมูลบนหน้าเว็บ",
      "สร้าง Element ใหม่",
    ],
  },
  {
    id: 17,
    question: "ข้อใดคือ HTTP Method?",
    options: ["POST", "FETCH", "REACT", "CLICK"],
  },
  {
    id: 18,
    question: "React Native ใช้สร้างแอปอะไร?",
    options: [
      "แอปเฉพาะ Android",
      "แอปบนเว็บ",
      "แอปมือถือทั้ง iOS และ Android",
      "Desktop app",
    ],
  },
  {
    id: 19,
    question: "คำว่า MVC ย่อมาจากอะไร?",
    options: [
      "Model View Controller",
      "Module Visual Center",
      "Manage View Code",
      "Main Virtual Core",
    ],
  },
  {
    id: 20,
    question: "Git ใช้ทำอะไร?",
    options: [
      "จัดการเวอร์ชันของโค้ด",
      "จัดการฐานข้อมูล",
      "ออกแบบ UI",
      "รันเว็บเซิร์ฟเวอร์",
    ],
  },
];

export default function ExamTaken() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(mockQuestions.length).fill(null)
  );

  const currentQuestion = mockQuestions[currentIndex];

  const handleSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    alert("ส่งคำตอบเรียบร้อย!");
  };

  return (
    <div className="flex h-screen bg-gray-100 p-6 gap-6">
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <div className="text-lg font-semibold mb-2">
          ข้อที่ {currentIndex + 1} จาก {mockQuestions.length}
        </div>

        <div className="text-xl font-bold mb-4">{currentQuestion.question}</div>

        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => (
            <label
              key={option}
              className="block p-3 border rounded cursor-pointer hover:bg-sky-50"
            >
              <input
                type="radio"
                name={`question-${currentIndex}`}
                value={option}
                checked={answers[currentIndex] === option}
                onChange={() => handleSelect(option)}
                className="mr-2"
              />
              {String.fromCharCode(0x0e01 + idx)}. {option}
            </label>
          ))}
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 border rounded text-gray-600 disabled:opacity-50"
          >
            ย้อนกลับ
          </button>
          {currentIndex === mockQuestions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700"
            >
              ส่งคำตอบ
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700"
            >
              ถัดไป
            </button>
          )}
        </div>
      </div>

      <div className="w-64 flex flex-col gap-4">
        <div className="bg-blue-700 text-white text-center py-2 rounded-lg shadow">
          เหลือเวลา 59:45 นาที
        </div>

        <div className="bg-white p-4 rounded-lg shadow grid grid-cols-5 gap-2">
          {Array.from({ length: mockQuestions.length }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-10 h-10 flex items-center justify-center rounded font-medium transition-colors duration-200 ${
                currentIndex === i
                  ? "bg-sky-500 text-white"
                  : answers[i]
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
