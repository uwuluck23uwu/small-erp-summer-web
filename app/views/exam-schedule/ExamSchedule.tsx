import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import TableTop from "~/components/@table-top/TableTop";
import type { IPagin } from "~/@types/@global";
import ShowData from "./ShowData";
import Pagination from "~/components/@pagination/Pagination";
import type { IExamData } from "~/@types/assessment/AssessmentMultipleChoice";
import Button from "~/components/@button/Button";
import { GetMyExamEnrollment } from "~/services/ExamSchedule.Service";
import ModalExamSchedule from "./ModalExamSchedule";

export default function ExamSchedule() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 10,
    totalRows: 10,
    totalPages: 1,
  });
  const [data, setData] = useState<IExamData[]>([]);
  const [isOpenModalScheduling, setIsOpenModalScheduling] =
    useState<boolean>(false);
  const [isOpenModalExplanation, setIsOpenModalExplanation] =
    useState<any>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChangePagin = (pageSize: number, currentPage: number) => {
    fetchExamEnrollment(pageSize, currentPage, 1, 1);
  };

  useEffect(() => {
    handleChangePagin(10, 1);
    navigate(pathname);
  }, []);

  function handleExam() {
    setIsOpenModalScheduling(!isOpenModalScheduling);
  }

  //ดึงข้อมูลการจัดการตารางสอบ
  async function fetchExamEnrollment(
    pageSize: number,
    currentPage: number,
    examsetType: number,
    personId: number
  ) {
    setLoading(true);
    const res = await GetMyExamEnrollment(
      pageSize,
      currentPage,
      (examsetType = 1),
      (personId = 1)
    );
    setLoading(false);

    if (res) {
      if (res.statusCode === 200 && res.success) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  return (
    <section>
      <div className="container-title mt-5">
        <p className="text-title">ข้อมูลการจัดการตารางสอบ</p>
        <div className="container-btn !w-fit !pt-0">
          {data?.length !== 0 && (
            <Button
              onClick={handleExam}
              type="button"
              styleButton="btn-blue"
              btntext="จัดตารางสอบ"
              iconName="icon-add"
            />
          )}
          {/* <Button type="button" styleButton="btn-green" btntext="ประวัติการทำแบบทดสอบ" iconName="icon-document" /> */}
        </div>

        <hr />
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
        onhandleExam={handleExam}
        onhandleExamScheduling={(val: any) => setIsOpenModalExplanation(val)}
      />
      <div className="pagin-layout">
        <Pagination
          dataLength={1}
          pagin={pagin}
          onPageChange={(page) => {
            console.log("page", page);
          }}
        />
      </div>

      {isOpenModalScheduling && (
        <ModalExamSchedule
        onClose={() => handleExam()}
        onSuccess={() => {
          fetchExamEnrollment(10, 1, 1, 1);
          handleExam();
        }}
      />
    )}
    </section>
    //   <section>
    //   <div className="container-title flex items-center justify-between mb-4">
    //     <p className="text-title text-xl font-semibold">
    //       ข้อมูลการจัดการตารางสอบ
    //     </p>
    //     <div className="!w-fit !pt-0">
    //       <Button
    //         type="button"
    //         styleButton="btn-sky"
    //         btntext="จัดตารางสอบ"
    //         iconName="icon-add"
    //         onClick={() => handleExam()}
    //       />
    //     </div>
    //   </div>

    //   <TableTop
    //     pagin={pagin}
    //     classNameContainer="!justify-between mb-2"
    //     onSizeChange={(size) => {
    //       console.log("size", size);
    //     }}
    //   />

    //   <ShowData
    //     loading={loading}
    //     pagin={pagin}
    //     data={data}
    //     onhandleExam={handleExam}
    //     onhandleExamScheduling={(val: any) => setIsOpenModalExplanation(val)}
    //   />
    //   <div className="pagin-layout">
    //     <Pagination
    //       dataLength={1}
    //       pagin={pagin}
    //       onPageChange={(page) => {
    //         console.log("page", page);
    //       }}
    //     />
    //   </div>

    //   {isOpenModalScheduling && (
    //     <ModalExamSchedule onClose={() => handleExam()} />
    //   )}
    // </section>
  );
}
