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
const RegisterPage = () => {
  const [subscribed, setSubscribed] = useState(false)
  const [isLargerThan768] = useMediaQuery("(min-width: 768px )");
  const [phone, setPhone, PhoneError] = useValidPhone();
  const [confirmModal, setConfirmModal] = useState(false)
  const toast = useToast();
  const {checked} = useAuth()
  const { isAmh, changeLang } = useContext(LangContext);
  const navigate = useNavigate();
  const { isModalOpen, setIsModalOpen } = useHome();
  const handleModal = () => {
    setIsModalOpen(true);
  };
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
        <div className="w-full py-20 md:py-28 flex flex-col space-y-3  items-center justify-center ">
          <div className=" w-full  flex flex-col items-start">
            <div className="max-w-6xl mx-auto w-full  flex flex-col items-center justify-center  space-y-3 px-2 
            sm:px-0">
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
            
              {/* grid */}
    <div className="w-full flex flex-col items-center space-y-2">
      <div className=" ">
      <p className="font-md text-stone-900 text-sm text-center ">
                {isAmh
                  ? "የራስ ጉዞ አንድ ሰው በዓላማ የሚመራ ህይወት መኖር የሚጀምርበት እና በመንገዱ ላይ ከፍተኛ መጠን ያለው ድጋፍ የሚያገኙበት መድረክ ነው"
                  : "Self Journey is a platform where one can start living a purpose driven life and get a tremendous amount of support along the way."}
              </p>
      </div>

      <div className="">
       <p className="text-sm font-light">{isAmh ?  "ለመቀጠል:":"To continue: "}</p>
       <p className="text-sm font-light">{isAmh ?  "1. የእርስዎን Wi-Fi ያጥፉ:":"1. Turn off your Wi-Fi "}</p>
       <p className="text-sm font-light">{isAmh ?  "2. የስልክዎን ሞባይል ዳታ ያብሩ":"2. Activate your mobile data "}</p>
       <p className="text-sm font-light">{isAmh ?  "3. ሰብስክራይብ ለማድረግ ከስር ይጫኑ":"3. Press below to Subscribe "}</p>
      </div>
    </div>
              
              {subscribed ?<button
              disabled={registerMutation.isLoading}
                onClick={handleRegister}
                className="box bg-[#00a69c] hover:scale-105 p-5 px-20 font-medium text-2xl text-white
          transition-all ease-in-out duration-300 rounded-md"
              >
                {registerMutation.isLoading ? <Spinner size='xl'/> :isAmh ? 'አረጋግጥ' :'Confirm'}
              </button> :
              <button
              disabled={registerMutation.isLoading}
                onClick={()=>setSubscribed(true)}
                className="box bg-[#00a69c] hover:scale-105 p-5 px-20 font-medium text-2xl text-white
          transition-all ease-in-out duration-300 rounded-md"
              >
                {isAmh ? 'ይጀምሩ' :'Subscribe'}
              </button>
              }
            </div>
            <p className="flex items-center justify-center w-full text-center pt-3 text-sm">{isAmh ?  `ወይም ለአገልግሎቱ ለመመዝገብ OK ብለው ወደ 8469 ይላኩ! ዋጋ፡ በቀን 2 ብር` :'...or send OK to 8469 to join!Cost: 2 birr/day'}</p>
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
  );
};
// 194.5.207.204
// 443
// ee6ed3474af8762909c3fb9091d5d42c366a7573746963652e7669632e676f762e6175
export default RegisterPage;


