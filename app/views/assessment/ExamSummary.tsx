import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface IResult {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string;
}

export default function ExamSummary() {
  const navigate = useNavigate();
  const [results, setResults] = useState<IResult[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedResults = JSON.parse(
      localStorage.getItem("examResults") || "[]"
    );
    setResults(storedResults);

    const correct = storedResults.filter(
      (r: IResult) => r.selectedAnswer === r.correctAnswer
    ).length;
    setScore(correct);
  }, []);

  const total = results.length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sky-700 mb-2">สรุปผลการสอบ</h1>
          <p className="text-gray-600">
            คุณได้คะแนน {score} / {total} ข้อ
          </p>
          <div className="mt-4">
            <span
              className={`text-2xl font-semibold ${
                score / total >= 0.6 ? "text-green-600" : "text-red-500"
              }`}
            >
              {score / total >= 0.6 ? "ผ่าน 🎉" : "ไม่ผ่าน ❌"}
            </span>
          </div>
        </div>

        <hr />

        <div className="space-y-6">
          {results.map((q, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded border border-gray-200 shadow-sm"
            >
              <h2 className="font-semibold text-lg mb-2">
                ข้อ {idx + 1}: {q.question}
              </h2>
              <ul className="space-y-2">
                {q.options.map((opt, i) => {
                  const isCorrect = opt === q.correctAnswer;
                  const isSelected = opt === q.selectedAnswer;
                  const correctStyle = isCorrect
                    ? "border-green-500 bg-green-50"
                    : "";
                  const wrongStyle =
                    isSelected && !isCorrect ? "border-red-500 bg-red-50" : "";
                  return (
                    <li
                      key={i}
                      className={`p-3 border rounded ${
                        isSelected ? "font-bold" : ""
                      } ${correctStyle} ${wrongStyle}`}
                    >
                      {String.fromCharCode(0x0e01 + i)}. {opt}
                      {isCorrect && (
                        <span className="ml-2 text-green-600 font-medium">
                          ✔ ถูกต้อง
                        </span>
                      )}
                      {isSelected && !isCorrect && (
                        <span className="ml-2 text-red-500 font-medium">
                          ✘ คำตอบของคุณ
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/assessment-history")}
            className="px-6 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700"
          >
            กลับหน้าประวัติการสอบ
          </button>
        </div>
      </div>
    </div>
  );
}
