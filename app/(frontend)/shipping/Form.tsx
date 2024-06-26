'use client'
import CheckoutSteps from "@/components/CheckoutSteps"
import useCartService from "@/lib/hooks/useCartStore"
import { ShippingAddress } from "@/lib/models/OrderModel"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SubmitHandler, ValidationRule, useForm } from "react-hook-form"

const Form = () => {
    const router = useRouter()
    const { saveShippingAddrress, shippingAddress } = useCartService()
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors, isSubmitting },
    } = useForm<ShippingAddress>({
      defaultValues: {
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
      },
    })

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName)
        setValue('address', shippingAddress.address)
        setValue('city', shippingAddress.city)
        setValue('postalCode', shippingAddress.postalCode)
        setValue('country', shippingAddress.country)
      }, [setValue, shippingAddress])

      const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
        saveShippingAddrress(form)
        router.push('/payment')
      }

      const FormInput = ({
        id,
        name,
        required,
        pattern,
      }: {
        id: keyof ShippingAddress
        name: string
        required?: boolean
        pattern?: ValidationRule<RegExp>
      }) => (
        <div className="mb-2">
          <label className="label text-sm leading-5 font-bold" htmlFor={id}>
            {name}
          </label>
          <input
            type="text"
            id={id}
            {...register(id, {
              required: required && `${name} is required`,
              pattern,
            })}
            className="input input-bordered w-full max-w-sm border border-gray-400 rounded-md shadow-inner outline-none p-2"
          />
          {errors[id]?.message && (
            <div className="text-error">{errors[id]?.message}</div>
          )}
        </div>
      )

      return (
        <div className="flex flex-row lg:flex-col">
          <div className="my-20 mx-10 lg:my-3">
          <CheckoutSteps current={1} />
          </div>
          <div>
          <div className="max-w-sm mx-auto card bg-base-300 my-4">
            <div className="card-body">
              <h1 className="card-title py-4 text-2xl font-semibold">Shipping Address</h1>
              <form onSubmit={handleSubmit(formSubmit)}>
                <FormInput name="Full Name" id="fullName" required />
                <FormInput name="Address" id="address" required />
                <FormInput name="City" id="city" required />
                <FormInput name="Postal Code" id="postalCode" required />
                <FormInput name="Country" id="country" required />
                <div className="my-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full rounded-lg bg-cta text-black py-2"
                  >
                    {isSubmitting && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Next
                  </button>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      )

}
export default Form