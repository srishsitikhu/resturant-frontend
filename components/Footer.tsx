import Link from 'next/link';
import React from 'react'
import { CiForkAndKnife } from 'react-icons/ci'
import { FaInstagram, FaRegEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiFacebook } from 'react-icons/fi';
import { LuMapPin } from 'react-icons/lu';
import { MdOutlinePhone } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className='py-12 bg-gray-900 text-white'>
            <div className="container">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className='footer-info'>
                        <Link href="/" className="items-center mb-4 text-xl font-bold flex gap-2 text-amber-600">
                            <CiForkAndKnife className='text-white' />
                            <span>FootSpot</span>
                        </Link>
                        <p className="text-gray-400 mb-4">Discover the best restaurants in your area. FoodSpot helps you find and manage your favorite dining destinations.</p>
                        <div className="flex space-x-4">
                            <Link href='#' className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Facebook" target='_blank'>
                                <FiFacebook />
                            </Link>
                            <Link href='#' className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Instragram" target='_blank'>
                                <FaInstagram />
                            </Link>
                            <Link href='#' className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Twitter" target='_blank'>
                                <FaXTwitter />
                            </Link>
                        </div>
                    </div>
                    <div className='footer-item'>
                        <h3 className="text-lg font-semibold mb-4 text-amber-500">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href='/' className="text-gray-400 hover:text-amber-500 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href='/about' className="text-gray-400 hover:text-amber-500 transition-colors">About</Link>
                            </li>
                            <li>
                                <Link href='/auth/login' className="text-gray-400 hover:text-amber-500 transition-colors">Sign In</Link>
                            </li>
                            <li>
                                <Link href='/auth/register' className="text-gray-400 hover:text-amber-500 transition-colors">Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-item'>
                        <h3 className="text-lg font-semibold mb-4 text-amber-500">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href='#' className="text-gray-400 hover:text-amber-500 transition-colors">Italian</Link>
                            </li>
                            <li>
                                <Link href='#' className="text-gray-400 hover:text-amber-500 transition-colors">Japanese</Link>
                            </li>
                            <li>
                                <Link href='#' className="text-gray-400 hover:text-amber-500 transition-colors">Mexican</Link>
                            </li>
                            <li>
                                <Link href='#' className="text-gray-400 hover:text-amber-500 transition-colors">Indian</Link>
                            </li>
                            <li>
                                <Link href='#' className="text-gray-400 hover:text-amber-500 transition-colors">View All</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='footer-item'>
                        <h3 className="text-lg font-semibold mb-4 text-amber-500">Contact Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <span className="text-gray-400 transition-colors flex items-center gap-2">
                                    <LuMapPin className='text-amber-500'/>
                                    <span>Bhaktapur 7, Nepal</span>
                                </span>
                            </li>
                            <li>
                                <Link href='tel: (123) 456-7890' className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                                    <MdOutlinePhone  className='text-amber-500'/>
                                    <span>(123) 456-7890</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='mailto: example@example.com' className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                                    <FaRegEnvelope  className='text-amber-500'/>
                                    <span>example@example.com</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
                    <p>© 2025 FoodSpot. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
