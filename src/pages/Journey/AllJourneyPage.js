import React, { useContext, useState,useEffect } from "react";
import {Button,Center,Spinner,} from "@chakra-ui/react";
import axios from "axios";
import {motion} from 'framer-motion'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useHome } from "../../context/HomeContext";
import { LangContext } from "../../context/LangContext";
import { useAuth } from "../../context/auth";
import NameModal from "./components/NameModal";
import parse from 'html-react-parser';
import SpinnerLoader from '../../utils/SpinnerLoader';
const AllJourneyPage = () => {
  const navigate = useNavigate();
  const { Category, setCategory, User,mySet ,recomendedData } = useHome();
  const [currentPage,setCurrentPage]=useState(1)
  const { isAmh } = useContext(LangContext);
  const { token,user } = useAuth();
  const [userName,setUserName]=useState(false)
  const [data, setData] = useState([]);
  
  useEffect(() => {

    if(user.userCategories.length === 0){
   setTimeout(()=>(
        setUserName(true)
        ),5000)
    }
  })
  console.log( user)
  //Function
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };


    const categoriesData = useQuery(
      "categoriesDataApi",
      async () =>
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}categories`, {
          headers,
        }),
      {
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!token,
        onSuccess: () => {},
      }
    );
  

  const SelectedData = useQuery(
      [`SelectedDataApi`,currentPage, Category],
      async () =>
        await axios.get(Category === "Recommended" ?  `${process.env.REACT_APP_BACKEND_URL}recommended-journeys?page=${currentPage}` : `${process.env.REACT_APP_BACKEND_URL}journey-by-category/${Category}?page=${currentPage}`, {
          headers,
        }),
      {
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!token,
        onSuccess: (res) => {
          if (Category === "Recommended") {
            setData(res?.data?.data?.journeys);
          } else {
            setData(res?.data?.data?.journey);
          }
        },
      }
    );
    console.log(SelectedData?.data?.data?.data)
  return (
    <>
        <div>

<div className="border-b border-gray-400 w-full py-6 pt-20">
  {SelectedData.isFetched ? 
  
(

  <div className="max-w-4xl mx-auto p-4 flex flex-col  ">
  <div className="mb-2">
  <div className="h-3 text-3xl  sm:text-8xl text-left text-[#00a69c]">“</div>
  <h1 className="px-4  text-2xl sm:text-4xl lg:text-5xl text-center text-gray-800">
    {parse(isAmh ? SelectedData?.data?.data?.data?.quote?.quoteAm
                 : SelectedData?.data?.data?.data?.quote?.quote)} 
    </h1>
    <div className="h-3 text-3xl sm:text-8xl text-right text-[#00a69c]">”</div>
  </div>
   <span className="text-right font-bold text-lg pt-7 text-gray-800">{isAmh ? SelectedData?.data?.data?.data?.quote?.authorAm : SelectedData?.data?.data?.data?.quote?.author}</span>
</div>
):(
  <Center width={"100%"} height={"70vh"}>
  <SpinnerLoader/>
  </Center>
)}
  </div>
</div>

<div className="max-w-6xl  mx-auto w-full relative m-3 grid grid-cols-12 
grid-flow-row-dense gap-2 justify-center ">
    <div className="hidden md:flex sticky h-80 max-h-96 overflow-y-scroll scrollbar-hide w-full top-10 col-span-3 rounded-md bg-white shadow-md ">
      <div className="p-2 w-full">
      <h1 className="font-medium text-lg my-2 border-b border-gray-300 w-full">{isAmh ? "ምድቦች" : "Categories"}</h1>
      <div className="flex flex-col items-start space-y-2">
 
<h2 
  onClick={() => {
    setCategory("Recommended");
    navigate("/alljourneys");
  }}
  className={Category == "Recommended" ? "font-bold text-[#00a69c] p-1 w-full cursor-pointer" :
  "font-bold hover:bg-gray-100 p-1 w-full rounded-md cursor-pointer "}
>{isAmh ? "የሚመከር" : "Recommended"}</h2>
      {categoriesData?.isFetched ? (
  categoriesData?.data?.data?.data.map((data) => (
<h2 
    key={data?.id}
    onClick={() => {
          setCategory(data?.id);
          navigate("/allJourneys");
        }}
        className={Category == data?.id ? "font-bold text-[#00a69c] p-1 w-full cursor-pointer" :
         "font-bold hover:bg-gray-100 p-1 w-full rounded-md cursor-pointer "}
    > {isAmh? data?.nameAm? data?.nameAm: "ያልተገለጸ ጽሑፍ": data?.name}</h2>
  ))
) : (
  <Center w={200}>
    <SpinnerLoader />
  </Center>
)}
  </div>
      </div>
    </div>
    <div className="col-span-12 md:col-span-9 flex w-full flex-grow  flex-col items-center  sm:tems-start  
    justify-center ">
    <h1 className="font-semibold p-2 text-left">{ isAmh ? SelectedData?.data?.data?.data?.category?.nameAm  :SelectedData?.data?.data?.data?.category?.name}</h1>
    <div className=" gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  p-3 w-full">
    {SelectedData?.isFetched &&
(data?.length !== 0 || !SelectedData?.isSuccess) ? (
      data?.data?.map((item, index) => {
        return (
        <motion.div
        initial={{ scale: 0,opacity:0 }}
        animate={{ scale: 1,opacity:1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration:2,
          delayChildren: 1,
          staggerChildren: 0.2
        }}
        key={index} className='bg-white shadow-md p-2 rounded-lg w-full'>
            <img src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}${item?.image}`}
             alt=""   className="h-44 max-h-44 w-full object-cover  rounded-lg"/>
           <h2 className="font-semibold text-gray text-lg line-clamp-1 pt-2"> {isAmh ? (item?.nameAm ? item?.nameAm : "ያልተገለጸ ጽሑፍ") : item?.name}</h2>
            <h2 className='font-regular text-gray text-sm text-gray-400 '> {new Date(item?.timeToRead)
          .toISOString()
          .split("T")[1]
          .split(".")[0]
          .split(":")[0]
          .toString()}
        {":"}
        {new Date(item?.timeToRead)
          .toISOString()
          .split("T")[1]
          .split(".")[0]
          .split(":")[1]
          .toString()}{" "}
        {isAmh ? "ሰአታት" : "hrs"}</h2>
        <button
     className="border border-[#00a69c] text-[#00a69c] hover:bg-[#00a69c] hover:border-none transition-all duration-500 ease-in-out hover:text-white rounded-md font-medium w-full p-2   mt-5  "
    onClick={() => navigate("/journey", { state: item?.id })}
    >
    {isAmh ? "ጀምር" : "Start"}
  </button>
        </motion.div>
    );
  })
  ) : (
    <Center width={"100%"} height={"70vh"}>
    <Spinner size="xl" />
  </Center>
)}
    </div>
    <div className="flex w-full  items-center justify-between p-3 ">
{data?.prev_page_url !== null &&  <button 
   onClick={() =>{
    if(data?.prev_page_url!== null){
      setCurrentPage(old => Math.max(old - 1, 0))
    }
   }}
   disabled={data?.prev_page_url === null}
  className="p-2 bg-[#00a69c] text-white font-medium rounded-md px-3 
  disabled:cursor-not-allowed">{isAmh ? 'የቀድሞ ' : 'previous'}</button>}
{data?.next_page_url !== null &&  <button 
   onClick={() => {
     if (data?.next_page_url !== null) {
      setCurrentPage(old => old + 1)
    }
  }}
  // Disable the Next Page button until we know a next page is available
  disabled={data?.next_page_url === null}
  className="p-2 bg-[#00a69c] text-white font-medium rounded-md px-3
   disabled:cursor-not-allowed">{isAmh? 'ቀጣይ' : 'next'}</button>}
</div>
</div>
</div> 

     <NameModal setOpen={setUserName} isOpen={userName}/>
    </>
  )
}

export default AllJourneyPage