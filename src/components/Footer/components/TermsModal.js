import React, { useContext } from "react";
import {
  Modal,
  Heading,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { LangContext } from "../../../context/LangContext";

export default function TermsModal({ isOpen, onClose }) {
  //Hook
  const { isAmh } = useContext(LangContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isAmh ? "ውሎች እና ሁኔታዎች" : "Terms & Conditions"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isAmh
            ? 'ድረ-ገጻችን ወይም አገልግሎታችን ላይ ከተመዘገቡ በኋላ በቀን 2 ብር እናስከፍላለን። አገልግሎቱን ለማቋረጥ በመነሻ ገጹ ላይ "ከደንበኝነት ምዝገባ ይውጡ" የሚለውን አገናኝ ጠቅ በማድረግ ከደንበኝነት ምዝገባ መውጣት ትችላላችሁ።'
            : 'Once you subscribed to our website or service, we charge 2 birr per day until you send an unsubscription request. you can send unsubscribe request by clicking "unsubscribe" link on the home page.'}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {isAmh ? "ዝጋ" : "Close"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
