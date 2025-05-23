export interface IChoice {
  question: string;
  answerOptions: IAnswerOption[];
}

export interface IAnswerOption {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answerCorrect: string;
}

export type OptionKey = "option1" | "option2" | "option3" | "option4";

export interface IDataGCIOAssessmentChoice {
  id: number;
  question: string;
  uoc: string;
  eoc: string;
  pc: string;
  createdAt: string;
  createBy: string;
  status: string;
  action: string;
}

interface IgroupItemsExamScheduling {
  id: number;
  round: string;
  examDate: string;
  time: string;
  status: "รอยืนยัน" | "ยืนยันแล้ว" | "ไม่ผ่าน";
}

export interface IDataExamScheduling {
  regisDate: string;
  examSet: string;
  groupItems: IgroupItemsExamScheduling[];
}

interface IExamEnrollment {
  enrollmentId: number;
  numDays: number;
  examSet: IExamSet;
  examSchedules: IExamSchedule[];
}

interface IExamSet {
  examsetId: number;
  examsetType: number;
  examsetName: string;
  stdId: number;
  stdName: string;
  description: string;
  totalQuestions: number;
  maxScore: number;
  passPercentage: number;
  numDateExam: number;
  isUsed: string;
}

interface IExamSchedule {
  scheduleId: number;
  partNo: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  totalQuestions: number;
  status: number;
  statusName: string;
  createdDate: string;
  updatedDate: string;
}

export interface IExamData {
  createdDate: string;
  examEnrollments: IExamEnrollment[];
}

export interface IExamHistoryData {
  examAttempt: number;
  examDate: string;
  startTime: string;
  endTime: string;
  totalQuestions: number;
  examResult: string;
}

interface ISaveExamEnrollment {
  enrollmentId: number;
  numDays: number;
  personId: number;
  examsetId: number;
  createdDate: Date;
}

interface ISaveExamSchedule {
  scheduleDate: string;
  scheduleStartTime: string;
  scheduleEndTime: string;
}

export interface ISaveExamData {
  examEnrollment: ISaveExamEnrollment;
  examSchedule: ISaveExamSchedule[];
}

export interface ILoginData {
  Email: string;
  Password: string;
}

export interface IRegisterData {
  Username: string;
  FullName: string;
  Email: string;
  Password: string;
}

export interface IExamReschedulesRequest {
  scheduleId: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  reason: string;
}
