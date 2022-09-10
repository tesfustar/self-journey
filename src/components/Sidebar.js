import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button
  } from '@chakra-ui/react'
  import React, { useContext, useState,useEffect } from "react";
import { NavLink ,Link} from 'react-router-dom';
import Logo from "../assets/Self journey logo/Self journey horizontal.svg";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../context/LangContext";
import { useAuth } from "../context/auth";
import { useHome } from "../context/HomeContext";
import axios from "axios";
import {FaBars} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'
import {TiInputChecked} from 'react-icons/ti'
import {Spinner,Center} from "@chakra-ui/react";
import {BiChevronDown,BiChevronUp} from 'react-icons/bi'
const Sidebar = ({isOpen,onClose,setIsOpen}) => {
    const navigate = useNavigate();
    const { Category, setCategory, User,URL ,setVacancyId,vacancyId } = useHome();
    const { isAmh ,changeLang} = useContext(LangContext);
    const { token,user,logout } = useAuth();
    const [showJourney,setShowJourney]=useState(false)
    const [showVacancy,setShowVacancy]=useState(false)
    const [showBlog,setShowBlog]=useState(false)
    const handleShowJourney=()=>{
        setShowJourney(prevshowJourney=>!prevshowJourney)
      }
      const handleShowVacancy=()=>{
         setShowVacancy(prevShowVacancy=>!prevShowVacancy)
      }
      const handleShowBlog=()=>{
        setShowBlog(prevShowBlog=>!prevShowBlog)
     }
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
      
        const blogCategory = useQuery(
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
  return (
    <>
    
      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton onClick={onClose}/>
          <DrawerHeader borderBottomWidth='1px'>
          <Link to='/home'>
         <img src={Logo} alt="" className='h-6'/>
        </Link>
          </DrawerHeader>
          <DrawerBody>
          <div className='flex  flex-col items-start space-y-2 pb-5'>
          <Link to='/home' className='font-semibold ' onClick={onClose}>
        {isAmh ? "ቤት" : "Home"}
         </Link>
         <Link  onClick={onClose}
         to={`/blog/scholarship/${ blogData?.data?.data?.data?.scholarships[0]?.article_category_id}`}  
         className='font-semibold '>
         {isAmh ? "ስኮላርሺፕ" : "Scholarships"}
         </Link>
          <div onClick={handleShowBlog} className="flex items-center justify-center space-x-1 cursor-pointer  hover:text-sky-500">
              <h1 className="font-semibold ">{isAmh ? 'ብሎጎች' :'Blogs' }</h1>
              {showBlog ?  <BiChevronUp size={25} /> : <BiChevronDown size={25} /> }
            </div>
         {showBlog && <div className=' flex flex-col  space-y-2'>
          {blogCategory?.isFetched ? (
           <div className="flex flex-col">
             
            {blogCategory?.data?.data?.data.map((data) => (
               <div className="flex flex-col  space-y-3 pl-5" key={data.id}>
                 <h1  onClick={() => {setCategory(data?.id);
                                  navigate("/blog");setIsOpen(!isOpen)}}
                 className="font-medium text-sm cursor-pointer ">
                 {isAmh
                   ? data?.nameAm
                     ? data?.nameAm
                     : "ያልተገለጸ ጽሑፍ"
                   : data?.name}
                 </h1>
                </div>
             ))}
           </div>
       ) : (
         <Center w={200}>
           <Spinner />
         </Center>
       )}
         </div>}
         {/* vacancy */}
         <div className='flex  flex-col items-start'>
            <div onClick={handleShowJourney} className="flex items-center justify-center space-x-1 cursor-pointer pb-1 hover:text-sky-500">
              <h1 className="font-semibold ">{isAmh ? "ሁሉም የጉዞ" : "All Journey's"}</h1>
              {showJourney ?  <BiChevronUp size={25} /> : <BiChevronDown size={25} /> }
            </div>
         {showJourney &&  <div className='flex-col transition-all ease-out duration-300  '>
           {categoriesData?.isFetched ? (
           <div className="flex flex-col">
              
             {categoriesData?.data?.data?.data.map((data) => (
                <div className="flex flex-col  space-y-3 pl-5" key={data.id}>
                  <h1 className="font-medium text-sm cursor-pointer text-gray-800" onClick={() => {setCategory(data?.id);
                                   navigate("/allJourneys");setIsOpen(!isOpen)}}>
                  {isAmh
                    ? data?.nameAm
                      ? data?.nameAm
                      : "ያልተገለጸ ጽሑፍ"
                    : data?.name}
                  </h1>
                 </div>
              ))}
            </div>
        ) : (
          <Center w={200}>
            <Spinner />
          </Center>
        )}
          </div>}
        </div>
        {/* vacancy */}
        <div className='flex  flex-col items-start'>
            <div onClick={handleShowVacancy} className="flex items-center justify-center space-x-1 cursor-pointer hover:text-sky-500">
              <h1 className="font-semibold ">{isAmh ?'ስራዎች' : 'Vacancies'}</h1>
              {showVacancy ?  <BiChevronUp size={25} /> : <BiChevronDown size={25} /> }
            </div>
         {showVacancy &&  <div className='flex-col transition-all ease-out duration-300  '>
         <div className="flex flex-col space-y-3 pl-5">
         <h1 onClick={() => {navigate("/vacancies");setVacancyId(3);setIsOpen(!isOpen)}} className="font-medium cursor-pointer text-gray-800 text-sm ">{isAmh ?'አካውንቲንግ እና ፋይናንስ' : 'Accounting and Finance'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(4);setIsOpen(!isOpen)}}  className="font-medium text-gray-800 cursor-pointer text-sm ">{isAmh? 'ምህንድስና':'Engineering'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(20);setIsOpen(!isOpen)}}  className="font-medium text-gray-800 cursor-pointer text-sm ">{isAmh? 'ሆቴል እና መስተንግዶ':'Hotel and Hospitality'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(32);setIsOpen(!isOpen)}}  className="font-medium text-gray-800 cursor-pointer text-sm ">{isAmh? 'ኢንፎርሜሽን ቴክኖሎጂ':'Information Technology'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(6);setIsOpen(!isOpen)}} className="font-medium text-gray-800 cursor-pointer text-sm ">Engineering</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(19);setIsOpen(!isOpen)}}  className="font-medium text-gray-800 cursor-pointer text-sm ">Health Care</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(null);setIsOpen(!isOpen)}}  className="font-medium text-gray-800 cursor-pointer text-sm ">Browse All</h1>
              </div>
          </div>}
        </div>
       </div>
           
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar