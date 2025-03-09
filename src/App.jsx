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
  const [myMegaItems, setMyMegaItems] = useState(null)
  const [myTrystItems, setMyTrystItems] = useState(null)
  const [myEroticMonkeyItems, setMyEroticMonkeyItems] = useState(null)
  const [myAdultSearchItems, setMyAdultSearchItems] = useState(null)
  const [myCallEscortItems, setMyCallEscortItems] = useState(null)
  const [myHotItems, setMyHotItems] = useState(null)

  // Refs for all data items to track changes
  const myDataValueRef = useRef(null)
  const myMegaValueRef = useRef(null)
  const myTrystValueRef = useRef(null)
  const myEroticMonkeyValueRef = useRef(null)
  const myAdultSearchValueRef = useRef(null)
  const myCallEscortValueRef = useRef(null)
  const myHotValueRef = useRef(null)

  const [ownedEmails, setOwnedEmails] = useState([userData?.email])

  const navigate = useNavigate()

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
      const usersRef = collection(db, 'users')
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
    let unsubscribe2
    let unsubscribe3
    let unsubscribe4
    let unsubscribe5
    let unsubscribe6
    let unsubscribe7

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
        const dataRef = collection(db, "data")
        const q1 = userData?.role === ADMIN_ROLE_CODE
          ? query(dataRef, orderBy("createdAt", "desc"))
          : query(dataRef, where("owner", "in", emailList), orderBy("createdAt", "desc"))

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

        // 2. Mega Items Collection
        const megaRef = collection(db, "mega")
        const q2 = userData?.role === ADMIN_ROLE_CODE
          ? query(megaRef, orderBy("createdAt", "desc"))
          : query(megaRef, where("owner", "in", emailList), orderBy("createdAt", "desc"))

        unsubscribe2 = onSnapshot(q2, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setMyMegaItems(updatedData)

          // Check if there's new data and play sound + navigate
          if (myMegaValueRef.current.value !== '' && updatedData?.length > Number(myMegaValueRef.current.value)) {
            toast.success('New data in Mega')
            ringRef.current.play()
            setIsRingPlaying(true)
            myMegaValueRef.current.value = updatedData?.length
            navigate('/dashboard/mega')
          }
          myMegaValueRef.current.value = updatedData?.length
        })

        // 3. Tryst Items Collection
        const trystRef = collection(db, "tryst")
        const q3 = userData?.role === ADMIN_ROLE_CODE
          ? query(trystRef, orderBy("createdAt", "desc"))
          : query(trystRef, where("owner", "in", emailList), orderBy("createdAt", "desc"))

        unsubscribe3 = onSnapshot(q3, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setMyTrystItems(updatedData)

          // Check if there's new data and play sound + navigate
          if (myTrystValueRef.current.value !== '' && updatedData?.length > Number(myTrystValueRef.current.value)) {
            toast.success('New data in Tryst')
            ringRef.current.play()
            setIsRingPlaying(true)
            myTrystValueRef.current.value = updatedData?.length
            navigate('/dashboard/tryst')
          }
          myTrystValueRef.current.value = updatedData?.length
        })

        // 4. Erotic Monkey Items Collection
        const eroticMonkeyRef = collection(db, "eroticmonkey")
        const q4 = userData?.role === ADMIN_ROLE_CODE
          ? query(eroticMonkeyRef, orderBy("createdAt", "desc"))
          : query(eroticMonkeyRef, where("owner", "in", emailList), orderBy("createdAt", "desc"))

        unsubscribe4 = onSnapshot(q4, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setMyEroticMonkeyItems(updatedData)

          // Check if there's new data and play sound + navigate
          if (myEroticMonkeyValueRef.current.value !== '' && updatedData?.length > Number(myEroticMonkeyValueRef.current.value)) {
            toast.success('New data in Erotic Monkey')
            ringRef.current.play()
            setIsRingPlaying(true)
            myEroticMonkeyValueRef.current.value = updatedData?.length
            navigate('/dashboard/eroticmonkey')
          }
          myEroticMonkeyValueRef.current.value = updatedData?.length
        })

        // 5. Adult Search Items Collection
        const adultSearchRef = collection(db, "adultsearch")
        const q5 = userData?.role === ADMIN_ROLE_CODE
          ? query(adultSearchRef, orderBy("createdAt", "desc"))
          : query(adultSearchRef, where("owner", "in", emailList), orderBy("createdAt", "desc"))

        unsubscribe5 = onSnapshot(q5, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setMyAdultSearchItems(updatedData)

          // Check if there's new data and play sound + navigate
          if (myAdultSearchValueRef.current.value !== '' && updatedData?.length > Number(myAdultSearchValueRef.current.value)) {
            toast.success('New data in Adult Search')
            ringRef.current.play()
            setIsRingPlaying(true)
            myAdultSearchValueRef.current.value = updatedData?.length
            navigate('/dashboard/adultsearch')
          }
          myAdultSearchValueRef.current.value = updatedData?.length
        })

        // 6. Call Escort Items Collection
        const callEscortRef = collection(db, "call_escort")
        const q6 = userData?.role === ADMIN_ROLE_CODE
          ? query(callEscortRef, orderBy("createdAt", "desc"))
          : query(callEscortRef, where("owner", "in", emailList), orderBy("createdAt", "desc"))

        unsubscribe6 = onSnapshot(q6, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setMyCallEscortItems(updatedData)

          // Check if there's new data and play sound + navigate
          if (myCallEscortValueRef.current.value !== '' && updatedData?.length > Number(myCallEscortValueRef.current.value)) {
            toast.success('New data in Call Escort')
            ringRef.current.play()
            setIsRingPlaying(true)
            myCallEscortValueRef.current.value = updatedData?.length
            navigate('/dashboard/call_escort')
          }
          myCallEscortValueRef.current.value = updatedData?.length
        })

        // 7. Hot Items Collection
        const hotRef = collection(db, "hot")
        const q7 = userData?.role === ADMIN_ROLE_CODE
          ? query(hotRef, orderBy("createdAt", "desc"))
          : query(hotRef, where("owner", "in", emailList), orderBy("createdAt", "desc"))

        unsubscribe7 = onSnapshot(q7, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setMyHotItems(updatedData)

          // Check if there's new data and play sound + navigate
          if (myHotValueRef.current.value !== '' && updatedData?.length > Number(myHotValueRef.current.value)) {
            toast.success('New data in Hot')
            ringRef.current.play()
            setIsRingPlaying(true)
            myHotValueRef.current.value = updatedData?.length
            navigate('/dashboard/hot')
          }
          myHotValueRef.current.value = updatedData?.length
        })
      } catch (error) {
        toast.error(error?.message)
      }
    }

    handleUseEffectAction()

    // Clean up all subscriptions when component unmounts
    return () => {
      if (unsubscribe1) unsubscribe1()
      if (unsubscribe2) unsubscribe2()
      if (unsubscribe3) unsubscribe3()
      if (unsubscribe4) unsubscribe4()
      if (unsubscribe5) unsubscribe5()
      if (unsubscribe6) unsubscribe6()
      if (unsubscribe7) unsubscribe7()
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
      <input type="text" className="hidden" ref={myMegaValueRef} />
      <input type="text" className="hidden" ref={myTrystValueRef} />
      <input type="text" className="hidden" ref={myEroticMonkeyValueRef} />
      <input type="text" className="hidden" ref={myAdultSearchValueRef} />
      <input type="text" className="hidden" ref={myCallEscortValueRef} />
      <input type="text" className="hidden" ref={myHotValueRef} />

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
            myMegaItems,
            myTrystItems,
            myEroticMonkeyItems,
            myAdultSearchItems,
            myCallEscortItems,
            myHotItems,
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
