import { useEffect, useState } from "react";
import TableTop from "~/components/@table-top/TableTop";
import type { IPagin } from "~/@types/@global";
import ShowData from "./ShowData";
import Pagination from "~/components/@pagination/Pagination";
import type { IExamHistoryData } from "~/@types/assessment/AssessmentMultipleChoice";
import Button from "~/components/@button/Button";

const mockExamHistoryData: IExamHistoryData[] = [
  {
    examAttempt: 1,
    examDate: "2025-04-05",
    startTime: "09:00",
    endTime: "11:00",
    totalQuestions: 25,
    examResult: "ผ่าน",
  },
  {
    examAttempt: 2,
    examDate: "2025-04-10",
    startTime: "13:00",
    endTime: "14:30",
    totalQuestions: 30,
    examResult: "ไม่ผ่าน",
  },
];

export default function ExamHistory() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 10,
    totalRows: 2,
    totalPages: 1,
  });
  const [data, setData] = useState<IExamHistoryData[]>([]);
  const [isOpenModalHistory, setIsOpenModalHistory] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setData(mockExamHistoryData);
      setLoading(false);
    }, 500);
  }, []);

  function handleExamHistory() {
    setIsOpenModalHistory(!isOpenModalHistory);
  }

  return (
    <section>
      <div className="container-title flex items-center justify-between mb-4">
        <p className="text-title text-xl font-semibold">ประวัติการสอบ</p>
        <div className="!w-fit !pt-0">
          <Button
            type="button"
            styleButton="btn-sky"
            btntext="ดูรายละเอียดการสอบ"
            iconName="icon-add"
            onClick={() => handleExamHistory()}
          />
        </div>
      </div>

      <TableTop
        pagin={pagin}
        classNameContainer="!justify-between mb-2"
        onSizeChange={(size) => {
          console.log("size", size);
        }}
      />

      <ShowData
        loading={loading}
        pagin={pagin}
        data={data}
        onHandleExamHistory={handleExamHistory}
      />

      <div className="pagin-layout">
        <Pagination
          dataLength={data.length}
          pagin={pagin}
          onPageChange={(page) => {
            console.log("page", page);
          }}
        />
      </div>
    </section>
  );
}
