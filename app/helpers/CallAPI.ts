import { exam } from "./Config.Axios";
import { DecryptJson, KeyJson } from "./JsonResponse";

// ฟังก์ชันสำหรับสร้าง FormData จากข้อมูลแบบ array ซ้อน array
function appendFormData(formData: FormData, key: string, value: any) {
  if (Array.isArray(value)) {
    value.forEach((subValue, index) => {
      appendFormData(formData, `${key}[${index}]`, subValue);
    });
  } else {
    formData.append(key, value);
  }
}

// ฟังก์ชัน CallAPI ที่รองรับ array ซ้อน array
export async function CallAPI(
  method: "GET" | "POST_FORM" | "POST_BODY" | "PUT_BODY" | "DELETE",
  endpoint: string,
  params: any = {},
  base: "api"
) {
  let baseURL;

  switch (base) {
    case "api":
      baseURL = exam;
      break;
  }

  try {
    let response;
    if (method === "GET") {
      const queryParams =
        typeof params === "string"
          ? params
          : new URLSearchParams(params).toString();
      response =
        typeof params === "string"
          ? await baseURL.get(`${endpoint}/${queryParams}`)
          : await baseURL.get(`${endpoint}?${queryParams}`);
    } else if (method === "POST_FORM") {
      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        appendFormData(formData, key, params[key]);
      });
      response = await baseURL.post(endpoint, formData);
    } else if (method === "POST_BODY") {
      response = await baseURL.post(endpoint, params);
    } else if (method === "PUT_BODY") {
      response = await baseURL.put(endpoint, params);
    } else if (method === "DELETE") {
      const queryParams = new URLSearchParams(params).toString();
      response = await baseURL.delete(`${endpoint}?${queryParams}`);
    }

    return DecryptJson(response?.data, KeyJson).then(
      (decryptedJson: any) => decryptedJson
    );
  } catch (error) {
    console.log("error", error);
  }
}
