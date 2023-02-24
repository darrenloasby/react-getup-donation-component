// CustomStepper.js
import { Stepper } from "react-form-stepper";

const CustomStepper = ({ steps, activeStep, styleConfig }) => {
  return (
    <Stepper steps={steps} activeStep={activeStep} styleConfig={styleConfig} />
  );
};

export default CustomStepper;
