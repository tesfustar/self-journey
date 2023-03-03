import React, { Fragment,useContext,useState ,useEffect} from "react";
import { Dialog, Transition } from '@headlessui/react'
import {FormControl,FormLabel,Stack,PinInput ,PinInputField ,HStack,
  InputGroup,InputLeftAddon,Input,Spinner} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import {useToast,Checkbox } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../../context/LangContext";
import { useAuth } from "../../../context/auth";
import useValidPhone from "../../../hook/useValidPhone";
import { useHome } from "../../../context/HomeContext";
import Login from "../../../assets/login.png";
import AgreeModal from './AgreeModal';
import RegisterModal from './RegisterModal'
import Logo from "../../../assets/Self journey logo/Self journey horizontal.svg";
import {FaTimes} from 'react-icons/fa'
const LoginModal = ({ isModalOpen, handleModal,setIsModalOpen ,phoneNo}) => {
    const [phone, setPhone, PhoneError] = useValidPhone();
    const phoneNumber = localStorage.getItem("phoneNumber")
    // const [phone, setPhone] = useState(phoneNumber ? phoneNumber : "")
    const [Register, setRegister] = useState(false);
    const [Agree, setAgree] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [hasPhone, sethasPhone] = useState(false);
    const [Code, setCode] = useState("");
    const toast = useToast();
    const navigate = useNavigate()
    const { login } = useAuth();
    const { isAmh, changeLang } = useContext(LangContext);
    const [isAgreeModalOpen,setIsAgreeModalOpen] = useState(false)
    const [isRegisterModalOpen,setIsRegisterModalOpen] = useState(false)
    console.log({phoneNumber})
    const handleAgreeModal=()=>{
      setIsAgreeModalOpen(!isAgreeModalOpen)
    }
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const LoginHandler = () => {
        if (!hasPhone) {
          if (!phone) {
            toast({
              title: "Please Enter you phonenumber.",
              status: "warning",
              duration: 1800,
              isClosable: true,
            }
            );
            return;
          }
          if (!isAgreed) {
            toast({
              title: "Please Agree with the terms.",
              status: "warning",
              duration: 1800,
              isClosable: true,
            });
            return;
          }
          subscriberLoginSubmitHandler();
          localStorage.setItem("phoneNumber",phone)
        } 
        else {
          if ([...Code].length != 6) {
            toast({
              title: "Verification Code must 6 digits",
              status: "warning",
              duration: 1800,
              isClosable: true,
            });
            return;
          }
          toast({
            title: "Please wait...",
            status: "info",
            duration: 1800,
            isClosable: true,
          });
          subscriberLoginSubmitHandler();
        }
      };
    
      const otpMutation = useMutation(
        async (newData) =>
          await axios.post(process.env.REACT_APP_BACKEND_URL + "otp", newData, {
            headers,
          }),
        {
          retry: false,
        }
      );
    
      const otpMutationSubmitHandler = async (values) => {
        try {
          otpMutation.mutate(
            {
              phone: "251".concat(phone),
              // verificationCode: Code,
            },
            {
              onSuccess: (responseData) => {
                sethasPhone(true);
                toast({
                  title: "Otp Sent",
                  description: "Please check your phone for Otp message",
                  status: "info",
                  duration: 2500,
                  isClosable: true,
                });
              },
              onError: (err) => {
                console.log(err);
                toast({
                  title: "Subscribe",
                  description: loginMutation?.error?.response?.data?.message,
                  status: "error",
                  duration: 1800,
                  isClosable: true,
                });
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      };
    
      const loginMutation = useMutation(
        async (newData) =>
          await axios.post(process.env.REACT_APP_BACKEND_URL + "login", newData, {
            headers,
          }),
        {
          retry: false,
        }
      );
    
      const subscriberLoginSubmitHandler = async (values) => {
        try {
          loginMutation.mutate(
            {
              phone: "251".concat(phone),
              // password: Code,
            },
            {
              onSuccess: (responseData) => {
                toast({
                  title: "Success",
                  status: "success",
                  duration: 1800,
                  isClosable: true,
                });
    
                // setUser(responseData?.data?.data);
                // const res = JSON.stringify(responseData?.data?.data);
                // localStorage.setItem("user", res);
                console.log(
                  "Data: ,",
                  responseData?.data?.data?.token,
                  responseData?.data?.data
                );
                login(responseData?.data?.data?.token, responseData?.data?.data);
    
                if (responseData?.data?.data?.name == null) {
                  // navigate("/login_name");
                  return;
                }
                if (responseData?.data?.data?.userCategories?.length == 0) {
                  // navigate("/select-category");
                  return;
                }
                // navigate("/home");
              },
              onError: (err) => {
                console.log(err);
                toast({
                  title: "Subscribe",
                  description: err?.response?.data?.message,
                  status: "error",
                  duration: 1800,
                  isClosable: true,
                });
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      };
    

  return (
    <div>
    <Transition appear show={isModalOpen} as={Fragment}>
    <Dialog as="div" className=" relative z-50 " onClose={()=>setIsModalOpen(true)}>
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
             sm:p-4 text-center max-w-2xl mx-auto ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">

              
                  <div onClick={handleModal}
                  className="absolute right-3 top-2 border-2 rounded-md border-[#00a69c] p-1 cursor-pointer">
                  <FaTimes size={15} className=""/>
                  </div>
                  <div className=" grid grid-cols-1 sm:grid-cols-2">
           <div className="bg-[#EAF5FC] hidden sm:flex sm:flex-col items-start space-y-2 flex-grow w-full">
           <div className="p-3">
              <img src={Logo} alt="" className='h-10 p-1'/>
           <h1 className="font-semibold text-black text-3xl pt-3">Discover Lifelong <span className="text-[#00a69c]">Journey</span></h1>
            <img src={Login} alt="" className="w-full  object-contain" />
           </div>
           </div>
           <div className=" flex flex-col items-start flex-grow w-full space-y-4 p-6">
             <div className="flex flex-col items-start space-y-1 pt-10">
              <h1 className="font font-semibold text-lg">Welcome to Self Journey</h1>
              <p className="font-normal text-sm">Unlock your true potential</p>
             </div>
             <div className="flex flex-col flex-grow w-full">
             {!hasPhone ?(<div className="flex flex-col items-start flex-grow w-full space-y-1  ">
             <p className="font-normal text-sm text-[#91A8A7]">Phone Number</p>
             <div className='flex items-center     border-2 rounded-md border-[#00a69c] w-full'>
       <span className='border-r-2 border-[#00a69c]  rounded-l-md h-full flex flex-grow text-center px-2 items-center justify-center '>+251</span> 
      <input type="number" 
        value={phone}
       
         onChange={(event) => setPhone(event.target.value)}
      placeholder='9-********' name="phoneNo" 
      className='w-full flex-grow  bg-transparent border-none focus:border-none focus:ring-0    focus:outline-none' />
      </div>
      <div className='flex items-center space-x-2 pt-3'>
       <Checkbox
      defaultChecked={false}
      color="gray.400"
      colorScheme="teal"
      defaultIsChecked
      isChecked={isAgreed}
      onChange={(e) => setIsAgreed(e.target.checked)}
    ></Checkbox>
          <p  
           onClick={() => {
            setIsAgreed(true);setIsAgreeModalOpen(!isAgreeModalOpen)
          }}
          className='text-gray-500 font-medium cursor-pointer hover:underline text-[13px]'> {isAmh
        ? "በእኛ ውሎች እና ሁኔታዎች ላይ ይስማሙ"
        : "Agree on our Terms and Conditions"}</p>
      </div>
           {/* <button className='bg-[#00a69c] flex-grow w-full p-2 px-4 text-white font-medium mt-2 rounded-md
  hover:opacity-70 '>Log in</button> */}
 
  </div>):(
    <div className="flex flex-col space-y-3 pt-5">
       <p className="font-normal text-sm text-[#91A8A7]">Enter your Confirmation Number</p>
       <div>
       <HStack>
      <PinInput 
      placeholder=''
      value={Code}
      onChange={(e)=> setCode(e) }>
       <PinInputField  bg={"white"}/>
       <PinInputField bg={"white"}/>
       <PinInputField bg={"white"}/>
       <PinInputField bg={"white"}/>
       <PinInputField bg={"white"}/>
       <PinInputField bg={"white"}/>
     </PinInput>
      </HStack>
       </div>
    </div>
  )}
<button onClick={LoginHandler} disabled={otpMutation.isLoading || loginMutation.isLoading}
className='bg-[#00a69c]  w-full p-2 px-4 text-white font-medium mt-2 rounded-md
  hover:opacity-70 '>{loginMutation.isLoading ?  <Spinner size='sm'/>  : 'Log in'}</button>
    <div className="flex items-center justify-between">
   {!hasPhone  && <p className="font-normal text-sm py-2">Don't have account? 
   <span onClick={() => {setRegister(true);setIsRegisterModalOpen(true)}}
    className="font-semibold text-[#00a69c] cursor-pointer 
    hover:underline"> Register</span>
    </p>}
<span onClick={() => {navigate('/how-to')}}
    className="font-semibold text-[#00a69c] cursor-pointer 
    hover:underline">How to</span>

    </div>
</div>
  <p className="text-[#91A8A7] font-normal text-sm text-center flex items-center justify-center w-full">2022 all right reserved</p>
           </div>



</div>

                  
              
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <RegisterModal setIsRegisterModalOpen={setIsRegisterModalOpen} isRegisterModalOpen={isRegisterModalOpen}/>
      <AgreeModal isAgreeModalOpen={isAgreeModalOpen} setIsAgreeModalOpen={setIsAgreeModalOpen} isAgreed={isAgreed}/> 
    </div>
  )
}

export default LoginModal


