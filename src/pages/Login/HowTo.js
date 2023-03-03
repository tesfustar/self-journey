import { Box } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useHome } from "../../context/HomeContext";
import Footer from "../../pages/Login/components/Footer";
import Navbar from "../../pages/Login/components/RegisterNav";

export default function HowTo() {
  return (
    <div>
      <Navbar />

      <div className=" w-full">
        <div className="w-full py-20 md:py-28 flex flex-col space-y-3  items-center justify-center ">
          <div className=" w-full  flex flex-col items-start">
            <div
              className="max-w-6xl mx-auto w-full  flex flex-col items-center justify-center  space-y-3 px-2 
              sm:px-0"
            >
              <Box padding={8}>
              <h1 className="text-gray-700 font-bold cursor-pointer  self-start pb-5
               text-3xl ">
               How to use self-journey
              </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  1. How to Register
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  In order to start using the Self Journey service, simply open
                  the SMS Messaging app on your phone and send "OK" to 9876.
                  Once you do, you will receive a welcome message from us as
                  well as from Ethio Telecom (900) confirming your subscription.
                  Once you subscribe to our website or service, we charge 2 birr
                  per day until you send an unsubscription request.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  2. How to login
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  Once you receive the welcome message, you can now visit
                  https://selfjourney-et.com and type in your phone number.
                  Don't forget to read and accept (Tick the check box) our terms
                  and conditions. Once submitted we will send a unique 6 digit
                  code (OTP) to your phone to verify it is you. Type in the code
                  in the input that follows. Once we verify it is you, you have
                  successfully logged in to the service.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  3 User Preferences
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  If it is your first time logging in to our platform then you
                  will be met with a welcome message that asks you what category
                  of topics you are interested in. You can select multiple
                  topics you like. We will use this to recommend posts and
                  articles for you to enjoy.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  4 How to change language
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  You can easily change the language of the website by clicking
                  on the “gear icon” on the top left of the website and
                  selecting either “English” or “Amharic”. This option is
                  available on all the pages including the Login page.
                </h1>
                <h1 className="text-gray-700 font-bold cursor-pointer hover:underline text-[15px] ">
                  5 How to unsubscribe
                </h1>
                <h1 className="text-gray-500 font-medium cursor-pointer hover:underline text-[13px] py-2">
                  To unsubscribe from the Self Journey service go open the SMS
                  Messaging app on your phone and send "STOP" to 9876. By doing
                  so you will stop access to our service and will not be able to
                  login unless you subscribe again.
                </h1>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
