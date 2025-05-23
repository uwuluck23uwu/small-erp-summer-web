import type { ILoginData, IRegisterData } from "~/@types/assessment/AssessmentMultipleChoice";
import { CallAPI } from "~/helpers/CallAPI";

export async function ApiLogin(data: ILoginData) {
  return CallAPI(
    "POST_BODY",
    "Authen/Login",
    data,
    "api"
  );
}

export async function ApiRegister(data: IRegisterData) {
  return CallAPI(
    "POST_BODY",
    "Authen/Register",
    data,
    "api"
  );
}
