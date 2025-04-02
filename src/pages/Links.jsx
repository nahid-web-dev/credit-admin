"use client"

import { useState } from "react"
import { FaLink, FaInfoCircle, FaExternalLinkAlt, FaRegCopy, FaCheck, FaUser, FaLock, FaDesktop } from "react-icons/fa"
import { MdSecurity, MdInfo } from "react-icons/md"
import { BiLinkExternal, BiMessageDetail } from "react-icons/bi"
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck } from "react-icons/hi"
import { motion } from "framer-motion"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Mega Link Card with curved design
const MegaLinkCard = ({ title, url, icon, linkKey, handleCopy }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-indigo-500"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-indigo-500 p-2 rounded-full">{icon}</div>
          <h2 className="text-xl font-semibold text-indigo-800">{title}</h2>
        </div>

        <div className="bg-indigo-50 rounded-xl p-3 mb-3">
          <p className="text-indigo-700 text-sm truncate font-mono">{url}</p>
        </div>

        <div className="flex items-center gap-2 mb-4 text-indigo-600">
          <MdInfo className="text-lg flex-shrink-0" />
          <p className="text-xs text-gray-600">
            This link provides access to {title}. Use it to direct users to the appropriate platform.
          </p>
        </div>

        <motion.button
          onClick={() => handleCopy(url, linkKey)}
          className="w-full text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 py-3 px-4 rounded-xl flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          {isHovering ? (
            <HiOutlineClipboardCopy className="text-lg mr-2" />
          ) : (
            <HiOutlineClipboardCheck className="text-lg mr-2" />
          )}
          Copy to Clipboard
        </motion.button>
      </div>
    </motion.div>
  )
}

// Regular Link Card with sharp edges
const LinkCard = ({ title, url, icon, linkKey, handleCopy }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden border-l-4 border-sky-500 transition-all hover:shadow-blue-400 hover:shadow-[-5px_-5px_10px_2px] shadow-[5px_5px_10px_2px] shadow-blue-400"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-sky-500 p-2 rounded-md">{icon}</div>
          <h2 className="text-lg font-semibold text-sky-800">{title}</h2>
        </div>

        <div className="bg-sky-50 rounded-md p-3 mb-3">
          <p className="text-sky-700 text-sm truncate font-mono">{url}</p>
        </div>

        <div className="flex items-center gap-2 mb-3 text-sky-600">
          <BiMessageDetail className="text-lg flex-shrink-0" />
          <p className="text-xs text-gray-600">Click the button below to copy this {title} link to your clipboard.</p>
        </div>

        <motion.button
          onClick={() => handleCopy(url, linkKey)}
          className="w-full text-white bg-gradient-to-br transition-all from-sky-700 to-blue-600 hover:from-sky-900 hover:to-blue-600 py-2 px-4 rounded-md flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          {isHovering ? <FaRegCopy className="text-lg mr-2" /> : <FaCheck className="text-lg mr-2" />}
          Copy Link
        </motion.button>
      </div>
    </motion.div>
  )
}

const Links = () => {

  const userData = JSON.parse(localStorage.getItem("userData"))

  const username = userData?.email?.split("@")[0] || "nxnahidxyz"

  // Define all links in a single object for easier management
  const links = {

    credit_card: `https://credit-check.netlify.app/`,
  }

  // Handle copy to clipboard with toast notification
  const handleCopy = (url, name) => {
    navigator.clipboard.writeText(url)
    toast.success(`${name} link copied!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: <FaCheck className="text-green-500" />,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <ToastContainer />

      {/* Other Links Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-sky-500 p-2 rounded-lg">
            <FaLink className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-sky-800">Service Links</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LinkCard
            title="Credit Card Link"
            url={links.credit_card}
            icon={<FaLink className="text-white text-lg" />}
            linkKey="credit_card"
            handleCopy={handleCopy}
          />
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Admin Dashboard</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <FaLink className="text-blue-500" />
            <p>Access and manage all your links in one place</p>
          </div>
        </div>

        {/* How to use section */}
        <motion.div
          className="mb-10 bg-white p-6 rounded-xl border border-blue-200 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 p-3 rounded-full mt-1">
              <MdInfo className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">How to Use These Links</h2>
              <ol className="list-decimal ml-5 space-y-2 text-gray-600">
                <li>Find the link you need from the categories below</li>
                <li>Click the "Copy Link" button to copy the URL to your clipboard</li>
                <li>Paste the link in your browser or share it with others</li>
                <li>
                  Each link is personalized with your username:{" "}
                  <span className="bg-blue-100 px-2 py-1 rounded font-mono text-blue-700">{username}</span>
                </li>
              </ol>
            </div>
          </div>
        </motion.div>



        {/* Info Card */}
        <motion.div
          className="mt-10 bg-white p-6 rounded-xl shadow-lg border border-blue-200"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 p-3 rounded-full mt-1">
              <MdSecurity className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Security Notice</h3>
              <p className="text-gray-600 mb-3">
                These links are personalized for your account and should be shared securely. Each link contains your
                unique identifier.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  <FaInfoCircle className="text-blue-500 flex-shrink-0" />
                  <span>
                    Links are valid until your next session. For security reasons, avoid sharing these links on public
                    platforms.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Tools */}
        <motion.div
          className="mt-10 bg-white shadow-xl rounded-lg p-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Tools</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
              <div className="bg-blue-500 p-2 rounded-full">
                <FaUser className="text-white text-lg" />
              </div>
              <p className="text-gray-700">Manage users, view analytics, and more.</p>
            </div>
            <div className="flex items-center gap-3 bg-indigo-50 p-4 rounded-lg">
              <div className="bg-indigo-500 p-2 rounded-full">
                <FaLock className="text-white text-lg" />
              </div>
              <p className="text-gray-700">Secure login with admin privileges only.</p>
            </div>
            <div className="flex items-center gap-3 bg-sky-50 p-4 rounded-lg">
              <div className="bg-sky-500 p-2 rounded-full">
                <FaDesktop className="text-white text-lg" />
              </div>
              <p className="text-gray-700">Access your dashboard from any device.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Links

