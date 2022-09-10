import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Button,
  Flex
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useHome } from "../../../context/HomeContext";
import journey from '../../../assets/journey.png'
import './style.css'
import walk from '../../../assets/journey-walk.json'
import Lottie from "lottie-react";
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import {BsFillPatchCheckFill} from 'react-icons/bs'
export default function CustomSlider({ value,CurrentPage }) {
  //Hook

  const content = (
    <Flex py={4}>
     <Lottie animationData={walk} loop={true} className="h-16"/>
    </Flex>
  );
  
 
  const [sliderValue, setSliderValue] = useState(0);
  const [setShowTooltip] = useState(false);
  const [NoOfPages, setNoOfPages] = useState([]);
  const { pages } = useHome();
  const [current, setCurrent] = useState(CurrentPage);
 
  console.log("NoOfPages: ", CurrentPage);

  useEffect(() => {
    const element = [];
    for (let index = 1; index < pages + 2; index++) {
      element.push((100 / (pages + 2)) * index);
    }
    element.push(100)
    
    setNoOfPages(element);
  }, [pages]);

  useEffect(() => {
    setSliderValue((100 / (pages + 2)) * value);
  }, [value]);
 


const currentStep=CurrentPage-1


  //Jsx
  return (
    <>
     <div className="py-10">
      <div>
      <Steps activeStep={currentStep}  colorScheme="cyan" >
      {NoOfPages.slice(1,NoOfPages.length-1).map((page, index) => {
           console.log(index)
        return(
        <Step   key={page} label={CurrentPage - 1 === index && content} 
        description={CurrentPage - 1 > index && <img src={journey} width={70}/>} >
          {/* {content} */}
        </Step>
      )})}
    </Steps>
      </div>
   
  </div>
    {/* <Stack
      bg={"gray.200"}
      style={{
        width: "100%",
        boxShadow: `inset 0px 3px 6px #00000029`,
        borderRadius: 15,
      }}
    >
      <Slider
        id="slider"
        display={true}
        value={sliderValue}
        isReadOnly
        min={0}
        max={100}
        colorScheme="cyan"
        onChange={(v) => setSliderValue(v)}
       
        >
        {NoOfPages.map((page, index) => {
          return (
            <SliderMark value={page} fontSize="sm" key={index}>
              <SliderThumb
                w={"25px"}
                h={"25px"}
                bg={"gray.300"}
                style={{
                  position: "sticky",
                  zIndex: 0,
                  boxShadow: `inset 0px 3px 6px #00000029`,
                }}
              />
            </SliderMark>
          );
        })}
        <SliderTrack bg={"whiteAlpha.200"} h={"100%"} borderRadius={15}>
       
          <SliderFilledTrack style={{}} />
        </SliderTrack>
        <SliderThumb
          bg={"#0C6C8B"}
          w={"25px"}
          h={"25px"}
          style={{
            boxShadow: `0 2px 2px 0 rgba(0, 0, 0, 0.16)`,
          }}
        />
      </Slider>
    </Stack> */}
        </>
  );
}
