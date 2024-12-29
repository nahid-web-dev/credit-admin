'use client'
import { Link } from 'react-router-dom'
import { FaFacebookMessenger, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { FaSquareFacebook } from 'react-icons/fa6'

const Footer = () => {

  const whatsAppText = encodeURIComponent("Hi, I visited your Hack Tool.")
  const encodedText = `https://wa.me/8801317488951?text=${whatsAppText}`


  return (
    <div className='my-4 relative border-t-2 border-sky-200 py-3'>
      <div>
        <ul className=' text-4xl text-blue-500 flex justify-center gap-6'>
          <li><Link to='https://www.facebook.com/abdullah.al.nahid.732563' target='_blank'><FaSquareFacebook /></Link></li>
          <li><Link to='https://www.facebook.com/abdullah.al.nahid.732563' target='_blank'><FaFacebookMessenger className='text-indigo-700' /></Link></li>
          <li><Link to={encodedText} target='_blank'><FaWhatsapp className=' text-green-500' /></Link></li>
        </ul>
        <h2 className=' justify-center mt-4 flex items-center text-lg sm:text-2xl gap-2 text-stone-500 font-medium'>
          <FaPhoneAlt className=' text-green-500' /> 01607-402797        </h2>
        <h2 className=' text-xl sm:text-3xl text-center py-2 sm:py-4 text-stone-700 border-b-2 border-sky-400'>Contact Us</h2>
        <p className=' text-xs sm:text-lg text-center text-blue-600 mt-2'>Copyright 2024 © tools-panel - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer


// import React from "react";
// import { Link } from "react-router-dom";
// import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-blue-800 text-white py-6">
//       <div className="container mx-auto px-4">
//         {/* Footer Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* About Section */}
//           <div>
//             <h3 className="text-lg font-bold mb-2">About</h3>
//             <p className="text-sm">
//               This is a responsive admin panel dashboard footer built with React
//               and Tailwind CSS. Add your own content here!
//             </p>
//           </div>

//           {/* Links Section */}
//           <div>
//             <h3 className="text-lg font-bold mb-2">Quick Links</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link to="/admin-panel" className="hover:underline">
//                   Admin Panel
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard" className="hover:underline">
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/analytics" className="hover:underline">
//                   Analytics
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/reports" className="hover:underline">
//                   Reports
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Social Media Section */}
//           <div>
//             <h3 className="text-lg font-bold mb-2">Follow Us</h3>
//             <div className="flex space-x-4">
//               <Link
//                 to="#"
//                 className="text-white hover:text-blue-400 transition"
//                 aria-label="Facebook"
//               >
//                 <FaFacebook size={24} />
//               </Link>
//               <Link
//                 to="#"
//                 className="text-white hover:text-blue-400 transition"
//                 aria-label="Twitter"
//               >
//                 <FaTwitter size={24} />
//               </Link>
//               <Link
//                 to="#"
//                 className="text-white hover:text-blue-400 transition"
//                 aria-label="Instagram"
//               >
//                 <FaInstagram size={24} />
//               </Link>
//               <Link
//                 to="#"
//                 className="text-white hover:text-blue-400 transition"
//                 aria-label="Github"
//               >
//                 <FaGithub size={24} />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-6 text-center border-t border-blue-600 pt-4">
//           <p className="text-sm">
//             © {new Date().getFullYear()} Your Admin Panel. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
