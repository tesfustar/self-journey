import React,{useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import useValidPhone from "../../hook/useValidPhone";
import { useAuth } from "../../context/auth";
import {useToast,Checkbox } from '@chakra-ui/react'
import {FormControl,FormLabel,Stack,PinInput ,PinInputField ,HStack,
  InputGroup,InputLeftAddon,Input,Spinner} from "@chakra-ui/react";
import {AiOutlineCheckCircle} from 'react-icons/ai'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Logo from "../../assets/art1.png";
import path4 from "../../assets/Path4.png";
import path40 from "../../assets/Path40.png";
import banner from "../../assets/land01.jpg";
import LoginModal from './components/LoginModal';
const Sample = () => {
    const [phone, setPhone, PhoneError] = useValidPhone();
    const [Register, setRegister] = useState(false);
    const [Agree, setAgree] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [hasPhone, sethasPhone] = useState(false);
    const [Code, setCode] = useState("");
    const toast = useToast();
    const navigate = useNavigate()
    const { login } = useAuth();
    const { isAmh, changeLang } = useContext(LangContext);
    const [isModalOpen,setIsModalOpen] = useState(false)
  
    const handleModal=()=>{
      setIsModalOpen(!isModalOpen)
    }
    
  
    const datas=[{id:1,img:banner,title:'All categories'},
    {id:2,img:banner,title:'All categories'},
    {id:3,img:banner,title:'All categories'},
    {id:4,img:banner,title:'All categories'},
  ]
  return (
    <div>
        <Navbar />
        <div className='relative'>
        <img src={Logo} alt="" className="h-[600px] lg:h-auto  w-full  object-contain " />  
        <div className=" absolute px-3 sm:px-14 md:px-6 lg:px-24 2xl:px-40 
          top-1/4 md:top-1/3 flex flex-col items-start">
        <div className='max-w-xl md:max-w-sm lg:max-w-xl flex flex-col items-start justify-start  space-y-2 px-2 sm:px-0'>
         <h1 className="font-bold text-stone-900 text-3xl sm:text-3xl lg:text-6xl ">
        Discover countless Practical <span className="text-amber-500">Journeys.</span></h1>
       <p className='font-md text-black text-sm'>Continue your self-development journey without putting your life on hold .
       </p>
       <button onClick={handleModal}
       className='bg-[#00a69c] p-2 px-3 text-white font-medium rounded-md'>
        Get Started
       </button>
        </div>
        </div>
        </div>

         {/* second */}
      <div>
       <div className='flex items-center justify-center  lg:pt-20'>
        <h1 className='font-bold text-3xl md:text-5xl text-black'>Discover Lifelong
        <span className='text-[#f16a34]'> Journey</span></h1>
      
       </div>

        <div className="flex items-center max-w-6xl ml-auto p-3 sm:pr-10
         space-x-4 pt-10 overflow-x-scroll scrollbar-hide">
        {datas.map((item)=>(
           <div onClick={handleModal}
           className='flex flex-shrink-0   flex-grow  flex-col items-center
            bg-white shadow-lg p-1 cursor-pointer '>
            <img src={item.img} alt="" className="h-36 max-h-44 w-full  object-cover rounded-lg" />
            <p className='font-sm text-black font-medium'>{item.title}</p>
           </div>
         ))}

        </div>
     </div>
     {/* third */}
     <div className='max-w-5xl mx-auto'>
     <div className='flex flex-col space-y-2 items-center justify-center pt-20'>
        <h1 className='font-bold text-2xl xl:text-5xl md:text-4xl text-center text-black'>A fresh method of gaining practical.
        <span className='text-[#90BF3E]'> experience</span></h1>
      <p className='max-w-xl text[13px] sm:text-sm text-center  text-[#949494]'>Continue your self-development journey without putting your life on hold. The self journey can assist you in finding inspiration that fits your routine.</p>
       </div>

       <div className='grid grid-cols-1 md:grid-cols-2 pt-10 gap-5 items-center justify-center p-3'>
         <div className='h-64  flex items-center justify-center flex-grow'>
         <img src={banner} alt="" className="h-full w-full  object-cover  rounded-lg" />
         </div>
         <div className='flex flex-col items-start space-y-3'>
          <h2 className='font-bold text-2xl md:text-3xl'>Gain practical skills while maintaining accountability and structure.</h2>
          <p className='text-[#949494] text-sm max-w-md'>Continue your self-development journey without putting your life on hold. The self journey can assist you in finding inspiration that fits your routine Continue your self-development journey without putting your life on hold. The self journey can assist you in finding inspiration that fits your routine.</p>
         </div>
       </div>
     </div>

     {/* how it works */}
     <div className="pt-20">
      <h1 className='text-center p-3 font-bold text-4xl'>How It Works</h1>
      <div className='relative'>
        <div className='absolute top-10 w-full h-24  '>
          <img src={path4} alt="" className='w-full z-10'/>
        </div>
     <div className='z-50 pt-12 max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 p-3'>
        <div className='flex flex-col items-start space-y-2 border
         border-[#D9A529] bg-[#F1F1F1] p-4 rounded-lg'>
          <img src={banner} alt="" className='rounded-full w-20 h-20' />
          <h1 className='font-bold text-lg'>Real Productivity: How to Build Habits</h1>
          <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
        <div className='pl-1 flex flex-col items-start space-y-2'>
           <div className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
           <div  className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
           <div  className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
        </div>
        </div>
        {/* second */}
        <div className='flex flex-col items-start space-y-2 border
         border-[#90BF3E] bg-[#F1F1F1] p-4 rounded-lg'>
          <img src={banner} alt="" className='rounded-full w-20 h-20'  />
          <h1 className='font-bold text-lg'>Real Productivity: How to Build Habits</h1>
          <p className='text-sm'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
        <div className='pl-1 flex flex-col items-start space-y-2'>
           <div className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
           <div  className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
           <div  className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
        </div>
        </div>
        {/* third */}
        <div className='flex flex-col items-start space-y-2 border
         border-[#F16A37] bg-[#F1F1F1] p-4 rounded-lg'>
          <img src={banner} alt="" className='rounded-full w-20 h-20' />
          <h1 className='font-bold text-lg'>Real Productivity: How to Build Habits</h1>
          <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
        <div className='pl-1 flex flex-col items-start space-y-2'>
           <div className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
           <div  className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
           <div  className='flex items-start space-x-1 '>
            <AiOutlineCheckCircle size={25}/>
            <p className='text-[13px]'>Our virtual experiences teach you the fundamentals of the most employable roles in 30 days.</p>
           </div>
        </div>
        </div>
      </div>
      </div>
    
     </div>
     </div>
     {/* Why Us? */}
     <div className='pt-12 max-w-5xl mx-auto'>
      <h1 className='text-center p-3 font-bold text-4xl'>Why Us</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 pt-5 gap-5 p-2'>
         <div className='flex flex-col items-start space-y-3 max-w-md'>
          <h2 className='font-bold text-2xl md:text-3xl'>Gain practical skills while maintaining accountability and structure.</h2>
          <p className='text-[#949494] text-sm'>Continue your self-development journey without putting your life on hold. The self journey can assist you in finding inspiration that fits your routine Continue your self-development journey without putting your life on hold. The self journey can assist you in finding inspiration that fits your routine.</p>
         </div>
         <div className='h-64  '>
         <img src={banner} alt="" className="h-full w-full  object-cover  rounded-lg" />
         </div>
       </div>
     </div>
    
    {/* What Will You Discover? */}
    <div className='bg-[#00a69c] sm:max-w-6xl sm:ml-auto py-5 my-10 rounded-l-2xl mb-10 m-3'>
      <div className='max-w-[560px] text-center mx-auto pb-10
      flex flex-col items-center justify-center sm:space-y-1 text-white'>
     <h1 className='text-center p-3 font-bold text-2xl md:text-4xl'>What Will You Discover?</h1>
     <p className='text-sm px-2'>Discover new talents, develop current passions, and lose yourself in your inner journey. The information you uncover may astound and motivate you.</p>
     </div>

       <div className='relative '>
       <div className='absolute top-44 w-full h-10'>
        <img src={path40} alt="" className='w-full'/>
       </div>
       <div className='text-white grid grid-cols-1 md:grid-cols-3 gap-2 relative p-4  gap-y-16'>
         <div className='flex flex-col items-center justify-center space-y-2 text-center'>
           <img src={banner} alt="" className='w-12 h-12 rounded-full'/>
           <h1 className='font-bold text-lg'>Education</h1>
           <p className='sm:px-10 text-[13px]'>Discover new talents, develop current passions, and lose yourself in your inner journey. The information you uncover may astound and motivate you.</p>
         </div>
         <div className='top-5 flex flex-col items-center justify-center space-y-2 text-center'>
           <img src={banner} alt="" className='w-12 h-12 rounded-full'/>
           <h1 className='font-bold text-lg'>Education</h1>
           <p className='sm:sm:px-10 text-[13px]'>Discover new talents, develop current passions, and lose yourself in your inner journey. The information you uncover may astound and motivate you.</p>
         </div>
         <div className='flex flex-col items-center justify-center space-y-2 text-center'>
           <img src={banner} alt="" className='w-12 h-12 rounded-full'/>
           <h1 className='font-bold text-lg'>Education</h1>
           <p className='sm:px-10 text-[13px]'>Discover new talents, develop current passions, and lose yourself in your inner journey. The information you uncover may astound and motivate you.</p>
         </div>
         <div className='flex flex-col items-center justify-center space-y-2 text-center'>
           <img src={banner} alt="" className='w-12 h-12 rounded-full'/>
           <h1 className='font-bold text-lg'>Education</h1>
           <p className='sm:px-10 text-[13px]'>Discover new talents, develop current passions, and lose yourself in your inner journey. The information you uncover may astound and motivate you.</p>
         </div>
         <div className='flex flex-col items-center justify-center space-y-2 text-center'>
           <img src={banner} alt="" className='w-12 h-12 rounded-full'/>
           <h1 className='font-bold text-lg'>Education</h1>
           <p className='sm:px-10 text-[13px]'>Discover new talents, develop current passions, and lose yourself in your inner journey. The information you uncover may astound and motivate you.</p>
         </div>
         <div className='flex flex-col items-center justify-center space-y-2 text-center'>
           <img src={banner} alt="" className='w-12 h-12 rounded-full'/>
           <h1 className='font-bold text-lg'>Education</h1>
           <p className='sm:px-10 text-[13px]'>Discover new talents, develop current passions, and lose yourself in your inner journey. The information you uncover may astound and motivate you.</p>
         </div>
       </div>
       </div>
      
    </div>
     <Footer />
     <LoginModal isModalOpen={isModalOpen} handleModal={handleModal}/>
    </div>
  )
}

export default Sample