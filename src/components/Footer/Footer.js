import React, { useContext, useState,useEffect } from "react";
import Logo from "../../assets/Asset 1.svg";
import {AiFillFacebook,AiFillTwitterSquare,AiFillInstagram,AiFillLinkedin} from 'react-icons/ai'
import go from "../../assets/go.jpg";
import {Link} from 'react-router-dom'
import TermsModal from './components/TermsModal'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import { useAuth } from "../../context/auth";
import { useHome } from "../../context/HomeContext";
import {Spinner,Center} from "@chakra-ui/react";
import axios from "axios";
export const Footer = () => {
  const { Category, setCategory, User,URL ,setVacancyId,vacancyId } = useHome();
  const { isAmh } = useContext(LangContext);
  const [isOpen,setIsOpen]=useState(false)
  const { token,user,logout } = useAuth();
  const navigate = useNavigate();
  const onClose=()=>{
    setIsOpen(false)
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
  
  return (
    <div className="pt-20">
    <div className='bg-[#00a69c]'>
      <div className='max-w-6xl   items-start text-center justify-center gap-7 text-md
         mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 font-medium p-5 md:p-10'>
        <div className=' flex flex-col justify-start items-start space-y-3'>
        <img src={Logo} alt=""  className='h-16 '/>
         </div>
        <div className=' flex flex-col justify-start items-start space-y-2 text-gray-100' >
          <h1 className="font-bold">{isAmh ? 'ፈጣን ማገናኛዎች':'Quick links'}</h1>
        <Link to='/' className='hover:underline text-sm '>{isAmh ? "ቤት" : "Home"}</Link>
          <Link to='/' className='hover:underline text-sm '>{isAmh ? 'ብሎጎች':'Blogs'}</Link>
          <Link to='/' className='hover:underline text-sm '> {isAmh ? "ስኮላርሺፕ" : "Scholarships"}</Link>
          
        </div>
        {/* journey */}
        <div className=' flex flex-col justify-start items-start space-y-2 text-gray-100'>
          <h1 className="font-semibold">{isAmh ? "ሁሉም የጉዞ" : "All Journey's"}</h1>
        {categoriesData?.isFetched ? (
         categoriesData?.data?.data?.data.map((data) => (
                <div className="" key={data.id}>
                  <h1  onClick={() => {setCategory(data?.id);
                                   navigate("/allJourneys")}}
                  className="text-sm cursor-pointer hover:underline">
                  {isAmh
                    ? data?.nameAm
                      ? data?.nameAm
                      : "ያልተገለጸ ጽሑፍ"
                    : data?.name}
                  </h1>
                 </div>
              ))
          
        ) : (
          <Center w={200}>
            <Spinner />
          </Center>
        )}

        </div>
        <div className=' flex flex-col justify-start items-start space-y-3'>
          <h1 className="font-semibold text-gray-100">{isAmh ?'ስራዎች' : 'Vacancies'}</h1>
          <div className=' flex flex-col justify-start items-start space-y-2 text-gray-100'>
          <h1 onClick={() => {navigate("/vacancies");setVacancyId(3)}} className="text-sm cursor-pointer hover:underline">{isAmh ?'አካውንቲንግ እና ፋይናንስ' : 'Accounting and Finance'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(4)}}  className="text-sm  cursor-pointer hover:underline">{isAmh? 'ምህንድስና':'Engineering'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(20)}}  className="text-sm  cursor-pointer hover:underline">{isAmh? 'ሆቴል እና መስተንግዶ':'Hotel and Hospitality'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(32)}}  className="text-sm  cursor-pointer hover:underline">{isAmh? 'ኢንፎርሜሽን ቴክኖሎጂ':'Information Technology'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(6)}}  className="text-sm  cursor-pointer hover:underline">Management</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(19)}} className="text-sm  cursor-pointer hover:underline">{isAmh? 'የጤና ጥበቃ':'Health Care'}</h1>
                <h1 onClick={() => {navigate("/vacancies");setVacancyId(null)}} className="text-sm  cursor-pointer hover:underline">{isAmh? 'ሁሉም':'Browse All'}</h1>
              
          </div>
        </div>
        <div className='space-y-2 flex flex-col  justify-start items-start text-start'>
        <h1 className="font-semibold text-gray-100">Mobile</h1>
        <img src={go} alt="" className='h-12  cursor-pointer' />
    
        </div>
        
        </div>
      
      <div className="pb-5 max-w-6xl mx-auto border-t border-white grid grid-cols-1 sm:grid-cols-3 p-2 gap-2">
        <div className="flex  items-center justify-center  text-gray-200">
          <h1 className="font-medium">2022 <span className="font-bold">{isAmh ? "ሰልፍ ጆርኒ" : "Self Journey"}</span> <span> {isAmh ? "የተሰራው" : "Made by"}</span>Jaktech</h1>
      </div>
        <div className="flex  items-center justify-center space-x-3 text-gray-200">
          <h1 onClick={()=>setIsOpen(true)}
          className="font-semibold hover:underline cursor-pointer text-sm">{isAmh ? "ውሎች እና ሁኔታዎች" : "Terms & Conditions"}</h1>
          <h1 
          className="font-semibold hover:underline cursor-pointer text-sm">{isAmh ? "የግላዊነት ፖሊሲ" : "Privacy policy"}</h1>
        </div>
        <div className="flex  items-center justify-center ">
  <AiFillFacebook size={30} className='text-white hover:animate-bounce cursor-pointer'
   onClick={() =>
    window
      .open("https://www.facebook.com/Jaktechethiopia", "_blank")
      ?.focus()
  }
  />
 
{/* <AiFillTwitterSquare size={30} className='text-white hover:animate-bounce'/> */}
 <AiFillInstagram size={30} className='text-white hover:animate-bounce cursor-pointer'
  onClick={() =>
    window
      .open("https://www.instagram.com/jaktechethiopia/", "_blank")
      ?.focus()
  }
 />
 <AiFillLinkedin size={30} className='text-white hover:animate-bounce cursor-pointer'
 onClick={() =>
  window
    .open("https://www.linkedin.com/company/jaktech/", "_blank")
    ?.focus()
}
 />
 </div>
      </div>
    </div>
    <TermsModal isOpen={isOpen} onClose={onClose}/>
           </div>
  )
}

export default Footer
