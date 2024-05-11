// "use client";
// import { signIn, useSession } from "next-auth/react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";

// type Inputs = {
//   email: string;
//   password: string;
// };

// const Form = () => {
//   const { data: session } = useSession();

//   const params = useSearchParams();
//   let callbackUrl = params.get("callbackUrl") || "/";
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<Inputs>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     if (session && session.user) {
//       router.push(callbackUrl);
//     }
//   }, [callbackUrl, params, router, session]);

//   const formSubmit: SubmitHandler<Inputs> = async (form) => {
//     const { email, password } = form;
//     signIn("credentials", {
//       email,
//       password,
//     });
//   };
//   return (
//     <div className="max-w-sm  mx-auto card bg-dark-300 my-4">
//       <div className="card-body">
//         <h1 className="card-title">Sign in</h1>
//         {params.get("error") && (
//           <div className="alert text-error">
//             {params.get("error") === "CredentialsSignin"
//               ? "Invalid email or password"
//               : params.get("error")}
//           </div>
//         )}
//         {params.get("success") && (
//           <div className="alert text-success">{params.get("success")}</div>
//         )}
//         <form onSubmit={handleSubmit(formSubmit)}>
//           <div className="my-2">
//             <label className="label" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="text"
//               id="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
//                   message: "Email is invalid",
//                 },
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.email?.message && (
//               <div className="text-error">{errors.email.message}</div>
//             )}
//           </div>
//           <div className="my-2">
//             <label className="label" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               {...register("password", {
//                 required: "Password is required",
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.password?.message && (
//               <div className="text-error">{errors.password.message}</div>
//             )}
//           </div>
//           <div className="my-4">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="btn btn-primary w-full bg-primary rounded-md"
//             >
//               {isSubmitting && (
//                 <span className="loading loading-spinner"></span>
//               )}
//               Sign in
//             </button>
//           </div>
//         </form>
//         <div>
//           Need an account?{" "}
//           <Link className="link" href={`/register?callbackUrl=${callbackUrl}`}>
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Form;

"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const { data: session } = useSession();

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
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-grey">
      <div className="card max-w-sm bg-white rounded-lg shadow-lg">
        <h1 className="text-primary text-3xl font-bold mb-4 bg-primary text-white p-2 rounded-t-lg">
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
              <label className="label text-dark-grey" htmlFor="email">
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
                className="input input-bordered w-full text-dark-grey bg-white border border-gray-300 h-12"
              />
              {errors.email?.message && (
                <div className="text-error text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="my-2">
              <label className="label text-dark-grey" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="input input-bordered w-full text-dark-grey bg-white border border-gray-300 h-12"
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
                disabled={isSubmitting}
                className="btn bg-primary text-white w-full h-12 border border-primary"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center text-dark-grey">
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
    </div>
  );
};

export default Form;
