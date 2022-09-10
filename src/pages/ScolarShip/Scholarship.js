import React,{useState,useContext,useEffect} from 'react'
import {Spinner,Center,Button} from "@chakra-ui/react";
import {motion} from 'framer-motion'
import { useParams, useLocation, useNavigate ,Link} from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import {useQuery} from 'react-query'
import axios from 'axios';
import parse from 'html-react-parser';
import { useAuth } from "../../context/auth";
import { useHome } from "../../context/HomeContext";
import {BiChevronRight,BiChevronUp} from 'react-icons/bi'
import SpinnerLoader from '../../utils/SpinnerLoader';
const Scholarship = () => {
  const { isAmh, changeLang } = useContext(LangContext);
   const navigate = useNavigate();
   const { Category, setCategory, User,recomendedData,setRecomendedData } = useHome();
   const { token,user } = useAuth();
   const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const {id}=useParams()
  const scholarshipsData = useQuery(
    "scholarshipsDataApi",
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}scholarships/${id}/paginated`, {
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
  console.log(scholarshipsData?.data?.data?.data)
  return (
    <div className='max-w-6xl mx-auto pt-24 p-3'>
        <div className="flex flex-col items-center justify-center space-y-2 pb-5">
          <h5 className="font-medium">{isAmh ?'ስለ ሁሉም ነገር':'ALL ABOUT'}</h5>
          <h1 className="font-bold text-2xl sm:text-4xl">{isAmh ?  scholarshipsData?.data?.data?.data[0]?.article_category?.nameAm : scholarshipsData?.data?.data?.data[0]?.article_category?.name}</h1>
          <p className="text-[13px] text-[#949494] text-center">{isAmh ? 'የራስ ጉዞ አንድ ሰው በዓላማ ላይ የተመሰረተ ህይወት መኖር የሚጀምርበት እና በመንገዱ ላይ ከፍተኛ መጠን ያለው ድጋፍ የሚያገኙበት መድረክ ነው':'Self Journey is a platform where one can start living a purpose driven life and get a tremendous amount of support along the way.'}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {scholarshipsData?.isFetched ? (
           scholarshipsData?.data?.data?.data?.map((item) =>{
            return (
              <Link to={`/blog-details/${item.id}`} key={item.id}>
              <div  
             className='flex flex-col  items-start bg-white rounded-md cursor-pointer hover:scale-105'>
              <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="category image" 
             className="h-44 max-h-44 w-full object-cover  rounded-lg" />
            <div className=' p-3 w-full flex flex-col space-y-1'>
            <h1 className="font-bold text-[13px] text-[#D9A529]">{isAmh ?  item?.article_category?.nameAm:item?.article_category?.name}</h1>
            <h1 className='font-bold text-sm line-clamp-2'>{isAmh ? item.titleAm : item.title}</h1>
            <h1 className='font-regular text-gray text-sm text-[#021917] '>oct, 23, 2020</h1>
             
            </div>
            </div>
              </Link>
            )
          })
        ) : (
          <SpinnerLoader />
        )}
        </div>
    </div>
  )
}

export default Scholarship