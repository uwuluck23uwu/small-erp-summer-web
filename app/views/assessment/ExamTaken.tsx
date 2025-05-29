import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  GetMultipleChoiceQuestion,
  SaveExamQuiz,
} from "~/services/MultipleChoiceQuestion.Service";
import type { EsMultipleChoiceQuestion } from "~/@types/assessment/AssessmentMultipleChoice";

const MySwal = withReactContent(Swal);

interface IQuestion {
  id: number;
  question: string;
  options: string[];
}

export default function ExamTaken() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    if (loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          MySwal.fire({
            title: "⏰ หมดเวลา!",
            text: "ระบบจะส่งคุณไปยังหน้าผลสอบ",
            icon: "warning",
            confirmButtonText: "ไปต่อ",
            allowOutsideClick: false,
          }).then(() => {
            navigate("/exam-summary");
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, navigate]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await GetMultipleChoiceQuestion(1, 1);
        const rawQuestions: EsMultipleChoiceQuestion[] = response.data;

        const formatted = rawQuestions.map((q) => ({
          id: q.questionId,
          question: q.questionText,
          options: [q.choiceA, q.choiceB, q.choiceC, q.choiceD],
        }));

        setQuestions(formatted);
        setAnswers(Array(formatted.length).fill(null));
        setLoading(false);
      } catch (error) {
        console.error("โหลดคำถามล้มเหลว:", error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const handleSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const unanswered = answers.some((a) => a === null);
    if (unanswered) {
      MySwal.fire({
        title: "ยังตอบไม่ครบทุกข้อ",
        text: "กรุณาตอบทุกข้อก่อนส่งคำตอบ",
        icon: "warning",
      });
      return;
    }

    const now = new Date();

    const payload = {
      enrollmentId: 1,
      scheduleId: 1,
      createdBy: "student@example.com",
      startedTime: now,
      submittedTime: now,
      listQuiz: questions.map((q, i) => ({
        id: q.id,
        answer: answers[i] || "",
      })),
    };

    try {
      await SaveExamQuiz(payload);
      MySwal.fire({
        title: "ส่งคำตอบแล้ว!",
        icon: "success",
        confirmButtonText: "ไปหน้าผลสอบ",
      }).then(() => {
        navigate("/exam-summary");
      });
    } catch (error) {
      console.error("ส่งคำตอบล้มเหลว:", error);
      MySwal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถส่งคำตอบได้ กรุณาลองใหม่",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        กำลังโหลดคำถาม...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        ไม่พบคำถาม
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s} นาที`;
  };

  return (
    <div className="flex h-screen bg-gray-100 p-6 gap-6">
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <div className="text-lg font-semibold mb-2">
          ข้อที่ {currentIndex + 1} จาก {questions.length}
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
          {currentIndex === questions.length - 1 ? (
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
          เหลือเวลา {formatTime(timeLeft)}
        </div>

        <div className="bg-white p-4 rounded-lg shadow grid grid-cols-5 gap-2">
          {questions.map((_, i) => (
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
