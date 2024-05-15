"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const { data: session, update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue("name", session.user.name!);
      setValue("email", session.user.email!);
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        };
        await update(newSession);
      } else {
        const data = await res.json();
        toast.error(data.message || "error");
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-primary mb-4">Profile</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-dark-grey mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.name?.message && (
            <div className="text-sm text-red-600 mt-1">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-dark-grey mb-1"
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
            className="input input-bordered w-full"
          />
          {errors.email?.message && (
            <div className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-dark-grey mb-1"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {})}
            className="input input-bordered w-full"
          />
          {errors.password?.message && (
            <div className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-dark-grey mb-1"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Passwords should match!";
              },
            })}
            className="input input-bordered w-full"
          />
          {errors.confirmPassword?.message && (
            <div className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting && <span className="loading loading-spinner"></span>}
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
