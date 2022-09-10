import { Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import parse from 'html-react-parser';
import { LangContext } from "../../../context/LangContext";

export default function ABlog({ data }) {
  //Hook
  const { isAmh } = useContext(LangContext);

  console.log("data: ", data);

  //Jsx
  return (
    <div className="flex flex-col items-start max-w-6xl mx-auto">
      <h1 className="font-bold text-2xl">
        {isAmh ? data?.titleAm : data?.title}
      </h1>
      <img src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}${data?.image}`}
      alt="Dan Abramov" className="w-full h-44 md:h-96 object-cover" />
      <p className="text-sm">{parse(isAmh ? data?.bodyAm : data?.body)}</p>
    </div>
  );
}
