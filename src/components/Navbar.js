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
import Sidebar from './Sidebar'
// import SpinnerLoader from '../../utils/SpinnerLoader';
import {BiChevronDown,BiChevronUp} from 'react-icons/bi'
const Navbar = ({toggle}) => {
    const navigate = useNavigate();
    const { Category, setCategory, User,URL ,setVacancyId,vacancyId } = useHome();
    const { isAmh ,changeLang} = useContext(LangContext);
    const { token,user,logout } = useAuth();
    const [isOpen,setIsOpen]=useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showJourneys,setShowJourneys]=useState(false)
    const handleShowJourneys=()=>{
      setShowJourneys(!showJourneys)
    }
    const handleResize=()=>{
      setWindowWidth(window.innerWidth)
    }
    useEffect(() => {
      window.addEventListener('resize',handleResize)
       if(window.innerWidth <=768){
        setIsOpen(false)
        setShowJourneys(false)
       }
    }, [windowWidth]);
    const onClose=()=>{
      setIsOpen(!isOpen)
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
        const style ="flex items-start space-x-1 py-1"
        console.log(showJourneys)
  return (
    <>
    <header className="relative top-0">
    <div className='fixed  z-40  w-full  p-3 '>
     <div className="max-w-6xl mx-auto flex  items-center justify-between p-3 sm:px-4 bg-white/50 rounded-md border-2 border-white">

     <Link to='/home'>
       <img src={Logo} alt="" className='h-8 sm:h-10'/>
     </Link>

     {/* right part */}
     <div className='flex items-center space-x-5 lg:space-x-10'>
     <Link to='/' className='hidden md:flex font-semibold hover:text-sky-500'>
     {isAmh ? "ቤት" : "Home"}
        </Link> 
        <Link  to={`/blog/scholarship/${ blogData?.data?.data?.data?.scholarships[0]?.article_category_id}`}  
        className='hidden md:flex font-semibold hover:text-sky-500'>
         {isAmh ? "ስኮላርሺፕ" : "Scholarships"}
         </Link>
            {/* vaccancy */}
       <div className='hidden md:flex  flex-col  items-center justify-center group'>
         <h1 className="font-semibold cursor-pointer hover:text-sky-500">{isAmh ?'ስራዎች' : 'Vacancies'}</h1>
         <div className='p-6 rounded-md absolute  bg-white shadow-lg top-14 z-50   hidden group-hover:flex group-hover:flex-col transition-all ease-out duration-300  '>
             <div className="grid grid-cols-2 gap-3 ">
             <div className="space-y-3">
               <h1 onClick={() => {navigate("/vacancies");setVacancyId(3)}} className="font-semibold cursor-pointer hover:text-sky-500">{isAmh ?'አካውንቲንግ እና ፋይናንስ' : 'Accounting and Finance'}</h1>
               <h1 onClick={() => {navigate("/vacancies");setVacancyId(4)}}  className="font-semibold cursor-pointer hover:text-sky-500">{isAmh? 'ምህንድስና':'Engineering'}</h1>
               <h1 onClick={() => {navigate("/vacancies");setVacancyId(20)}}  className="font-semibold cursor-pointer hover:text-sky-500">{isAmh? 'ሆቴል እና መስተንግዶ':'Hotel and Hospitality'}</h1>
               <h1 onClick={() => {navigate("/vacancies");setVacancyId(32)}}  className="font-semibold cursor-pointer hover:text-sky-500">{isAmh? 'ኢንፎርሜሽን ቴክኖሎጂ':'Information Technology'}</h1>
             </div>
             <div className="space-y-3">
               <h1 onClick={() => {navigate("/vacancies");setVacancyId(6)}}  className="font-semibold cursor-pointer hover:text-sky-500">Management</h1>
               <h1 onClick={() => {navigate("/vacancies");setVacancyId(19)}} className="font-semibold cursor-pointer hover:text-sky-500">{isAmh? 'የጤና ጥበቃ':'Health Care'}</h1>
               <h1 onClick={() => {navigate("/vacancies");setVacancyId(null)}} className="font-semibold cursor-pointer hover:text-sky-500">{isAmh? 'ሁሉም':'Browse All'}</h1>
             </div>
             </div>
         </div>
       </div>
          
        {/* alljourney */} 
     
      <div className=' hidden md:flex w-full flex-grow  flex-col items-center justify-center '>
        <div className={showJourneys ? `${style} border-b-2 border-[#00a69c]`:`${style}`} onClick={handleShowJourneys}>
        <h1 className="font-semibold cursor-pointer ">{isAmh ? "ሁሉም የጉዞ" : "All Journey's"}</h1>
        <BiChevronDown size={20} color={showJourneys? '#00a69c':'black'}/>
        </div>
   
         </div>
       {/* bolgs */}
       <div className='hidden md:flex  flex-col items-center justify-center group'>
         <h1 className="font-semibold cursor-pointer hover:text-sky-500">{isAmh ? 'ብሎጎች' :'Blogs' }</h1>
          <div className='p-6 rounded-md absolute  bg-white shadow-lg top-14 z-50   hidden group-hover:flex group-hover:flex-col transition-all ease-out duration-300  '>
          {blogCategory?.isFetched ? (
           <div className="grid grid-cols-2 gap-3">
             
            {blogCategory?.data?.data?.data.map((data) => (
               <div className="space-y-3" key={data.id}>
                 <h1  onClick={() => {setCategory(data?.id);
                                  navigate("/blog")}}
                 className="font-semibold cursor-pointer hover:text-sky-500">
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
         </div>
       </div>
     
         
         {/* setting */}
         <div className='flex   items-center justify-center  flex-col group'>
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
             
                   <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-2  rounded-md">
                   <img src="https://img.icons8.com/material-outlined/18/000000/unsubscribe.png" />
                 <h1 className="font-semibold ">{isAmh ? "ከደንበኝነት ምዝገባ ይውጡ" : "Unsubscribe"}</h1>
                   </div>
                   <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-2  rounded-md">
                   <img src="https://img.icons8.com/fluency-systems-filled/18/000000/exit.png" />
                   <h1     onClick={logout} className="font-semibold ">  {isAmh ? "ውጣ" : "Logout"}</h1>
                   </div>
                 </div>
                
                
                </div>
              
             </div>
         </div>
       </div>

       <div className='flex md:hidden cursor-pointer' onClick={onClose} >
         <FaBars size={25} className=' text-black mr-2 '/>
         </div>

       
          
     </div>
     </div>
    </div>
     
   </header>
   <Sidebar isOpen={isOpen} onClose={onClose} setIsOpen={setIsOpen}/>
    {showJourneys && <div className="absolute z-50  flex-grow p-5  w-full  top-16  flex items-center justify-center">
         <div className="bg-white shadow-md w-full">
         {categoriesData?.isFetched ? (
            <div className="flex flex-col items-center space-y-4">
             <h1 className='font-semibold text-2xl pb-2'>DISCOVER LIFE <span className="text-[#F16A37]">JOURNEYS!</span></h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
             
            {categoriesData?.data?.data?.data.map((data) => (
              <div className="flex items-start space-x-3  cursor-pointer hover:opacity-60" key={data.id} onClick={() => {setCategory(data?.id);navigate("/allJourneys"); setShowJourneys(!showJourneys)}}>
                <img src={process.env.REACT_APP_BACKEND_IMAGE_URL + data?.image}
                className=' w-full md:w-28 h-24 max-h-24 object-contain rounded-lg p-1'  />
                 <div className="flex flex-col space-y-2">

                 <h1  className="font-medium text-sm  ">
                 {isAmh
                   ? data?.nameAm
                   ? data?.nameAm
                   : "ያልተገለጸ ጽሑፍ"
                   : data?.name}
                 </h1>
                 <p className="text-[13px] max-w-sm w-[220px]">How to become a healthy good looking active person?</p>
                     </div>
                </div>
             ))}
             </div>
           </div>
       ) : (
         <Center w={200}>
           <Spinner />
         </Center>
       )}
         </div>
        </div>}
    </>
  )
}

export default Navbar