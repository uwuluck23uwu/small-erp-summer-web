import { CallAPI } from "~/helpers/CallAPI";
import type {
  ExamHistoryReq,
  ExamQuizReq,
  EsMultipleChoiceQuestion,
} from "~/@types/assessment/AssessmentMultipleChoice";

export async function GetRandomAsk(enrollmentId: number, scheduleId = 0) {
  return CallAPI(
    "GET",
    "MultipleChoiceQuestion/GetRandomAsk",
    { enrollmentId, scheduleId },
    "api"
  );
}

export async function SaveExamQuiz(data: ExamQuizReq) {
  return CallAPI(
    "POST_BODY",
    "MultipleChoiceQuestion/SaveExamQuiz",
    data,
    "api"
  );
}

export async function GetAllExamHistory(params: ExamHistoryReq) {
  return CallAPI(
    "GET",
    "MultipleChoiceQuestion/GetAllExamHistory",
    params,
    "api"
  );
}

export async function GetMultipleChoiceQuestion(
  pageSize = 10,
  currentPage = 1
) {
  return CallAPI(
    "GET",
    "MultipleChoiceQuestion/GetMultipleChoiceQuestion",
    { pageSize, currentPage },
    "api"
  );
}

export async function GetQuestionById(id: number) {
  return CallAPI("GET", `MultipleChoiceQuestion/${id}`, undefined, "api");
}

export async function CreateMultipleQuestions(
  questions: EsMultipleChoiceQuestion[]
) {
  return CallAPI(
    "POST_BODY",
    "MultipleChoiceQuestion/Create",
    questions,
    "api"
  );
}

export async function UpdateQuestion(id: number, data: FormData) {
  return CallAPI("POST_FORM", `MultipleChoiceQuestion/${id}`, data, "api");
}

export async function DeleteQuestion(id: number) {
  return CallAPI("DELETE", `MultipleChoiceQuestion/${id}`, undefined, "api");
}
