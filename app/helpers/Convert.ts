export function CommaNumber(num: number | string | null | undefined, units = 0): string {
    if (num === null || num === undefined || num === "") return "0";
    const options: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: units,
      maximumFractionDigits: units,
    };
  
    if (typeof num === "string") {
      num = parseFloat(num);
    }
  
    return num.toLocaleString("en-GB", options);
  }
  
  // 10:00:00 to 10:00
  export function FormatTime(time: string) {
    return time.slice(0, 5); // เอาแค่ HH:mm
  }
  
  // 20/04/2568 to 2025-04-20
  export function DateTHtoEN(date: string | null | undefined) {
    if (date) {
      const splitDate = date.replace(" ", "").split("/");
      return `${(parseInt(splitDate[2]) - 543).toString()}-${splitDate[1]}-${splitDate[0]}`;
    } else {
      return "";
    }
  }
  
  // 2025-04-21 to 21/04/2568
  export function DateENtoTH(date: string | null | undefined) {
    const datePad = date ? new Date(date) : new Date();
    const day = datePad.getDate().toString().padStart(2, "0");
    const month = (datePad.getMonth() + 1).toString().padStart(2, "0");
    const year = (datePad.getFullYear() + 543).toString();
    return `${day}/${month}/${year}`;
  }