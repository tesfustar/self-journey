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
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { LangContext } from "../../../context/LangContext";

export default function RegisterModal({ setOpen, setIsRegisterModalOpen,isRegisterModalOpen }) {
  //Hook
  const { isAmh, changeLang } = useContext(LangContext);

  //Jsx
  return (
    <>
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isAmh ? "ምዝገባ" : "Registration"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className='text-gray-500 font-medium cursor-pointer hover:underline text-[15px] py-2'>
              {isAmh
              ? "ውድ ደንበኛችሁ ok ወደ 9876 በመላክ የአገልግሎቱ ተጠቃሚ መሆን ትችላላችሁ።"
              : "Dear Customer, Send OK to 9876 to take advantage of our Self Journey service."}
              </h1>
          </ModalBody>
          <ModalFooter>
            <button
              className="bg-[#00a69c] text-white font-bold p-2 px-5 rounded-md"
              onClick={() => {
                setIsRegisterModalOpen(false);
                window.open("sms:9876?body=ok");
              }}
            >
              {isAmh ? "ላክ" : "Send"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
