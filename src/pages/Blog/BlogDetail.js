import React,{useState,useContext,useEffect} from 'react'
import { LangContext } from "../../context/LangContext";
import {useQuery} from 'react-query'
import axios from 'axios';
import {Spinner,Center,Button} from "@chakra-ui/react";
import parse from 'html-react-parser';
import { useAuth } from "../../context/auth";
import { useHome } from "../../context/HomeContext";
import { Outlet, useLocation, useNavigate ,Link,useParams} from "react-router-dom";
import { useLang } from '../../context/lang';
import SpinnerLoader from '../../utils/SpinnerLoader';
const BlogDetail = () => {
   
const {id}=useParams()
const { token,user } = useAuth();
const navigate = useNavigate();
const { isAmh, } = useLang()
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};
// const blogDetailData = useQuery(
//   "blogDataApi",
//   async () =>
//     await axios.get(`${process.env.REACT_APP_BACKEND_URL}articles/${id}`, {
//       headers,
//     }),
//   {
//     keepPreviousData: false,
//     refetchOnWindowFocus: false,
//     retry: false,
//     enabled: !!token,
//     onSuccess: () => {},
//   }
// );
const blogDetailData = useQuery(
  ["blogDetailsDataApi", id],
  async () =>
    await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}articles/${id}`,
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
const handleChange=(id)=>{
  navigate(`/blog-details/${id}`)
 }
const fetchDetails=async()=>{
  const datas = await axios.get(`${process.env.REACT_APP_BACKEND_URL}articles/${id}`,{headers})
  return datas?.data
}
const { isLoading, error, data } = useQuery(['blogs',id],fetchDetails)
console.log(blogDetailData?.data?.data?.data?.article?.image)
  return (
    <div className='px-3 pt-24'>
      {blogDetailData.isLoading ? (
  <Center w={200}>
  <SpinnerLoader />
</Center>
      ):(
        <div className='sm:max-w-6xl sm:mx-auto rounded-xl sm:m-2'>
        <img src={process.env.REACT_APP_BACKEND_IMAGE_URL + blogDetailData?.data?.data?.data?.article?.image}alt="" 
        className='h-[200px] md:h-[450px] w-full object-cover rounded-md'/> 
         <div className="relative sm:max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-4 py-5">
         <div className='p-3 md:col-span-8 bg-white rounded-2xl flex flex-col space-y-5'>
         <div className='flex items-center space-x-3 px-1 flex-warp '>
          {data?.data?.article?.tags?.map((item)=>(
             <h3 className='font-normal bg-gray-100 rounded-md p-1 text-xs'># {isAmh ? item.titleAm : item.title}</h3>
          ))}
         </div>
        <h1 className='font-bold text-sky-900 text-lg sm:text-2xl'>{isAmh ? blogDetailData?.data?.data?.data?.article?.titleAm : blogDetailData?.data?.data?.data?.article?.title} </h1>
           <p className='font-normal text-[15px] text-zink-900'>{parse(isAmh ? blogDetailData?.data?.data?.data?.article?.bodyAm : blogDetailData?.data?.data?.data?.article?.body)} </p>
         </div>
        
         <div className='md:sticky h-fit pb-3 top-18  w-full  md:col-span-4
              flex flex-col flex-grow    bg-white rounded-2xl overflow-y-scroll scrollbar-hide'>
                <h1 className='bg-zinc-900 text-white p-3 rounded-t-2xl font-bold'>Related topics</h1>
            <div className='grid grid-cols-1 gap-2 p-2'>
              {blogDetailData?.data?.data?.data?.related_articles?.map((item)=>(
                <div onClick={()=>handleChange(item.id)}
                className='flex group items-start  shadow-lg rounded-md cursor-pointer '>
                   <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="category image" 
              className=' w-24 h-20 object-cover rounded-lg p-1' />
              <div className='flex flex-col items-start pt-2 px-3 space-y-2'>

                 <h1  className=' text-sm  font-bold group-hover:text-[#00a69c] line-clamp-2'> {isAmh
              ? item?.titleAm
              ? item?.titleAm
              : "ያልተገለጸ ጽሑፍ"
              : item?.title}</h1>
              <p className='line-clamp-1 text-sm text-gray-400'>ቆጣሪ ከእኩለ ሌሊት በኋላ 7 ደቂቃ ነበር። ውሻው ከወይዘሮ ሺርስ ቤት ፊት ለፊት ባለው የሣር ሜዳ መካከል ባለው ሣር ላይ ተኝቷል። አይኖቹ ተዘግተው ነበር።</p>
              </div>
                </div>
              ))}
            </div>
         </div>
         </div>

       </div>
      )}
    {/* <Footer /> */}
    </div>
  )
}

export default BlogDetail