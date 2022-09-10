import React, { useEffect } from 'react'
import {runFireWorks} from '../../utils/RunFireWork'
import { useLang } from '../../context/lang';
import {Link,useParams,useNavigate} from 'react-router-dom'
import Hero from "../../assets/Hero.png";
import { useAuth } from "../../context/auth";
import {useQuery} from 'react-query'
import axios from 'axios'
import {motion} from 'framer-motion'
import {Spinner,Center,useMediaQuery,} from "@chakra-ui/react";
import SpinnerLoader from '../../utils/SpinnerLoader';
import SuccessModal from './SuccessModal'
const Success = () => {
  const navigate = useNavigate();
  const { isAmh, } = useLang()
  const { token,user } = useAuth();
  const {id}=useParams()
  useEffect(()=>{
    runFireWorks()
  })
  console.log(id)
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const Journeys = useQuery(
    [`SelectedJourneyDataApi`,id],
    async () =>
      await axios.get( `${process.env.REACT_APP_BACKEND_URL}journeys/${id}/related`, {
        headers,
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => { }
      },
    
  );
  console.log(Journeys?.data?.data?.data)

  return (
    <>
      <div className=''>
        <div className=''>

     <img src={Hero} alt="" className=' w-full h-full'/>
        </div>
      </div>
      <div className='max-w-6xl mx-auto py-6 p-3 flex flex-col space-y-1'>
        <div className='bg-[#00a69c] p-2 rounded-t-md'>
          <h1 className='font-medium text-white text-lg'>Related Journeys</h1>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full" >
          {Journeys.isFetched ? (
              Journeys?.data?.data?.data?.map((item,index)=>(
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
     className="bg-[#00a69c] rounded-md font-medium w-full text-white p-2  hover:opacity-50 mt-5 "
    onClick={() => navigate("/journey", { state: item?.id })}
    >
    {isAmh ? "ጀምር" : "Start"}
  </button>
        </motion.div>
              ))
          ):(
         <Center>
          <SpinnerLoader />
        </Center>
          )}
      

        </div>
        <div className='flex items-center justify-end float-right py-4'>

        <button
    className="bg-[#00a69c] p-2 w-32 text-white rounded-md font-medium  "
    onClick={() => navigate("/allJourneys")}
    >
    {isAmh ? "ሁሉም ይዩ" : "see all"}
  </button>
      </div>
      </div>
      <SuccessModal />
    </>
  )
}

export default Success