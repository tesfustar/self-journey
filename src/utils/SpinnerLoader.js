import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import './style.css'
export default function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center w-full ">
   <div className="lds-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
    </div>
  );
}
