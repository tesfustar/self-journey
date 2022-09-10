import React, { useContext, useEffect, useState ,useRef} from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHome } from "../../context/HomeContext";
import NoContent from "../../utils/NoContent";
import { LangContext } from "../../context/LangContext";
import { useAuth } from "../../context/auth";
import { Button, message, Steps } from 'antd';
import ABlog from "./components/ABlog";
import CustomSlider from "./components/CustomSlider";
import SpinnerLoader from "../../utils/SpinnerLoader";
import {BiChevronRight,BiChevronLeft} from 'react-icons/bi'
import Custom from './components/Stepper'
const JourneyPage = () => {
    const navigation = useNavigate();
  const { pages, setPages } = useHome();
  const { state } = useLocation();
  const [CurrentPage, setCurrentPage] = useState(1);
  const [hasContent, sethasContent] = useState(0);
  const [CurrentURL, setCurrentURL] = useState(null);
  const scrollRef=useRef()
  const { isAmh } = useContext(LangContext);
  const { token } = useAuth();
  const [current, setCurrent] = useState(0);
 console.log("CurrentPage",CurrentPage)
  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    };
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
  const total=journeyData?.data?.data?.data[1]?.total;
  const [length]=useState(total)
  useEffect(() => {
    sethasContent(journeyData?.data?.data?.data[1]?.data.length);
    setPages(journeyData?.data?.data?.data[1]?.total);
  }, [journeyData]);

   
    console.log(journeyData?.data?.data?.data)
    const styles={
        minHeight: '200px',
        marginTop: '16px',
        paddingtop: '80px',
        textAlign: 'center',
        backgroundColor: '#fafafa',
        border: '1px dashed #e9e9e9',
        borderRadius: '2px'
    }
  return (
    <div className="pt-24 p-3">
    <div ref={scrollRef}></div>
     <Custom />
        <div className='flex flex-col items-start max-w-6xl mx-auto '>
     <div className="p-6 w-full flex-grow">
     {CurrentURL != undefined ? (
        <CustomSlider value={CurrentPage} CurrentPage={CurrentPage}/>
        ) : (
        <CustomSlider value={1} CurrentPage={CurrentPage}/>
        )}
       </div>
      
      
      {journeyData?.isFetching ? (
        <SpinnerLoader />
        ) : hasContent === 0 ? (
          <NoContent />
          ) : (
            <ABlog data={journeyData?.data?.data?.data[1]?.data[0]} />
      )}

      <div className="flex items-center justify-center w-full space-x-5 py-5">
        {journeyData?.data?.data?.data[1]?.prev_page_url !== null && <button className="flex items-center space-x-2 border border-[#00a69c] p-2 px-5  text-[#00a69c]
         hover:bg-[#00a69c] hover:text-white
          rounded-md"
          disabled={
            hasContent === 0 ||
            journeyData?.data?.data?.data[1]?.prev_page_url === null ||
            journeyData?.isFetching
            ? true
              : false
            }
          onClick={() => {
            if (journeyData?.data?.data?.data[1]?.prev_page_url === null) {
            return null;
          } else
          setCurrentURL(journeyData?.data?.data?.data[1]?.prev_page_url);
          setCurrentPage((prev) => prev - 1);setCurrent(current - 1);
        }}
          ><BiChevronLeft size={20} />{isAmh ? "የቀድሞ ጉዞ" : "Prev Journey"}</button>}
        <button
        className="flex items-center space-x-2 border border-[#00a69c] p-2 px-5  text-[#00a69c]
        hover:bg-[#00a69c] hover:text-white rounded-md"
        disabled={journeyData?.isFetching ? true : false}
          onClick={() => {window.scrollTo({top: 0,behavior: "smooth"});
            if (journeyData?.data?.data?.data[1]?.next_page_url === null)
            navigation(`/journey/success/${journeyData?.data?.data?.data[0]?.id}`, {
              state: journeyData?.data?.data?.data[0]?.id,
              });
            else {
              setCurrentURL(journeyData?.data?.data?.data[1]?.next_page_url);
              setCurrentPage((prev) => prev + 1);
            }; setCurrent(current + 1)
          }}
        > {journeyData?.data?.data?.data[1]?.next_page_url === null
            ? isAmh
              ? "ጨርስ"
              : "Finish"
            : isAmh
            ? "ቀጣይ ጉዞ"
            : "Next Journey"}<BiChevronRight size={20} /></button>
      </div>
    </div>
        </div>
  )
}

export default JourneyPage

{/* <div className="steps-action">
        {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
            <Button
            style={{
                margin: '0 8px',
            }}
            onClick={() => prev()}
            >
            Previous
          </Button>
        )}
      </div>  */}