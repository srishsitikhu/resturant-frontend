"use client";
import { showNotification } from "@/redux/NotificationSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: `onChange` });

  const dispatch = useDispatch();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        data
      );
      reset();
      dispatch(
        showNotification({
          message: "Login Successfull",
          type: "success",
        })
      );
      if (response) {
        localStorage.setItem("token", response.data.token);
        document.cookie = `token=${response.data.token}; path=/;`;
      }
      router.push("/admin/users");
    } catch (error: any) {
      dispatch(
        showNotification({
          message: "Failed to Login Account",
          type: "error",
        })
      );
      console.log(error);
      setError("password", { message: error.response.data.error });
    }
  };

  const router = useRouter();
  return (
    <section className="my-20 max-w-[500px] min-w-[500px] m-auto px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container shadow-xl flex flex-col gap-4 border py-8"
      >
        <h1 className="heading text-center">Sign In</h1>
        <div className="relative flex flex-col">
          <label htmlFor="Email location">Email location</label>
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email location",
              },
            })}
            type="text"
            className="border border-neutral-400 py-2 px-4 pl-10 rounded-lg"
          />
          {errors.email && (
            <span className="text-red-500 text-base">
              {String(errors?.email?.message)}
            </span>
          )}
          <MdOutlineEmail size={20} className="absolute top-9 left-3" />
        </div>
        <div className="relative flex flex-col">
          <label htmlFor="Password">Password</label>
          <input
            {...register("password", {
              required: "Password is required.",
            })}
            type={showPassword ? "text" : "password"}
            className="border border-neutral-400 py-2 px-4 pl-10 rounded-lg"
          />
          {errors.password && (
            <span className="text-red-500 text-base">
              {String(errors?.password?.message)}
            </span>
          )}
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-10 right-4 cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeLowVision />}
          </div>

          <RiLockPasswordLine size={20} className="absolute top-9 left-3" />
        </div>
        <button className="bg-lime-800    text-neutral-200 py-4 rounded-lg text-xl">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
