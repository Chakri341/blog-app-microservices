"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { registerUser } from "../../services/auth.service";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,

    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      toast.success("Registered Successfully");

      router.push("/login");
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
        className="w-100 border p-6 rounded-lg space-y-4       "
      >
        <h1
          className="
          text-2xl
          font-bold
        "
        >
          Register
        </h1>

        <input
          {...register("name")}
          placeholder="Name"
          className="
          w-full
          border
          p-2
          rounded
        "
        />

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
          Register
        </button>
      </form>
    </div>
  );
}
