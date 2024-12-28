import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaCalendarAlt, FaUserShield } from 'react-icons/fa';
import { db } from '../config/firebase';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';

const Users = () => {

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const managerRef = useRef(null)

  const [showPassword, setShowPassword] = useState(false);

  const [usersList, setUsersList] = useState(null)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const { isUserAuthenticated, userData, } = useOutletContext()

  const handleAddUser = async (e) => {

    if (userData?.role == 'user') {
      toast.error('Only Admins can create users!')
      return
    }

    e.preventDefault()
    try {

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", emailRef?.current?.value));
      const querySnapshot = await getDocs(q);

      // Step 2: If the email exists, show an error
      if (!querySnapshot.empty) {
        toast.error('User with this email already exists');
        return; // Exit function without creating a new user
      }

      const docRef = await addDoc(collection(db, 'users'), {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
        role: managerRef?.current?.checked ? 'manager' : 'user',
        createdBy: userData?.email,
        createdAt: Date.now()
      })
      toast.success('new user created!')
    } catch (error) {
      console.log(error?.message)
    }
  }


  useEffect(() => {
    let unsubscribe;
    try {
      const usersRef = collection(db, 'users')
      const q = userData?.role == 'admin' ? usersRef : query(usersRef, where('createdBy', '==', userData?.email));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedUsers = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        const sortedUsersList = updatedUsers.sort((a, b) => b?.createdAt - a?.createdAt)
        const filteredUsersList = sortedUsersList.filter((user) => user.role != 'admin')
        setUsersList(filteredUsersList)
      })
    } catch (error) {
      toast.error(error?.message)
    }
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])


  const handleRemove = async (id) => {
    if (userData?.role == 'user') {
      toast.error('Only Admins can remove users!')
      return
    }
    const isConfirmed = confirm('Are you sure removing the user?')
    if (!isConfirmed) {
      return
    }
    try {
      const docRef = doc(db, 'users', id)
      await deleteDoc(docRef)
      toast.success('user removed!')
    } catch (error) {
      toast.error(error?.message)
    }

  }


  if (!isUserAuthenticated) {
    return (
      <div></div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col py-[10vh] gap-6 md:gap-10 items-center justify-center bg-gray-50">
      <div className="w-[95%] max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create User
        </h2>
        <form className="space-y-4" onSubmit={handleAddUser}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                ref={emailRef}
                placeholder="Enter your email"
                className="flex-1 outline-none bg-transparent text-gray-700"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                ref={passwordRef}
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

          {/* Checkbox */}
          {
            userData?.role == 'admin' && <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                ref={managerRef}
                className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring focus:ring-sky-200"
              />
              <label
                htmlFor="agreeToTerms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Manager
              </label>
            </div>
          }

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition duration-200"
          >
            Create User
          </button>
        </form>
      </div>

      <div className="p-4 sm:px-14 mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Users Details</h1>
        <div className="flex flex-wrap justify-evenly gap-4">
          {usersList && usersList.map((item, index) => (

            <div
              key={index}
              className="bg-white shadow-md max:!w-[400px] min-w-[300px] rounded-lg p-4 flex flex-col items-start space-y-2 border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-500" />
                <span className="text-gray-700 font-medium break-all">{item.email}</span>
              </div>

              {
                userData?.role == 'admin' && <div className="flex items-center space-x-2">
                  <FaUser className="text-green-500" />
                  <span className="text-gray-600 ">Owner : {item.createdBy}</span>
                </div>
              }

              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-red-500" />
                <span className="text-gray-600">
                  {DateTime.fromMillis(Number(item?.createdAt)).setZone('Asia/Dhaka').toFormat('HH:mm:ss dd-MM-yyyy')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUserShield className="text-purple-500" />
                <span className="text-gray-600">Role: {item.role}</span>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default Users