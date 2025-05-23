import type { ISaveExamData, IExamReschedulesRequest } from "~/@types/assessment/AssessmentMultipleChoice";
import { CallAPI } from "~/helpers/CallAPI";

export async function CreateMyExamEnrollment(data: ISaveExamData) {
  return CallAPI(
    "POST_BODY",
    "ExamSchedule/CreateMyExamEnrollment",
    data,
    "api"
  );
}

export async function UpdateExamSchedule(data: IExamReschedulesRequest) {
  return CallAPI(
    "POST_BODY",
    "ExamSchedule/UpdateExamSchedule",
    data,
    "api"
  );
}

export async function GetMyExamEnrollment(
  pageSize: number,
  currentPage: number,
  examsetType: number,
  personId: number
) {
  const queryString = {
    pageSize,
    currentPage,
    examsetType,
    personId,
  };
  return CallAPI("GET", "ExamSchedule/GetMyExamEnrollment", queryString, "api");
}
