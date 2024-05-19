"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();

  const params = useSearchParams();
  const router = useRouter();
  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        );
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf("E11000") === 0
          ? "Account already exists with this Email id"
          : err.message;
      toast.error(error || "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="card max-w-sm bg-white rounded-lg shadow-lg">
        <h1 className="text-black text-3xl font-bold my-4 p-2 rounded-t-lg flex justify-center">
          Register
        </h1>
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="my-4">
              <label className="label text-sm leading-5 font-bold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="input input-bordered w-full max-w-sm border border-gray-400 rounded-md shadow-inner outline-none p-2"
              />
              {errors.name?.message && (
                <div className="text-error text-red-500">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className="my-4">
              <label className="label text-sm leading-5 font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Email is invalid",
                  },
                })}
                className="input input-bordered w-full max-w-sm border border-gray-400 rounded-md shadow-inner outline-none p-2"
              />
              {errors.email?.message && (
                <div className="text-error text-red-500">
                  {" "}
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="my-4">
              <label className="label text-sm leading-5 font-bold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="input input-bordered w-full max-w-sm border border-gray-400 rounded-md shadow-inner outline-none p-2"
              />
              {errors.password?.message && (
                <div className="text-error text-red-500">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="my-4">
              <label className="label text-sm leading-5 font-bold" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  },
                })}
                className="input input-bordered w-full max-w-sm border border-gray-400 rounded-md shadow-inner outline-none p-2"
              />
              {errors.confirmPassword?.message && (
                <div className="text-error text-red-500">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            <div className="my-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary text-black w-full h-12 border border-primary"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Register
              </button>
            </div>
          </form>

          <div className="divider my-4"></div>
          <div className="text-center text-dark-grey font-semibold">
            Already have an account?{" "}
            <Link
              className="link text-accent"
              href={`/signin?callbackUrl=${callbackUrl}`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
