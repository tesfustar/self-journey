import React,{useState,useContext,useEffect} from 'react'
import {Spinner,Center,Button} from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate ,Link} from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import {useQuery} from 'react-query'
import axios from 'axios';
import parse from 'html-react-parser';
import { useAuth } from "../../context/auth";
import { useHome } from "../../context/HomeContext";

const BlogPage = () => {
  const { isAmh, changeLang } = useContext(LangContext);
  const navigate = useNavigate();
  const { Category, setCategory, User,blogCategory,setBlogCategory} = useHome();
  const { token,user } = useAuth();
  const [data,setData]=useState(null)
  const headers = {
   "Content-Type": "application/json",
   Accept: "application/json",
   Authorization: `Bearer ${token}`,
 };
  const blogPageData = useQuery(
   "blogPageDataApi",
   async () =>
     await axios.get(`${process.env.REACT_APP_BACKEND_URL}view-all-articles` , {
       headers,
     }),
   {
     keepPreviousData: false,
     refetchOnWindowFocus: false,
     retry: false,
     enabled: !!token,
     onSuccess: (res) => {setData(res?.data)},
   }
 );


 const blogArticlesData = useQuery(
   ["blogArticlesDataApi",blogCategory],
   async () =>
     await axios.get(blogCategory ?  `${process.env.REACT_APP_BACKEND_URL}articles-by-category/${blogCategory}` : `${process.env.REACT_APP_BACKEND_URL}view-articles-and-topics` , {
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

 //blog categories
 const blogCategorys = useQuery(
   "blogCategoryApi",
   async () =>
     await axios.get(`${process.env.REACT_APP_BACKEND_URL}article-categories`, {
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
 console.log(blogArticlesData?.data?.data)
  return (
    <div>
    <div className='max-w-6xl mx-auto p-3 flex flex-col space-y-2 pt-24'>
      {blogPageData.isFetched ? (
        <div className=' grid grid-cols-1 md:grid-cols-12 gap-3 py-3  '>

       {blogPageData?.data?.data?.data?.articles.slice(0,1).map((item)=>(

        <div onClick={() => {navigate(`/blog-details/${item?.id}`)}}
        className='md:col-span-7 '>
           <div className='relative flex flex-col cursor-pointer '>
              <img src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="" 
              className='h-[200px] md:h-[277px] md:max-h-[277px] w-[691px] object-cover rounded-sm hover:scale-105  flex-grow' />
              <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80  rounded-sm'></div>
              <div className='absolute bottom-0 p-3 flex flex-col space-y-1'>
                  <div className='bg-[#00a69c] p-[2px] px-2 rounded-md w-max  '>
                    <h1 className=' text-white font-medium text-[13px]'>{isAmh ? item?.article_category?.nameAm : item?.article_category?.name}</h1>
                  </div>
                  <h1 className='font-medium  sm:text-xl  text-white'>{item?.title}</h1>
              </div>
           </div>
        </div>
       ))}

<div className='md:col-span-5 gap-[6px] flex flex-col space-y-[8px]'>
<div className='grid grid-cols-2 gap-1'>
{blogPageData?.data?.data?.data?.articles.slice(1,2).map((item)=>(
  <div  onClick={() => {navigate(`/blog-details/${item?.id}`)}}
  className='col-span-2 flex relative rounded-md cursor-pointer '>
           <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL +item?.image} alt="category image" 
           className='w-full h-[177px] max-h-[177px] object-cover rounded-sm  ' />
           <div className='absolute  inset-0 bg-gradient-to-t from-black to-transparent opacity-80  rounded-sm'></div>
           <div className='absolute bottom-0 p-3 flex flex-col space-y-1'>
                  <div className='bg-[#00a69c] p-[2px]  px-2 rounded-md w-max  '>
                    <h1 className=' text-white font-medium text-[13px]'>{isAmh ? item?.article_category?.nameAm : item?.article_category?.name}</h1>
                  </div>
                  <h1 className='font-medium  sm:text-xl  text-white'>{item?.title}</h1>
              </div>
        
        </div>
        ))}
        </div>
<div className='col-span-2 grid grid-cols-2 gap-2 '>
       {blogPageData?.data?.data?.data?.articles.slice(2,4).map((item)=>(
          <div  onClick={() => {navigate(`/blog-details/${item?.id}`)}}
         className='relative flex flex-grow cursor-pointer'>
            <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="category image" 
            className='h-[86px]  max-h-[86px]  w-full object-cover rounded-sm' />
              
              <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80  rounded-sm'></div>
              <div className='absolute bottom-0 p-3 flex flex-col space-y-1'>
                  <div className='bg-[#00a69c] p-[2px]  px-2 rounded-md w-max  '>
                    <h1 className=' text-white font-medium text-[13px]'>{isAmh ? item?.article_category?.nameAm : item?.article_category?.name}</h1>
                  </div>
                  <h1 className='font-medium  sm:text-xl  text-white line-clamp-1'>{item?.title}</h1>
              </div>
         
          </div> 
       ))}
</div>
</div>

   </div>
):(
  <Center w={200}>
        <Spinner />
       </Center>
)}
      </div>

      {/*second  */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col space-y-2'>
       <h1 className='font-bold text-2xl '>Articles</h1>
    <div className=' grid grid-cols-1 md:grid-cols-12  gap-3 '>
      <div className='md:col-span-8 w-full  flex flex-col space-y-3 '>
      {blogArticlesData.isFetched ?(
        blogArticlesData?.data?.data?.data?.articles?.map((item)=>(
     <div onClick={() => {navigate(`/blog-details/${item.id}`)}}
     className='h-[118px] flex items-start bg-white rounded-md cursor-pointer'>
              <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="category image" 
              className=' w-[150px] sm:w-[200px] sm:max-w-[200px] h-full object-cover rounded-l-md hover:opacity-80' />
                <div className='p-3 flex flex-col space-y-2'>
                <h1 className=' text-[#000] font-medium text-sm md:text-xl  hover:text-[#00a69c]'>{isAmh ?item.titleAm : item.title} </h1>
                 <div className='flex items-center space-x-2'>
                 <h1 className='font-regular text-gray text-[13px] text-gray-400 '>oct, 23, 2020</h1>
                 <h1 className='font-regular text-gray text-[13px] text-gray-400 '>2 Min to read </h1> 
                 </div>
                </div>
           
            </div> 
        ))
      ):(
        <Center w={200}>
        <Spinner />
       </Center>
      )}
      </div>
    
    {/* categories */}
    <div className='md:col-span-4 h-[400px] max-h-[400px] overflow-y-scroll scrollbar-hide hidden:md-flex flex-col  bg-white shadow-xl space-y-2'>
     <h1 className='font-semibold text-xl bg-stone-900 text-white p-2 rounded-b-lg'>Topics</h1>
    <div className='  flex flex-col flex-grow w-full space-y-2  p-2'>
       {blogCategorys.isFetched ?(
        blogCategorys?.data?.data?.data.map((item)=>(
      <div onClick={()=>setBlogCategory(item.id)}
      className='flex items-center w-full bg-white shadow-sm  rounded-md cursor-pointer'>
              <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item.image} alt="topic image" 
              className=' w-[100px] h-20 object-cover rounded-l-md ' />
                <div>
                  <div className='flex flex-col items-start pt-2 px-3 space-y-2'>
                 <h1 className=' text-black font-medium text-xl '>{isAmh ?item.nameAm : item.name} </h1>
                <p className='line-clamp-2 text-sm text-gray-400'>ቆጣሪ ከእኩለ ሌሊት በኋላ 7 ደቂቃ ነበር። ውሻው ከወይዘሮ ሺርስ ቤት ፊት ለፊት ባለው የሣር ሜዳ መካከል ባለው ሣር ላይ ተኝቷል። አይኖቹ ተዘግተው ነበር።</p>
                  </div>
                </div>
           </div> 

   ))


       ):(

        <Center w={200}>
        <Spinner />
       </Center>

       )}
   
    </div>
    </div>
    </div>
              </div>
    </div>
  )
}

export default BlogPage