import { useState } from "react";
import Modal from "~/components/modal/Modal";
import ModalAssessment from "./ModalAssessment";

export default function AssessmentHistory() {
  const [isMenuModal, setIsMenuModal] = useState<string>("");
  function renderContentModal() {
    switch (isMenuModal) {
      case "02":
        return {
          titleModal: "คำชี้แจง",
          contentModal: <ModalAssessment />,
        };
      default:
        return { titleModal: "", contentModal: null };
    }
  }

  const { titleModal, contentModal } = renderContentModal();

  return (
    <div>
      <h3>ประวัติการทำแบบทดสอบ</h3>
      <hr />

      <div className="flex justify-end mt-2">
        <button type="button" onClick={() => setIsMenuModal("02")}>
          <div className="btn-logout text-sky-main">
            <div className="icon-circle text-center">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <p>ทำแบบทดสอบ</p>
          </div>
        </button>
      </div>
      <div className="mt-2">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ลำดับ</th>
              <th className="border px-4 py-2 text-left">วันที่สอบ</th>
              <th className="border px-4 py-2 text-left">
                คะแนน (สอบได้/เต็ม)
              </th>
              <th className="border px-4 py-2 text-left">คิดเป็นเปอร์เซ็น</th>
              <th className="border px-4 py-2 text-left">ผลการประเมิน</th>
              <th className="border px-4 py-2 text-left">
                ผลการประเมินตามกลุ่มทักษะ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">01/03/2568</td>
              <td className="border px-4 py-2">18/20</td>
              <td className="border px-4 py-2">90%</td>
              <td className="border px-4 py-2">ดีมาก</td>
              <td className="border px-4 py-2">
                การคิดวิเคราะห์: ดี / การสื่อสาร: ปานกลาง
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal
        width="max-w-3xl"
        isOpen={isMenuModal !== ""}
        title={titleModal}
        onClose={() => setIsMenuModal("")}
      >
        {contentModal}
      </Modal>
    </div>
  );
}
