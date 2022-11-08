import { HStack, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LangContext } from "../../../context/LangContext";

export default function Bottom() {
  //Hook
  const [isLargerThan768] = useMediaQuery("(min-width: 768px )");
  const { isAmh } = useContext(LangContext);
  //Jsx
  return (
    <Stack
      flexDirection={isLargerThan768 ? "row" : "column"}
      justifyContent={isLargerThan768 ? "space-between" : "center"}
      alignItems={isLargerThan768 ? "center" : "center"}
      bg={"#011D26"}
      width={"100%"}
      px={"50px"}
      py={"10px"}
    >
      <Text
        onClick={() => {
          console.log("click");
          navigate("/Termandcondition");
        }}
        color="white"
      >
        {isAmh ? "ውሎች እና ሁኔታዎች" : "Terms & Conditions"}
      </Text>
      <HStack>
        <img src="https://img.icons8.com/material-outlined/18/ffffff/creative-commons-all-rights-reserved.png" />
        <Text color="white">2021</Text>
        <Text color="#16A4D3"> {isAmh ? "ሰልፍ ጆርኒ" : "Self Journey"}</Text>
        <Text color="white"> {isAmh ? "የተሰራው" : "Made by"}</Text>
        <Text color="#16A4D3"> Jaktech</Text>
      </HStack>
    </Stack>
  );
}
