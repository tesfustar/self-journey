import React,{useState,useContext,useEffect} from 'react'
import {Spinner,Center,Button} from "@chakra-ui/react";
import {motion} from 'framer-motion'
import { Outlet, useLocation, useNavigate ,Link} from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import {useQuery} from 'react-query'
import axios from 'axios';
import parse from 'html-react-parser';
import { useAuth } from "../../context/auth";
import { useHome } from "../../context/HomeContext";
import {BiChevronRight,BiChevronUp} from 'react-icons/bi'
import Banner from './components/Banner'
import SpinnerLoader from '../../utils/SpinnerLoader';
const HomePage = () => {
  const { isAmh, changeLang } = useContext(LangContext);
   const navigate = useNavigate();
   const { Category, setCategory, User,recomendedData,setRecomendedData } = useHome();
   const { token,user } = useAuth();
   const Vacancies = useQuery(`VacanciesApi`,async () =>
      await axios.get('https://hulum.et/hulum2/api/home-page'),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res) => {},
    }
  );
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

  const blogData = useQuery(
    "blogDataApi",
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}view-scholarships-and-articles`, {
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


  // recomended journey
  const RecomendedJourneyData = useQuery(
    `SelectedJourneyDataApi${Category}`,
      async () =>
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}homepage`, {
          headers,
        }),
      {
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!token,
        onSuccess: (res) => {
          setRecomendedData(res?.data?.data);
        },
      }
    );
    console.log(  blogData?.data?.data?.data?.scholarships[0]?.article_category_id)
  return (
    <>
    <div className='max-w-6xl mx-auto '>
      <Banner />
      <div className='max-w-6xl mx-auto  flex flex-col items-start  pt-10  '>
          <h3 className="text-xl md:text-2xl font-bold text-black px-3 sm:px-0">{isAmh ? 'ምድቦች':'Categories'}</h3>
         
        </div> 
          <div className=' sm:max-w-6xl sm:mx-auto m-2 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4'>
          {categoriesData?.isFetched ? (
          categoriesData?.data?.data?.data.map((item) =>{
            return (
              <motion.div
              initial={{ scale: 0,opacity:0 }}
              animate={{ scale: 1,opacity:1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration:2,
              
              }}
              whileHover={{
                scale: 1.07,
                transition: { duration: 0.3 },
              }}  
              whileTap={{ scale: 0.5 }}
              key={item.id}
              onClick={() => {
                setCategory(item?.id);
                navigate("/allJourneys");
              }} className='flex flex-col space-y-2 md:flex-row  group items-center bg-white hover:bg-[#00a69c] 
              transition duration-300 ease-in-out shadow-md rounded-md cursor-pointer'>
              <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="category image" 
              className=' w-full md:w-28 h-24 max-h-24 object-contain rounded-lg p-1' />
             <h1  className=' text-black group-hover:text-white font-medium text-sm py-1  md:text-lg lg:text-xl px-3'> {isAmh
              ? item?.nameAm
              ? item?.nameAm
              : "ያልተገለጸ ጽሑፍ"
              : item?.name}</h1>
           
            </motion.div>
            )
          })
        ) : (
          <SpinnerLoader />
        )}
          </div>
   
       {RecomendedJourneyData?.data?.data?.data.length !== 0 && 
        <>
       <div className='max-w-6xl mx-auto  flex flex-col items-start  pt-10 my-2 '>
          <h3 className="text-xl md:text-2xl font-bold text-black px-3 sm:px-0">{isAmh ? 'የሚመከር':'Recomended'}</h3>
         </div> 
          <div className=' sm:max-w-6xl sm:mx-auto m-2 grid grid-cols-1
           sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {RecomendedJourneyData?.isFetched &&  (recomendedData?.length !== 0 || !RecomendedJourneyData?.isSuccess) ? (
           RecomendedJourneyData?.data?.data?.data?.map((item, index) => {
            return (
            <motion.div 
            initial={{x:'-100vw'}}
            animate={{x:0}}
             transition={{ duration:0.5}}
             
            key={index} className='bg-white shadow-md p-2 rounded-lg'>
                <img src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}${item?.image}`}
                 alt=""  className="h-44 max-h-44 w-full object-cover  rounded-lg"/>
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
        className="border border-[#00a69c] text-[#00a69c] hover:bg-[#00a69c] hover:border-none transition-all duration-500 ease-in-out hover:text-white rounded-md font-medium w-full p-2   mt-5 "
        onClick={() => navigate("/journey", { state: item?.id })}
        >
        {isAmh ? "ጀምር" : "Start"}
      </button>
            </motion.div>
        );
      })
        ) : (
          <SpinnerLoader />
        )}
          </div>
          </>
          }

        {/* vacancies */}
        <div className='max-w-6xl mx-auto pt-10'>
        <div className=' flex -items-center justify-between pt-3 m-2 '>
          <h3 className="text-xl md:text-2xl font-bold text-black px-3 sm:px-0">{isAmh ?'ስራዎች':'Vacancies'}</h3>
          <Link to='/vacancies'>
            <div className='flex items-center hover:opacity-70'>
            <h6 className='text-sm  font-medium cursor-pointer text-[#16A4D3]' >{isAmh ? 'ሁሉም ይዩ' :'Browse All'}</h6>
            <BiChevronRight size={25} className='text-[#16A4D3]'/>
            </div>
          </Link>
          
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 m-2'>
        {Vacancies?.isFetched ? (
           Vacancies?.data?.data?.map((item)=>(
            <div key={item.id} className="relative pb-16  flex flex-col flex-grow  p-3 rounded-md bg-white
            shadow-md border border-gray-300 space-y-2">
              <div className='flex items-start space-x-1'>
            
              <span className='font-bold line-clamp-1'>{item.title}</span>
              </div>
              <div className='flex items-center'>
                {/* <h1 className='font-medium text-gray '>job description:</h1> */}
              <span className='font-regular line-clamp-3 '>{parse(isAmh ? item.description_am?.replaceAll("<pre>","<p>")?.replaceAll("</pre>","</p>") :item.description)}</span>
              </div>
            
             {/* <h1 className='text-semibold text-gray text-md'>title: <span className='font-medium'>{item.title}</span></h1> */}
              <div className='absolute bottom-2 flex items-start  float-left pt-6'>
              {/* <h1 className='text-semibold text-gray text-md'>location: <span className='font-medium'>{item.location}</span></h1> */}
              <Link to={`/vacancy-details/${item?.id}`} className="flex flex-grow ">
                      <button className='bg-[#00a69c]  p-1 px-3 font-medium text-white rounded-md hover:opacity-70'>{isAmh ?  "ዝርዝር እይታ" :'View detail'}</button>
                      </Link>
              </div>
            </div>
          ))
        ):(
          <SpinnerLoader />
        )}
       
         
        </div>
        </div>
        </div>
        <div className='bg-white  mt-5 '>

       
        {/* blogs */}
        <div className='max-w-6xl mx-auto py-3'>
        <div className=' flex -items-center justify-between p-3 " '>
          <h3 className="text-xl md:text-2xl font-bold text-black sm:px-0 flex-grow-0">Scholarships</h3>
          {/* <div className="outline-1  outline-black  flex-grow ">5</div> */}
          <Link to={`/blog/scholarship/${ blogData?.data?.data?.data?.scholarships[0]?.article_category_id}`}>
            <div className='flex items-center hover:opacity-70 '>
            <h6 className='text-sm font-medium cursor-pointer text-[#16A4D3]' >{isAmh ? 'ሁሉም ይዩ' :'Browse All'}</h6>
            <BiChevronRight size={25} className='text-[#16A4D3]'/>
            </div>
          </Link>
          
        </div>
          {/* body */}
          <div className='px-3 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4'>
          {blogData?.isFetched ? (
           blogData?.data?.data?.data?.scholarships?.map((item) =>{
            return (
              <Link to={`/blog-details/${item.id}`}>
              <div  
             className='flex  items-start bg-white rounded-md cursor-pointer'>
              <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="category image" 
              className=' flex flex-grow object-cover w-44  h-32 max-h-32 md:w-full md:h-full  ' />
            <div className=' p-3 w-full flex flex-col space-y-1'>

            <h1 className='font-bold text-sm line-clamp-4'>{isAmh ? item.titleAm : item.title}</h1>
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
        
        {/* articles */}
      
         <div className=''>
         <div className=' flex items-center justify-between  p-3'>
          <h3 className="text-xl md:text-2xl font-bold text-black ">Articles</h3>
          <Link to='/blog'>
            <div className='flex items-center hover:opacity-70'>
            <h6 className='text-sm  font-medium cursor-pointer text-[#16A4D3]' >{isAmh ? 'ሁሉም ይዩ' :'Browse All'}</h6>
            <BiChevronRight size={25} className='text-[#16A4D3]'/>
            </div>
          </Link>
         </div>
          {/* body */}
          <div className='px-3 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4'>
          {blogData?.isFetched ? (
           blogData?.data?.data?.data?.articles?.map((item) =>{
            return (
              <Link to={`/blog-details/${item.id}`}>
              <div  
           className='flex  items-start bg-white rounded-md cursor-pointer'>
              <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="category image" 
              className=' flex flex-grow object-cover w-44  h-32 max-h-32 md:w-full md:h-full  '  />
             <div className=' p-3 w-full flex flex-col space-y-1'>

            <h1 className='font-bold text-sm line-clamp-4'>{isAmh ? item.titleAm : item.title}</h1>
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
        </div>
        </div>
        </>
  )
}

export default HomePage