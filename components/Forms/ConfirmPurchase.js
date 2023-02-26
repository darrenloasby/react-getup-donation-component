import styles from "../../styles/styles.module.scss";
import { useForm } from "react-hook-form";
import { useFormData } from "../../context";
import SecureFrame from "../SecureFrame";

function handleSignPayment(subject) {
  return fetch("/.netlify/functions/sign-payment", {
    method: "POST",
    body: subject,
  })
    .then((response) => response.json())
    .then((json) => json.fingerprint);
}

function handlePayment(payload) {
  console.log(payload);
}

const Payment = (props) => (
  <SecureFrame
    live={false}
    merchantId={props.merchantId}
    reference={props.reference}
    onSignPayment={(subject) => handleSignPayment(subject)}
    onPayment={(payload) => handlePayment(payload)}
  />
);

export default function ConfirmPurchase({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: "all" });

  const onSubmit = (values) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <div className={formStep === 2 ? styles.showForm : styles.hideForm}>
      <h2>Confirm Purchase</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Payment
          merchantId="GUQ00"
          reference="1234"
          onSignPayment={(subject) => handleSignPayment(subject)}
          onPayment={(payload) => handlePayment(payload)}
        />
        <div className={styles.formRow}>
          <label htmlFor="checkbox">
            <input
              type="checkbox"
              {...register("checkbox", { required: true })}
            />
            Ready to buy?
          </label>
          {errors.checkbox && (
            <p className={styles.errorText}>Confirm purchase to proceed</p>
          )}
        </div>
        <button>Next</button>
      </form>
    </div>
  );
}
