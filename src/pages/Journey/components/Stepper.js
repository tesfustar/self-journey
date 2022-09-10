import React from 'react'
import walk from '../../../assets/journey-walk.json'
import Lottie from "lottie-react";
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex,Button } from '@chakra-ui/react';

const content = (
  <Flex py={4}>
   <Lottie animationData={walk} loop={true} className="h-44"/>
  </Flex>
);

const steps = [
  { label: 'Step 1', content },
  { label: 'Step 2', content },
  { label: 'Step 3', content },
];
 
const Stepper = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <Flex flexDir="column" width="100%">
    {/* <Steps activeStep={activeStep}>
    {steps.map(({ label, content }) => (
        <Step label={label} key={label}>
          {content}
        </Step>
      ))}
    </Steps>
    {activeStep === steps.length ? (
      <Flex p={4}>
        <Button mx="auto" size="sm" onClick={reset}>
          Reset
        </Button>
      </Flex>
    ) : (
      <Flex width="100%" justify="flex-end">
        <Button
          isDisabled={activeStep === 0}
          mr={4}
          onClick={prevStep}
          size="sm"
          variant="ghost"
        >
          Prev
        </Button>
        <Button size="sm" onClick={nextStep}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Flex>
    )} */}
  </Flex>
  )
}

export default Stepper