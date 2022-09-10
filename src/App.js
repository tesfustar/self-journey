import React, { useState,useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLang } from "./context/lang";
import { LangContext } from "./context/LangContext";
import { useAuth } from "./context/auth";
import { Center, Spinner } from "@chakra-ui/react";
import {HomePage,BlogDetail,BlogPage,AllJourneyPage,Success,JourneyPage,
         Journey,LoginPage,VacancyDetails,VacancyPage,Scholarship} from './pages'
import { Navbar ,Footer} from "./components";
import './App.css';
import loader from './assets/journey-walk.json'
import Lottie from "lottie-react";
import SpinnerLoader from "./utils/SpinnerLoader";
const App = () => {
const { isAmh, changeLang } = useLang();
const { token, user, checked } = useAuth()
const [isOpen,setIsOpen]=useState(false)
const toggle=()=>{
  setIsOpen(!isOpen)
}

function LoginComp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function HomeComp() {
  return (
    <div className="app">
   
    <Navbar toggle={toggle}/>
       <Routes>  
       <Route path="*"  element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
      
     <Route path="/allJourneys" element={<AllJourneyPage />}>
        <Route path="" element={<Navigate to="/allJourneys/all" />} />
       <Route path="all" element={<AllJourneyPage />} />
     </Route>
     <Route path="/journey" element={<JourneyPage />} />
        <Route path="/vacancies" element={<VacancyPage />} />
        <Route path="/vacancy-details/:id" element={<VacancyDetails />} />
        <Route path="/blog-details/:id" element={<BlogDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/scholarship/:id" element={<Scholarship />} />
        <Route path="/journey/success/:id" element={<Success />} />
   </Routes>
   <Footer />
   </div>
  );
}

function RoutComp() {
  if (token && user) {
    return <HomeComp />;
  } 
   else {
    return <HomeComp />;
  }
}
  return (
    <div >
      <LangContext.Provider value={{ isAmh, changeLang }}>
        {checked ? <RoutComp /> :  
        <div className="h-44 flex items-center justify-center min-h-screen"> <Lottie animationData={loader} loop={true} className="h-44"/>
        </div>}
      </LangContext.Provider>
    </div>
  )
}

export default App