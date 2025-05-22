"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdOutlineAccountCircle, MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const RegisterPage = () => {
  const router = useRouter();
  return (
    <section className="my-20 max-w-[500px] min-w-[500px] m-auto px-4">
      <form className="container shadow-xl flex flex-col gap-4 py-8">
        <h1 className="heading text-center">Create an Account</h1>
        <div className="relative flex flex-col">
          <label htmlFor="FullName">Full Name</label>
          <input
            type="text"
            className="border border-neutral-400 py-2 px-4 pl-10 rounded-lg"
          />
          <MdOutlineAccountCircle size={20} className="absolute top-9 left-3" />
        </div>
        <div className="relative flex flex-col">
          <label htmlFor="Email Address">Email Address</label>
          <input
            type="text"
            className="border border-neutral-400 py-2 px-4 pl-10 rounded-lg"
          />
          <MdOutlineEmail size={20} className="absolute top-9 left-3" />
        </div>
        <div className="relative flex flex-col">
          <label htmlFor="Password">Password</label>
          <input
            type="text"
            className="border border-neutral-400 py-2 px-4 pl-10 rounded-lg"
          />
          <RiLockPasswordLine size={20} className="absolute top-9 left-3" />
        </div>
        <div className="relative flex flex-col">
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="text"
            className="border border-neutral-400 py-2 px-4 pl-10 rounded-lg"
          />
          <RiLockPasswordLine size={20} className="absolute top-9 left-3" />
        </div>
        <button className="bg-[#d97708] text-neutral-200 py-4 rounded-lg text-xl">
          Sign Up
        </button>
        <p className="text-center px-4 py-2">
          Already have an account?
          <span className="text-[#d97708] cursor-pointer" onClick={()=>router.push("/auth/login")}>Sign in</span>
        </p>
      </form>
    </section>
  );
}

export default RegisterPage
