import React, { useContext, useState,useEffect } from "react";
// import { NavLink ,Link} from 'react-router-dom';
import Logo from "../../../assets/Self journey logo/Self journey horizontal.svg";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../../context/LangContext";
import { useAuth } from "../../../context/auth";
import { useHome } from "../../../context/HomeContext";
import axios from "axios";
import {FaBars} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'
import {TiInputChecked} from 'react-icons/ti'
import {Spinner,Center} from "@chakra-ui/react";
import {BiChevronDown,BiChevronUp} from 'react-icons/bi'
import { Link } from 'react-scroll'
const RegisterNav = ({toggle,handleModal}) => {
    const navigate = useNavigate();
    const { Category, setCategory, User,URL ,setVacancyId,vacancyId } = useHome();
    const { isAmh ,changeLang} = useContext(LangContext);
    const { token,user,logout } = useAuth();
    
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

    const categoriesData = useQuery(
      "categoriesDataApi",
      async () =>
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}login-page`, {
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
    const Journeys= useQuery(`LoginJourney`,async () =>
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}login-page`),
    {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    retry: false,
    
    onSuccess: (res) => {
      
    },
    }
    );
  return (
    <header  className="relative top-0">
    <div className='  fixed z-30  w-full p-3  sm:p-5 '>
     <div className="max-w-6xl mx-auto flex  items-center justify-between p-3
      sm:px-4 bg-white/50 rounded-md border-2 border-[#00a69c]">

     <div>
       <img src={Logo} alt="" className='h-8 sm:h-10'/>
     </div>
     {/* right part */}
     <div className='flex items-center space-x-7 sm:space-x-10'>
  
       
     <h1 onClick={()=>{navigate('/login')}} 
          className='hidden md:flex text-white font-medium p-[5px] px-5 cursor-pointer bg-[#00a69c] hover:scale-105 transition-all ease-in-out duration-300 rounded-md'>
         {isAmh ? "ግባ" : "Sign in"}
         </h1>
    
     
         <div className='flex pr-5   items-center justify-center  flex-col group'>
         <AiFillSetting size={20} className="cursor-pointer"/>
         <div className='p-6 rounded-md absolute bg-white shadow-lg top-16 z-50   hidden group-hover:flex group-hover:flex-col transition-all ease-out duration-300  '>
             
             <div className="space-y-3 ">
               <h1 className="font-medium ">{isAmh ? "Language" : "ቋንቋ"}</h1>
                <div className="grid grid-cols-1 gap-3">
                <div className="space x-1 ">
                 <div className="flex items-center space-x-1 cursor-pointer pb-1" onClick={() => {changeLang(false)}}>
                 <TiInputChecked size={20} className={!isAmh ? "text-blue-500" :"text-gray-200"}/>
                 <h1 className="font-semibold ">English</h1>
                 </div>
                 <div className="flex items-center space-x-1 cursor-pointer" onClick={() =>{changeLang(true)}}>
                 <TiInputChecked size={20} className={isAmh ? "text-blue-500" :"text-gray-200"}/>
                  <h1  className="font-semibold">አማርኛ</h1>
                 </div>
             
                
                  
                 </div>
                
                
                </div>
              
             </div>
         </div>
       </div>
         



       
          
     </div>
     </div>
    </div>
     
   </header>
  )
}

export default RegisterNav