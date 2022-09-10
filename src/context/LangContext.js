import { createContext } from "react";

export const LangContext = createContext({
  isAmh: false,
  changeLang: () => {},
});
