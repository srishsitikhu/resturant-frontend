"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const SideBar = () => {
    const router= useRouter()
  return (
    <div className='flex flex-col justify-between'>
        <ul>
            <li onClick={() => router.push("/")}>Home</li>
            <li onClick={() => router.push("/")}>About</li>
            <li onClick={() => router.push("/")}>Contact</li>
        </ul>
        <ul className='flex whitespace-nowrap truncate gap-2 text-base'>
            <li onClick={() => router.push("/")}>Sign In</li>
            <li onClick={() => router.push("/")}>Sign Out</li>
        </ul>
    </div>
  );
}

export default SideBar
