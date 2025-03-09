import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaCalendarAlt, FaUserShield, FaUserPlus, FaUsers, FaInfoCircle, FaTrash, FaUserCog, FaUserEdit } from 'react-icons/fa';
import { db } from '../config/firebase';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';
import { RoleCodesContext } from '../store/RoleCodes';
import { motion, AnimatePresence } from 'framer-motion';

const Users = () => {
  const emailRef = useRef(null)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const managerRef = useRef(null)

  const { ADMIN_ROLE_CODE, MANAGER_ROLE_CODE, USER_ROLE_CODE } = useContext(RoleCodesContext)

  const [showPassword, setShowPassword] = useState(false);
  const [usersList, setUsersList] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [stats, setStats] = useState({ managers: 0, users: 0, total: 0 });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { isUserAuthenticated, userData } = useOutletContext()

  const handleAddUser = async (e) => {
    if (userData?.role == USER_ROLE_CODE) {
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
        username: usernameRef?.current?.value,
        password: passwordRef?.current?.value,
        role: managerRef?.current?.checked ? MANAGER_ROLE_CODE : USER_ROLE_CODE,
        createdBy: userData?.email,
        createdAt: Date.now()
      })
      toast.success('new user created!')

      // Clear form fields after successful submission
      emailRef.current.value = '';
      passwordRef.current.value = '';
      if (managerRef.current) managerRef.current.checked = false;
    } catch (error) {
      console.log(error?.message)
    }
  }

  useEffect(() => {
    let unsubscribe;
    setIsLoading(true);

    try {
      const usersRef = collection(db, 'users')
      const q = userData?.role == ADMIN_ROLE_CODE ? usersRef : query(usersRef, where('createdBy', '==', userData?.email));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedUsers = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        const sortedUsersList = updatedUsers.sort((a, b) => b?.createdAt - a?.createdAt)
        const filteredUsersList = sortedUsersList.filter((user) => user.role != ADMIN_ROLE_CODE)
        setUsersList(filteredUsersList)

        // Calculate stats
        const managers = filteredUsersList.filter(user => user.role === MANAGER_ROLE_CODE).length;
        const regularUsers = filteredUsersList.filter(user => user.role === USER_ROLE_CODE).length;
        setStats({
          managers,
          users: regularUsers,
          total: filteredUsersList.length
        });

        setIsLoading(false);
      })
    } catch (error) {
      toast.error(error?.message)
      setIsLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [userData])

  const handleRemove = async (id) => {
    if (userData?.role == USER_ROLE_CODE) {
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

  const handleUserClick = (user) => {
    setSelectedUser(selectedUser?.id === user.id ? null : user);
  };

  if (!isUserAuthenticated) {
    return <div></div>
  }

  return (
    <div className="min-h-screen flex flex-col py-[10vh] gap-6 md:gap-10 items-center justify-center bg-gray-50">
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[95%] max-w-md flex justify-between bg-white shadow-md rounded-lg p-4 mb-2"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          <FaUsers className="text-sky-600 text-xl mb-1" />
          <span className="text-lg font-bold text-gray-800">{stats.total}</span>
          <span className="text-xs text-gray-500">Total</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          <FaUserCog className="text-purple-600 text-xl mb-1" />
          <span className="text-lg font-bold text-gray-800">{stats.managers}</span>
          <span className="text-xs text-gray-500">Managers</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          <FaUser className="text-green-600 text-xl mb-1" />
          <span className="text-lg font-bold text-gray-800">{stats.users}</span>
          <span className="text-xs text-gray-500">Users</span>
        </motion.div>
      </motion.div>

      {/* Create User Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[95%] max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <div className="flex items-center justify-center mb-6">
          <FaUserPlus className="text-sky-600 text-2xl mr-2" />
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            Create User
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleAddUser}>
          {/* Email Field */}


          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              User Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="text"
                ref={usernameRef}
                placeholder="Enter Username"
                className="flex-1 outline-none bg-transparent text-gray-700"
                required
              />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
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
          </motion.div>

          {/* Password Field */}
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
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
              <motion.button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600"
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </div>
          </motion.div>

          {/* Checkbox */}
          {userData?.role == ADMIN_ROLE_CODE && (
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
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
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-2 text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create User
          </motion.button>
        </form>
      </motion.div>

      {/* User List Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-4 sm:px-14 mx-auto w-full max-w-5xl"
      >
        <div className="flex items-center justify-center mb-6">
          <FaUsers className="text-sky-600 text-2xl mr-2" />
          <h1 className="text-2xl font-bold text-center">Users Details</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="flex flex-wrap justify-evenly gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {usersList && usersList.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white shadow-md max:!w-[400px] min-w-[300px] rounded-lg p-4 flex flex-col items-start space-y-2 border hover:shadow-xl transition-shadow duration-300"
                  onClick={() => handleUserClick(item)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.id);
                      }}
                      className="text-red-500 hover:text-red-700 font-bold text-sm flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash className="mr-1" /> Remove
                    </motion.button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-blue-500" />
                    <span className="text-gray-700 font-medium break-all">{item.email}</span>
                  </div>

                  {
                    item?.username && (
                      <div className="flex items-center space-x-2">
                        <FaUserEdit className="text-orange-500" />
                        <span className="text-gray-700 font-medium break-all">{item?.username}</span>
                      </div>
                    )
                  }

                  {userData?.role == ADMIN_ROLE_CODE && (
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-green-500" />
                      <span className="text-gray-600">Owner: {item.createdBy}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-red-500" />
                    <span className="text-gray-600">
                      {DateTime.fromMillis(Number(item?.createdAt)).setZone('Asia/Dhaka').toFormat('HH:mm:ss dd-MM-yyyy')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaUserShield className="text-purple-500" />
                    <span className="text-gray-600">Role: {item.role === MANAGER_ROLE_CODE ? 'Manager' : 'User'}</span>
                  </div>

                  {/* Additional info that shows on click */}
                  <AnimatePresence>
                    {selectedUser?.id === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full mt-2 pt-2 border-t border-gray-200"
                      >
                        <div className="flex items-start space-x-2 text-sm">
                          <FaInfoCircle className="text-sky-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-600 mb-1">
                              <span className="font-semibold">Account age:</span> {Math.floor((Date.now() - item.createdAt) / (1000 * 60 * 60 * 24))} days
                            </p>
                            <p className="text-gray-600 mb-1">
                              <span className="font-semibold">Access level:</span> {item.role === MANAGER_ROLE_CODE ? 'Can create users' : 'Standard access'}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Created by:</span> {item.createdBy}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {usersList && usersList.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-10 bg-white rounded-lg shadow-sm"
          >
            <FaUsers className="text-gray-300 text-5xl mx-auto mb-3" />
            <p className="text-gray-500">No users found. Create your first user above.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Users
