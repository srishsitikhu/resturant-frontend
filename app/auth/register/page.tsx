"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineAccountCircle, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm, FieldValues, set } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showNotification } from "@/redux/NotificationSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();

  const onSubmit = async (data: FieldValues) => {
    try {
      const emailResponse = await axios.post(
        `${serverUrl}/api/users/checkEmail`,
        { email: data.email }
      );

      if (emailResponse.data.userExists) {
        setError("email", { message: emailResponse.data.message });
        return;
      } else {
        await axios.post(`${serverUrl}/auth/register`, data);
        dispatch(
          showNotification({
            message: "Registeration succesfull",
            type: "success",
          })
        );
      }
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="my-20 laptop:max-w-[500px] laptop:min-w-[500px] laptop:m-auto px-2 laptop:px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container shadow-xl flex flex-col gap-4 py-8"
      >
        <h1 className="heading text-center">Create an Account</h1>
        <div className="relative flex flex-col">
          <label htmlFor="FullName">Full Name</label>
          <input
            {...register("name", { required: "Name is Required" })}
            type="text"
            className="border border-neutral-400 py-2 px-4 pl-10 rounded-lg"
          />
          {errors.name && (
            <span className="text-red-500 text-base">
              {String(errors?.name?.message)}
            </span>
          )}
          <MdOutlineAccountCircle size={20} className="absolute top-9 left-3" />
        </div>
        <div className="relative flex flex-col">
          <label htmlFor="Email Address">Email Address</label>
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email Address",
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
        <div className="relative flex flex-col">
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required.",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            type={showConfirmPassword ? "text" : "password"}
            className="border border-neutral-400 py-2 px-4 pl-10 rounded-lg"
          />
          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-10 right-4 cursor-pointer"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeLowVision />}
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-base">
              {String(errors?.confirmPassword?.message)}
            </span>
          )}
          <RiLockPasswordLine size={20} className="absolute top-9 left-3" />
        </div>
        <button className="bg-[#d97708] cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 text-neutral-200 py-4 rounded-lg text-xl">
          Sign Up
        </button>
        <p className="text-center px-4 py-2">
          Already have an account?
          <span
            className="text-[#d97708] cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Sign in
          </span>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
