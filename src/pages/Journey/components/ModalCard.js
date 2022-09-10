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
const ModalCard = ({ item, ClickHandler, mySet }) => {
    const { isAmh, changeLang } = useContext(LangContext);
    const [IsClicked, setIsClicked] = useState(false);
   console.log(item)
    useEffect(() => {
      if (IsClicked === false && mySet.size !== 0) {
        mySet.delete(item?.id);
      }
    }, [IsClicked]);
  const commonCss="flex flex-col space-y-2 md:flex-row flex-grow w-full group items-center transition duration-300 ease-in-out shadow-md rounded-md cursor-pointer"
  return (
    <div className="flex flex-col items-center space-y-3 flex-grow w-full">
         
        <motion.div
    initial={{ scale: 0,opacity:0 }}
    animate={{ scale: 1,opacity:1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration:2,
    
    }}
    whileHover={{
      scale: 1.07,
      transition: { duration: 0.3 },
    }}  
    whileTap={{ scale: 0.5 }}
    key={item.id}
    onClick={() => {
      setIsClicked((prev) => !prev);
      ClickHandler(item);
    }}
    // style={{backgroundColor: IsClicked ? "#16A4D3" : "white"}}
    className={IsClicked ?  `bg-[#00a69c] ${commonCss}`: `hover:bg-[#00a69c] ${commonCss}`} >
    <img  src={process.env.REACT_APP_BACKEND_IMAGE_URL + item?.image} alt="category image" 
    className=' w-full md:w-28 h-24 max-h-24 object-cover rounded-lg p-1' />
   <h1  className=' text-black group-hover:text-white 
   font-medium text-sm py-1  md:text-lg px-3'> {isAmh ? (item?.nameAm ? item?.nameAm : "ያልተገለጸ ጽሑፍ") : item?.name}</h1>
 
  </motion.div>
 
    </div>
  )
}

export default ModalCard