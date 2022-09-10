import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHome } from "../../context/HomeContext";
import Divider from "../../utils/Divider";
import ABlog from "./components/ABlog";
import CustomSlider from "./components/CustomSlider";
import NoContent from "../../utils/NoContent";
import { LangContext } from "../../context/LangContext";
import { useAuth } from "../../context/auth";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import SpinnerLoader from "../../utils/SpinnerLoader";
import {
  Button,
  Center,
  HStack,
  SkeletonCircle,
  Spinner,
  Stack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
const Journey = () => {
  const navigation = useNavigate();
  const { pages, setPages } = useHome();
  const { state } = useLocation();
  const [CurrentPage, setCurrentPage] = useState(1);
  const [hasContent, sethasContent] = useState(0);
  const [CurrentURL, setCurrentURL] = useState(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px )");
  const { isAmh } = useContext(LangContext);
  const { token } = useAuth();
  const { User } = useHome();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const journeyData = useQuery(
    `journeyDataApi${CurrentURL}`,
    async () =>
      await axios.get(
        CurrentURL === null
          ? `${process.env.REACT_APP_BACKEND_URL}blogsByJourney/${state}`
          : CurrentURL,
        {
          headers,
        }
      ),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {},
    }
  );

  useEffect(() => {
    sethasContent(journeyData?.data?.data?.data[1]?.data.length);
    setPages(journeyData?.data?.data?.data[1]?.total);
  }, [journeyData]);
  console.log(journeyData?.data?.data?.data)
  function NavigationButton() {
    return (
    
      <Stack
        flexDirection={!isLargerThan768 ? "column" : "row"}
        width={"90%"}
        justifyContent={"space-around"}
        alignItems={isLargerThan768 ? "flex-end" : "stretch"}
        pt={10}
      >
        <Button
          variant={"solid"}
          isDisabled={
            hasContent === 0 ||
            journeyData?.data?.data?.data[1]?.prev_page_url === null ||
            journeyData?.isFetching
            ? true
              : false
            }
            fontSize={18}
            bg={"#16A4D3"}
            color={"white"}
            // onClick={() => navigation("../journey/quiz")}
            onClick={() => {
              if (journeyData?.data?.data?.data[1]?.prev_page_url === null) {
              return null;
            } else
            setCurrentURL(journeyData?.data?.data?.data[1]?.prev_page_url);
            setCurrentPage((prev) => prev - 1);
          }}
          >
          <ChevronLeftIcon />
          {isAmh ? "የቀድሞ ጉዞ" : "Prev Journey"}
        </Button>
        <Button
          variant={"solid"}
          fontSize={18}
          bg={"#16A4D3"}
          color={"white"}
          isDisabled={journeyData?.isFetching ? true : false}
          onClick={() => {
            if (journeyData?.data?.data?.data[1]?.next_page_url === null)
            navigation(`/journey/success/${journeyData?.data?.data?.data[0]?.id}`, {
              state: journeyData?.data?.data?.data[0]?.id,
              });
            else {
              setCurrentURL(journeyData?.data?.data?.data[1]?.next_page_url);
              setCurrentPage((prev) => prev + 1);
            }
          }}
        >
          {journeyData?.data?.data?.data[1]?.next_page_url === null
            ? isAmh
              ? "ጨርስ"
              : "Finish"
            : isAmh
            ? "ቀጣይ ጉዞ"
            : "Next Journey"}
          <ChevronRightIcon />
        </Button>
      </Stack>
    );
  }
  return (
    <>
     <div className="px-3 pt-24  ">
     <div className="max-w-6xl mx-auto">

    <VStack width={"100%"} spacing={3} pb={25}>
      <Text
        alignSelf={"flex-start"}
        w={"90%"}
        color={"black"}
        fontSize={22}
        fontWeight={"700"}
      >
        {isAmh ? "ሰልፍ ጆርኒ" : "Self Journey"}
      </Text>
      <Divider />
      {CurrentURL != undefined ? (
        <CustomSlider value={CurrentPage} />
        ) : (
        <CustomSlider value={1} />
        )}
      {journeyData?.isFetching ? (
        <SpinnerLoader />
        ) : hasContent === 0 ? (
          <NoContent />
          ) : (
            <ABlog data={journeyData?.data?.data?.data[1]?.data[0]} />
      )}
      <NavigationButton />
    </VStack>
            </div>
        </div> 
    </>
  )
}

export default Journey