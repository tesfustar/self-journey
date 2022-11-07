import { useContext, useMemo, useState } from "react";
import { LangContext } from "../context/LangContext";

export default function useValidPhone() {
  const phoneNumber = localStorage.getItem("phoneNumber")
  const [phone, setPhone] = useState(phoneNumber  ? phoneNumber : "");
  const [PhoneError, setPhoneError] = useState("");
  const { isAmh } = useContext(LangContext);
  useMemo(() => {
    if ([...phone].slice(0, 3).join("") == "251") {
      setPhoneError(isAmh ? "251 መጨመር አያስፈልግም" : "No need to add 251");
      setPhone((prev) => prev?.substring(3));
    }
    if ([...phone][0] == "0") {
      setPhoneError(isAmh ? "በ0 መጀመር አያስፈልግም" : "No need to start with 0");
      setPhone((prev) => prev?.substring(1));
    }
    if ([...phone].length > 9) {
      setPhone((prev) => prev?.substring(0, 9));
    }
    if (
      ([...phone][0] !== "0" || [...phone].slice(0, 3).join("") !== "251") &&
      [...phone].length === 9
    ) {
      setPhoneError("");
    }
  }, [phone]);

  return [phone, setPhone, PhoneError];
}
