import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { db } from '../config/firebase';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const { setUserData, setIsUserAuthenticated } = useOutletContext()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Query the Firestore users collection
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", emailRef?.current?.value), where("password", "==", passwordRef?.current?.value)); // Insecure: Avoid plaintext passwords
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.info("Invalid email or password");
      } else {
        const userInfo = querySnapshot.docs[0].data();

        localStorage.setItem('userData', JSON.stringify(userInfo))
        localStorage.setItem('isUserAuthenticated', JSON.stringify(true))
        setUserData(userInfo)
        setIsUserAuthenticated(true)

        toast.success("Login Successful!")
        return navigate('/')
      }
    } catch (err) {
      toast.error("Error logging in:", err?.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className=" sm:w-full w-[95%]  max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        <form className="space-y-4 " onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter your email"
                className="flex-1 outline-none bg-transparent text-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="flex-1 outline-none bg-transparent text-gray-700"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring focus:ring-sky-200"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-sky-600 hover:underline focus:outline-none"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a
            href="#"
            className="text-sky-600 hover:underline focus:outline-none"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login