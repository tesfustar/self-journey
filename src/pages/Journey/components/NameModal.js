import React, { Fragment,useContext,useState ,useEffect} from "react";
import { Dialog, Transition } from '@headlessui/react'
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Spinner,
    Center,
    InputLeftElement,
    Text,
    useToast
  } from "@chakra-ui/react";
  import {motion} from 'framer-motion'
  import { InfoIcon, InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";
  import {FaTimes} from 'react-icons/fa'
 import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { useHome } from "../../../context/HomeContext";
import { LangContext } from "../../../context/LangContext";
import { useMutation, useQuery } from "react-query";
import ModalCard from './ModalCard'
const NameModal = ({setOpen, isOpen}) => {
  const { isAmh, changeLang } = useContext(LangContext);
  const { login, token, user ,setUser} = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
 const navigation = useNavigate();
const [Ids, setIds] = useState([]);
const [IsClicked, setIsClicked] = useState(false);
const mySet = new Set();
useEffect((item) => {
  if (IsClicked === false && mySet.size !== 0) {
    mySet.delete(item?.id);
  }
}, [IsClicked]);
  const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    const categoryData = useQuery(
      "categoryDataApi",
      async () =>
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}select-categories`, {
          headers,
        }),
      {
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!token,
        onSuccess: (res) => {
          console.log("res: ", res?.data?.data);
        },
        onError: (err) => {
          console.log("res error: ", err);
        },
      }
    );
  
    function ClickHandler(data) {
      mySet.add(data?.id);
    }
  
    const CategorySelectedMutation = useMutation(
      async (newData) =>
        await axios.post(
          process.env.REACT_APP_BACKEND_URL + "user-categories",
          newData,
          {
            headers,
          }
        ),
      {
        retry: false,
      }
    );
  
    const CategorySelectedSubmitHandler = async (values) => {
      try {
        CategorySelectedMutation.mutate(
          {
            category: values,
          },
          {
            onSuccess: (responseData) => {
              const newUser = {
                id: user?.id,
                name: user?.name,
                phone: user?.phone,
                roleId: user?.roleId,
                token: user?.token,
                userCategories: responseData?.data?.data,
              };
            
              login(token, newUser);
            },
            onError: (err) => {
              console.log(err);
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

  return (
      
     
    <div>
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className=" relative z-40 " onClose={() => setOpen(false)}>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

              
                  <div onClick={() => setOpen(false)}
                  className="absolute right-3 top-2 border-2 rounded-md border-[#00a69c] p-1">
                  <FaTimes size={22} className=""/>
                  </div>
                  <div className=" flex flex-col pt-5  items-center justify-center space-y-2 w-full flex-grow">
<Text color="gray.400"  textAlign={'center'} >
    Please choose a category for a better experience
  </Text>
<div className="grid grid-cols-2 gap-3 w-full">
{categoryData?.isFetched ? (
categoryData?.data?.data?.data?.map((item,index) =>(
  <ModalCard
  key={index}
  item={item}
  ClickHandler={ClickHandler}
  mySet={mySet}
/>
))
) : (
  <Center h={"40vh"} width={"100%"}>
  <Spinner size={"xl"} />
</Center>
)}

</div>
 <button  
   onClick={() => {
    CategorySelectedSubmitHandler([...mySet]);
    setOpen(false)
  }}
 className='bg-[#00a69c] p-2 px-4 text-white font-medium mt-2 rounded-md
  hover:opacity-70'>Start Jakedu self - Journeys</button>


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

export default NameModal


