"use client";
import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Form = () => {
  const router = useRouter();
  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod);
    router.push("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "CashOnDelivery");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <div className="flex flex-row lg:flex-col">
      <div className="my-20 mx-10 lg:my-3">
        <CheckoutSteps current={2} />
      </div>
      <div className="my-20 mx-10 lg:my-3">
        <div className="max-w-sm mx-auto card bg-base-300 my-4">
          <div className="card-body">
            <h1 className="card-title py-4 text-2xl font-semibold">
              Payment Method
            </h1>
            <form onSubmit={handleSubmit}>
              {["CashOnDelivery"].map((payment) => (
                <div key={payment}>
                  <label className="label cursor-pointer flex items-center">
                    <span className="label-text text-sm leading-5 font-bold">
                      {payment}
                    </span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="radio m-2 flex-col cursor-pointer"
                      value={payment}
                      checked={selectedPaymentMethod === payment}
                      onChange={() => setSelectedPaymentMethod(payment)}
                    />
                  </label>
                </div>
              ))}
              <div className="my-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full rounded-lg bg-cta text-black py-2"
                >
                  Next
                </button>
              </div>
              <div className="my-2">
                <button
                  type="button"
                  className="btn btn-primary w-full rounded-lg bg-cta text-red-700 py-2"
                  onClick={() => router.back()}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
