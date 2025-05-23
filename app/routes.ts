import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/Layout.tsx", [
    index("views/MainHome.tsx"),
    route("login", "views/authen/Login.tsx"),
    route("register", "views/authen/Register.tsx"),
    route("assessment-history", "views/assessment/AssessmentHistory.tsx"),
    route("exam-taken", "views/assessment/ExamTaken.tsx"),
    route("exam-history", "views/exam-history/ExamHistory.tsx"),
    route("exam-schedule", "views/exam-schedule/ExamSchedule.tsx"),
  ]),
] satisfies RouteConfig;
