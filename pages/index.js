import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/styles.module.scss";
import FormCard from "../components/FormCard";



import {
  BillingInfo,
  ConfirmPurchase,
  PersonalInfo,
} from "../components/Forms";
import FormCompleted from "../components/FormCompleted";
const StepperComponent = dynamic(() => import("../components/CustomStepper"), {
  ssr: false,
});

const App = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <div className={styles.container}>
      <Head>
        <title>RHF Multi Step Form</title>
      </Head>
      <StepperComponent
        steps={[
          { label: "Amount" },
          { label: "Details" },
          { label: "Payment" },
        ]}
        activeStep={formStep}
        styleConfig={{
          activeBgColor: "#1d3557",
          activeTextColor: "#f1faee",
          completedBgColor: "#e63946",
          completedTextColor: "#f1faee",
          inactiveBgColor: "#f1faee",
          inactiveTextColor: "#293241",
          size: "1.5em",
        }}
      />
      <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
        {formStep >= 0 && (
          <PersonalInfo formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep >= 1 && (
          <BillingInfo formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep >= 2 && (
          <ConfirmPurchase formStep={formStep} nextFormStep={nextFormStep} />
        )}

        {formStep > 2 && <FormCompleted />}
      </FormCard>
    </div>
  );
};

export default App;
