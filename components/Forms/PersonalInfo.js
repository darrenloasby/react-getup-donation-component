import styles from "../../styles/styles.module.scss";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useRef, Fragment } from "react";

import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

import { TextInput } from "@primer/react";

const donationOptions = ["$10", "$20", "$30", "$75", "$200"];

import { useFormData } from "../../context";
import dynamic from "next/dynamic";
export default function PersonalInfo({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
    setFocus,
    setValue,
  } = useForm({ mode: "all" });
  const onSubmit = (values) => {
    setFormValues(values);
    nextFormStep();
  };

  const watchAmount = watch("amount");
  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (name === "amount" && values["amount"] === "Other") {
        setTimeout(() => {
          setFocus("amountOther");
        }, 150);
      } else if (name === "amount" && values["amount"] !== "Other") {
        setValue("amountOther", "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup
          value={watchAmount}
          onChange={(value) => setValue("amount", value)}
        >
          <RadioGroup.Label>Amount</RadioGroup.Label>
          {donationOptions.map((opt) => (
            /* Use the `active` state to conditionally style the active option. */
            /* Use the `checked` state to conditionally style the checked option. */
            <RadioGroup.Option
              className={styles.denomination}
              key={opt}
              value={opt}
              as={Fragment}
            >
              {({ active, checked }) => (
                <li
                  className={
                    checked ? styles.denominationChecked : ""
                  }
                >
                  {opt}
                </li>
              )}
            </RadioGroup.Option>
          ))}
          <RadioGroup.Option
            className={styles.amountOtherRadio}
            key="other"
            value="Other" 
            as={Fragment}
          >
            {({ active, checked }) => (
              <li className={checked ? styles.denominationChecked : ""}>
                <span className={styles.otherLabel}>Other</span><TextInput
          leadingVisual="$"
          aria-label="Cost of the thing"
          className="focus:outline-none active:outline-none focus:ring-0 focus:ring-offset-0"
          name="amountOther"
          onFocus={(e) => {
            setValue("amount", "Other");
          }}
          {...register("amountOther")}
          sx={{
            float: "right",
            width: "70%",
            color: "inherit",
            backgroundColor: "inherit",
            // borderWidth: "3px 3px 3px 0",
            padding: "4px 6px 4px 2px",
            borderColor: "#1d3557",
            fontWeight: "bold",
            marginLeft: "0",
            borderRadius: "0",
            "input[type=text]": {
              borderWidth: "0",
              color: "#1d3557",
              fontWeight: "inherit",
              backgroundColor: "white",
              lineHeight: "1.1em",
            }
          }}
        />
              </li>
            )}
          </RadioGroup.Option>
        </RadioGroup>
       
        {errors.amount && (
          <p className={styles.errorText}>Amount is required</p>
        )}
        <button type="submit">Next</button>
      </form>
    </div>
  );
}
