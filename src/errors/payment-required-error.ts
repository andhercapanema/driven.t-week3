import { ApplicationError } from "@/protocols";

export function paymentRequiredError(): ApplicationError {
  return {
    name: "PaymentRequiredError",
    message: "Payment is required for this search or your ticket does not include hotel!",
  };
}
