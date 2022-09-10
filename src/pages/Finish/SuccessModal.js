import React, { Fragment,useContext,useState ,useEffect} from "react";
import { Dialog, Transition } from '@headlessui/react'
import {FormControl,FormLabel,Stack,PinInput ,PinInputField ,HStack,
  InputGroup,InputLeftAddon,Input,Spinner} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import {useToast,Checkbox } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import { useAuth } from "../../context/auth";
import useValidPhone from "../../hook/useValidPhone";
import { useHome } from "../../context/HomeContext";
import Login from "../../assets/login.png";
import Success from "../../assets/success.png";
import {FaTimes} from 'react-icons/fa'
const SuccessModal = () => {
  const navigate =useNavigate()
    const [isSuccessModalOpen,setIsSuccessModalOpen]=useState(true)
    const handleModal=()=>{
      setIsSuccessModalOpen(false)
    }
  return (
    <div>
         <Transition appear show={isSuccessModalOpen} as={Fragment}>
    <Dialog as="div" className=" relative z-50 " onClose={handleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
           
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2
             sm:p-4 text-center max-w-md mx-auto ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
               <div className="flex flex-col space-y-[-110px] md:space-y-[-200px]">
        <div className="flex items-center justify-center flex-col space-y-2 p-5 w-full z-40">
                <h1 className="font-medium text-center text-xl">Congratulations! you have successfully finished a Journey!</h1>
              <p className="text-[#91A8A7] text-sm font-normal text-center">You are one step closer to achieving what your goal!</p>
              <button onClick={handleModal} className="bg-[#00a69c] p-2 w-full text-white rounded-md font-medium">Continue Reding</button>
              <h5 onClick={()=>navigate('/home')} className="text-[#00a69c] cursor-pointer underline font-medium hover:opacity-60">Back to Home</h5>
              </div>
              <div className=" z-10 ">
                <img src={Success} alt="" className="object-contain h-full w-full"/>
                </div> 
               </div>
          

                  
              
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default SuccessModal