"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { loginUser } from "@/services/auth.service";
import authStore from "@/store/auth.store";

export default function LoginPage() {
  const router = useRouter();

  const setAuth = authStore((state) => state.setAuth);

  const {
    register,

    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      console.log("   Response: ", response);

      setAuth(
        response.user,

        response.token,
      );

      console.log(
        "   User: ",
        response.user,

        "   Token: ",
        response.token,
      );

      toast.success("Login Successful");

      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
    "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        w-100
        border
        p-6
        rounded-lg
        space-y-4
      "
      >
        <h1
          className="
          text-2xl
          font-bold
        "
        >
          Login
        </h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="
          w-full
          border
          p-2
          rounded
        "
        />

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="
          w-full
          border
          p-2
          rounded
        "
        />

        <button
          className="
          bg-black
          text-white
          px-4
          py-2
          rounded
        "
        >
          Login
        </button>
      </form>
    </div>
  );
}
