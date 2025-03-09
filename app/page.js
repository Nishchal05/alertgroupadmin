"use client"
import React, { useContext } from 'react'
import Link from 'next/link'
import { datatransfer } from './_component/context'

const page = () => {
  const {usertype}=useContext(datatransfer);
  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <div className="grid grid-cols-3 gap-4">
        {/* First Box */}
        <div className=" cursor-pointer p-6 h-[200px] flex justify-center items-center bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href='/JobSection'>
            <h1 className="text-xl font-bold text-white cursor-pointer">Job Section</h1>
          </Link>
        </div>

        {/* Second Box */}
        <div className=" cursor-pointer p-6 h-[200px] flex justify-center items-center bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href='/SecurityServices'>
            <h1 className="text-xl font-bold text-white cursor-pointer">Security Services</h1>
          </Link>
        </div>

        {/* Third Box */}
        <div className=" cursor-pointer p-6 h-[200px] flex justify-center items-center bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href='/JobApplication'>
            <h1 className="text-xl font-bold text-white cursor-pointer">Job Application</h1>
          </Link>
        </div>
        <div className=" cursor-pointer p-6 h-[200px] flex justify-center items-center bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href='/Request'>
            <h1 className="text-xl font-bold text-white cursor-pointer">Requests</h1>
          </Link>
        </div>
        {
          usertype && <div className=" cursor-pointer p-6 h-[200px] flex justify-center items-center bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href='/Employdata'>
            <h1 className="text-xl font-bold text-white cursor-pointer">Employ's</h1>
          </Link>
        </div>
        }
      </div>
    </div>
  )
}

export default page
