import React, { useContext } from "react";
import {
  Modal,
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

export default function PolicysModal({ isOpen, onClose }) {
  //Hook
  const { isAmh } = useContext(LangContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isAmh ? "የግላዊነት ፖሊሲ" : "Privacy policy"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
