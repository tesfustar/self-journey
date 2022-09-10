import {
  Button,
  Heading,
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

export default function AgreeModal({isAgreeModalOpen, isAgreed, setIsAgreeModalOpen, setIsAgreed }) {
  //Hook
  const { isAmh, changeLang } = useContext(LangContext);

  //Jsx
  return (
    <div className="p-2">
      <Modal isOpen={isAgreeModalOpen} onClose={() => setIsAgreeModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >
            {isAmh ? "አተገባበሩና ​​መመሪያው" : "TERMS AND CONDITIONS"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className='text-gray-700 font-bold cursor-pointer hover:underline text-[15px] '>
              {isAmh ? "እንዴት መመዝገብ እንደሚቻል" : "How to register"}
            </h1>
            <h1 className='text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2'>

            {isAmh
              ? "ውድ ደንበኛ፣ የአገልግሎቱ ተጠቃሚ ለመሆን OK ብለዉ ወደ 9876 በመላክ ይመዝገቡ"
              : "Dear customer, you will be registered as a user of the service by sending OK to 9876"}
              </h1>
            <h1 className='text-gray-700 font-bold cursor-pointer hover:underline text-[15px] '>
              {isAmh ? "የደንበኝነት መረጃ" : "Subscription"}
            </h1>
            <h1 className='text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2'>
          {isAmh
              ? 'ድረ-ገጻችን ወይም አገልግሎታችን ላይ ከተመዘገቡ በኋላ በቀን 2 ብር እናስከፍላለን። አገልግሎቱን ለማቋረጥ በመነሻ ገጹ ላይ "ከደንበኝነት ምዝገባ ይውጡ" የሚለውን አገናኝ ጠቅ በማድረግ ከደንበኝነት ምዝገባ መውጣት ትችላላችሁ።'
              : 'Once you subscribed to our website or service, we charge 2 birr per day until you send an unsubscription request. you can send unsubscribe request by clicking "unsubscribe" link on the home page.'}
              </h1>
          </ModalBody>
          <ModalFooter>
            <button
            
              className="bg-[#00a69c] text-white font-bold p-2 px-5 rounded-md"
              onClick={() => {
                setIsAgreeModalOpen(!isAgreeModalOpen);
                setIsAgreed(true);
              }}
            >
              {isAmh ? "ተቀበል" : "Accept"}
            </button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
