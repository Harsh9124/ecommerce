"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  let callbackUrl = params.get("callbackUrl") || "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setLoading(false);
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-grey">
      <div className="card max-w-sm bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold my-4 text-black p-2 rounded-t-lg flex justify-center">
          Sign in
        </h1>
        <div className="px-8 pb-8">
          {params.get("error") && (
            <div className="alert text-error text-red-500">
              {params.get("error") === "CredentialsSignin"
                ? "Invalid email or password"
                : params.get("error")}
            </div>
          )}
          {params.get("success") && (
            <div className="alert text-success">{params.get("success")}</div>
          )}
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="my-2">
              <label
                className="label text-sm leading-5 font-semibold"
                htmlFor="email"
              >
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
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="my-2">
              <label
                className="label text-sm leading-5 font-semibold"
                htmlFor="password"
              >
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
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="btn btn-primary text-black w-full h-12 border border-primary"
              >
                {isSubmitting || loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
          <div className="text-center text-dark-grey font-semibold">
            Need an account?{" "}
            <Link
              className="link text-accent"
              href={`/register?callbackUrl=${callbackUrl}`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="loading text-white text-2xl">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Form;
