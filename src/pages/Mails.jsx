import axios from 'axios';
import React, { useReducer, useRef, useState } from 'react'
import { BsHeartPulseFill } from 'react-icons/bs';
import { CiServer } from 'react-icons/ci';
import { FaDownload, FaHandHoldingHeart, FaScrewdriver, FaServer, FaStaylinked } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { LuSend } from 'react-icons/lu';
import { MdDownloadDone, MdStarBorderPurple500 } from 'react-icons/md';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoReloadOutline } from 'react-icons/io5';
import { TbReload } from 'react-icons/tb';

const Mails = () => {

  const emailsRef = useRef(null)

  // const mailServerUrl = 'https://mailer-app-j8m2.onrender.com'
  const mailServerUrl = 'http://localhost:4500'

  const [emailsSelected, setEmailsSelected] = useState(0)

  const { isUserAuthenticated, userData } = useOutletContext()

  const [serverStatus, setServerStatus] = useState('Need Test')

  const handleSend = async (mailType) => {
    if (emailsRef.current.value == '') {
      return toast.info('First Enter Emails!')
    }
    const isSure = confirm('Are You Sure Sending Emails?')
    if (!isSure) {
      return toast.info('Mission Exited!')
    }
    toast.info('Request sent! Please wait for response.')
    const emailsRefValue = emailsRef.current.value.split("\n")
    const emails = emailsRefValue.map((element) => {
      return element.split(" ")[0]
    })

    try {
      const response = await axios.post(`${mailServerUrl}/${mailType}`, {
        recipients: emails,
        owner: userData?.email.split('@')[0]
      })

      if (response.data.success) {
        return toast.success(response.data.message)
      }
      toast.error(response.data.message)
    } catch (error) {
      toast.error(error?.message)
    }
  }

  const handleChange = () => {
    const emailsRefValue = emailsRef.current.value.split("\n")
    setEmailsSelected(emailsRefValue?.length)
  }

  const testServer = async () => {
    console.log(serverStatus)
    if (serverStatus == 'Checking...') {
      return toast.info('Please wait and try again!')
    } else if (serverStatus == 'OK') {
      return toast.success('Server is Ok.')
    }
    if (serverStatus == 'Need Test' || serverStatus == 'Down') {
      setServerStatus('Checking...')
      const response = await axios.get(`${mailServerUrl}/`)
      if (response.data.success) {
        setServerStatus('OK')
        setTimeout(() => {
          console.log('time out function runned!')
          setServerStatus('Need Test')
        }, 30000);
        return toast.success(response.data.message)
      }
      setServerStatus('Down')
      return toast.error('Seems server is down!')
    }
    toast.info('Please wait and try again!')
  }

  if (!isUserAuthenticated) {
    return (
      <div></div>
    )
  }

  return (
    <div className="p-6 bg-slate-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Icon and Header */}
        <div className="flex items-center mb-4">
          <FiEdit2 className="text-blue-500 text-2xl mr-2" />
          <h2 className="text-xl font-semibold text-slate-700">Enter Emails</h2>
        </div>


        <h2 className=' text-xl my-4 text-white bg-slate-600 px-3 rounded-lg py-1 font-semibold '>NOTE* Enter Only 1 Email Each line.</h2>

        {/* Textarea */}
        <textarea
          ref={emailsRef}
          onChange={handleChange}
          placeholder="Type something here..."
          className="w-full h-40 resize-none overflow-y-scroll hide-scrollbar border border-slate-300 rounded-md p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="1"
        />

        {/* Content Length */}
        <div className="text-right mt-2 text-sky-600 font-semibold">
          {emailsSelected} selected
        </div>

        <div className=' px-2 flex flex-col justify-between items-center'>
          <div className=' text-3xl font-semibold flex justify-center gap-2 items-center'> <h2 className=' text-xl'>Server Status :</h2>
            {serverStatus == 'Checking...' ? <Spinner className='text-sky-600' /> :
              serverStatus == 'OK' ? <MdDownloadDone className=' text-green-600' /> :
                serverStatus == 'Down' ? <FaDownload className=' text-red-600' /> :
                  <TbReload className=' text-sky-600 ' />}
          </div>
          <button onClick={() => testServer()} className=' flex justify-center items-center gap-1 text-lg font-semibold text-white bg-sky-600 px-5 h-10 my-3 mx-auto rounded-lg hover:px-6 hover:bg-sky-500 transition-all ' >Test <FaServer /> Server
          </button>
        </div>

        <h2 className=' text-center text-xl py-1 mb-1 text-slate-700 border-b border-slate-600 font-semibold'>Test The Server Before Sending Mails!</h2>

        <div className=' px-2 flex justify-between items-center'>
          <button onClick={() => handleSend('tryst-msg')} className=' flex justify-center items-center gap-1 text-lg font-semibold text-white bg-pink-600 px-5 h-10 my-3 rounded-lg hover:px-6 hover:bg-pink-500 transition-all '>Tryst || Msg <LuSend className=' relative top-[2px]' />
          </button>
          <FaHandHoldingHeart className=' animate-bounce relative text-4xl text-sky-500' />
        </div>


        <div className=' flex justify-center'>
          <h2 className='  flex justify-center gap-1 items-center text-xl font-semibold border-2 border-sky-500 rounded-sm py-1 px-2 text-stone-700 cursor-default'>Tryst.link <BsHeartPulseFill className=' animate-ping text-3xl text-pink-700' /></h2>
        </div>

        <div className=' px-2 flex justify-between items-center'>
          <FaStaylinked className=' animate-bounce text-4xl text-sky-500' />
          <button onClick={() => toast.error('This option is not currently available!')} className=' flex justify-center items-center gap-1 text-lg font-semibold text-white bg-pink-600 px-5 h-10 my-3 rounded-lg hover:px-6 hover:bg-pink-500 transition-all '>Tryst || TLC <LuSend className=' relative top-[2px]' /></button>
        </div>

      </div>
    </div>
  );
}

export default Mails