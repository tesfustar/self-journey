import { useState, useCallback, useEffect } from "react";

export const useLang = () => {
  //Hook
  const [isAmh, setIsAmh] = useState(false);

  //Function
  const changeLang = useCallback((isAmh) => {
    setIsAmh(isAmh);
    localStorage.setItem(
      "langData",
      JSON.stringify({
        isAmh,
      })
    );
  }, []);

  let lang;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("langData"));

    if (storedData) {
      if (storedData.isAmh) {
        lang = changeLang(true);
      }
    }
  }, [lang]);

  //Return
  return {
    isAmh,
    changeLang,
  };
};
