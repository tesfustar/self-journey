import React, { Fragment,useContext,useState ,useEffect} from "react";
import { Dialog, Transition } from '@headlessui/react'
import { LangContext } from "../../context/LangContext";
import Navbar from "./components/RegisterNav";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { useHome } from "../../context/HomeContext";
import Group1 from "../../assets/register.png";
import journey from "../../assets/journey.png";
import mobile from "../../assets/mobile.png";
import mobileAmh from "../../assets/mobileAmh.png";
import registerAmh from "../../assets/registerAmh.png";
import useValidPhone from "../../hook/useValidPhone";
import { Spinner, Center, useMediaQuery,  Button, } from "@chakra-ui/react";
import { useToast, Checkbox } from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { useMutation } from "react-query";
import "./style.css";
import axios from "axios";
const Register = () => {
    const [isLargerThan768] = useMediaQuery("(min-width: 768px )");
    const [phone, setPhone, PhoneError] = useValidPhone();
    const [confirmModal, setConfirmModal] = useState(true)
    const toast = useToast();
    const {checked} = useAuth()
    const { isAmh, changeLang } = useContext(LangContext);
    const navigate = useNavigate();
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    // const phone = 'http://196.189.180.198:8181/api'
    const registerMutation = useMutation(
      async (newData) =>
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}link-subscribe`, newData, {
          headers,
        }),
      {
        retry: false,
      }
    );
  
    useEffect(() => {
      // otpMutationSubmitHandler()
    
      
    }, [checked])
    const handleRegister=()=>{
        if(!phone){
          toast({
            title: "Please Enter you phonenumber.",
            status: "warning",
            duration: 1800,
            isClosable: true,
          }
          );
          return;
        }
        localStorage.setItem("phoneNumber",phone)
        setConfirmModal(true)
   
    }
    const otpMutationSubmitHandler = async (values) => {
      try {
        registerMutation.mutate(
          {phone:"251".concat(phone)},
          {
            onSuccess: (responseData) => {
              console.log(responseData?.data);
              toast({
                title: "Subscribed successfully",
                status: "info",
                duration: 1800,
                isClosable: true,
              });
  
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            },
            onError: (err) => {
              console.log(err);
              toast({
                // title: "Subscribe",
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
  
    function close(){
      setConfirmModal(false)
    }
    function confirmSubscription(){
         otpMutationSubmitHandler();
      setConfirmModal(false)
    }
    if(confirmModal) {
        return(
     
          <Transition appear show={confirmModal} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={close}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
    
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel
                    className="w-full max-w-md transform overflow-hidden
                       rounded-2xl bg-white p-5 text-center align-middle  transition-all"
                  >
                    <div className="flex flex-col items-center justify-center mt-2">
    <h1 className='text-gray-500 font-medium  text-lg py-2 capitalize'>
    {isAmh
    ? "ለራስ ጉዞ መመዝገብ እርግጠኛ ነዎት"
    : "are u sure to unsubscribe selfjourney"}
    </h1>               <div className="flex items-center space-x-5 pt-5">
    <Button bg={'blue.600'} color={"white"} onClick={confirmSubscription}>{isAmh ?   'አዎ' :'Yes'}</Button>
    <Button bg={'red.600'} color={"white"} onClick={close}>{isAmh ?   'አይ' :'Cancel'}</Button>
    </div>
    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        )
      }
  return (
    <div >
     
    <Navbar />
      
       <div className=" w-full">
        <div className="py-20 md:py-28 flex flex-col space-y-3  items-center justify-center ">
          <div className="  flex flex-col items-start">
            <div className="max-w-xl  flex flex-col items-center justify-center  space-y-3 px-2 sm:px-0">
              <h1 className="font-bold text-stone-900 text-3xl sm:text-3xl lg:text-5xl ">
                {isAmh ? "ከእኛ ጋር ፣ የእርስዎ" : "With us, your"}{" "}
              </h1>
              <div className="flex items-center space-x-2">
                <h1
                  className="font-bold text-stone-900
          text-3xl sm:text-3xl lg:text-5xl "
                >
                  <span className="text-[#00a69c]">
                    {isAmh ? "ጉዞ" : "Journey"}
                  </span>{" "}
                  {isAmh ? "ብሩህ ነው!" : "is Bright!"}
                </h1>
              </div>
              <p className="font-md text-stone-900 text-sm text-center ">
                {isAmh
                  ? "የራስ ጉዞ አንድ ሰው በዓላማ የሚመራ ህይወት መኖር የሚጀምርበት እና በመንገዱ ላይ ከፍተኛ መጠን ያለው ድጋፍ የሚያገኙበት መድረክ ነው"
                  : "Self Journey is a platform where one can start living a purpose driven life and get a tremendous amount of support along the way."}
              </p>

              <div className='flex items-center  max-w-xs   border-2 rounded-md border-[#00a69c] w-full'>
       <span className='border-r-2 border-[#00a69c]  rounded-l-md h-full flex flex-grow text-center px-2 items-center justify-center '>+251</span> 
      <input type="number" 
         value={phone}
         onChange={(event) => {setPhone(event.target.value)}}
      placeholder='9-********' name="phoneNo" 
      className='w-full flex-grow  bg-transparent border-none focus:border-none focus:ring-0    focus:outline-none' />
      </div>
              <button
              disabled={registerMutation.isLoading}
                onClick={handleRegister}
                className="box bg-[#00a69c] hover:scale-105 p-5 px-20 font-medium text-2xl text-white
          transition-all ease-in-out duration-300 rounded-md"
              >
                {registerMutation.isLoading ? <Spinner size='xl'/> :isAmh ? 'ይጀምሩ' :'Subscribe'}
              </button>
            </div>
          </div>
          {isLargerThan768 ? (
            isAmh ? (
              <img
                src={registerAmh}
                alt=""
                className="h-full w-full md:h-[700px] object-contain"
              />
            ) : (
              <img
                src={Group1}
                alt=""
                className="h-full w-full md:h-[700px] object-contain"
              />
            )
          ) : isAmh ? (
            <img src={mobileAmh} alt="" className="h-80 w-full" />
          ) : (
            <img src={mobile} alt="" className="h-80 w-full" />
          )}
        </div>
      </div>
      <Footer /> 
    </div>
  )
}

export default Register