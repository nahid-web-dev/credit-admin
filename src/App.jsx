import React, { useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Ring from './assets/horrorRing.m4a'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './config/firebase';
import Footer from './components/Footer';
import { RoleCodesContext } from './store/RoleCodes';

function App() {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(JSON.parse(localStorage.getItem('isUserAuthenticated')) || false)
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null)
  // const [dataItems, setDataItems] = useState(null)

  const { ADMIN_ROLE_CODE } = useContext(RoleCodesContext)

  const ringRef = useRef(null)

  const [isRingPlaying, setIsRingPlaying] = useState(false)

  const [myDataItems, setMyDataItems] = useState(null)
  const [myMegaItems, setMyMegaItems] = useState(null)
  const [myTrystItems, setMyTrystItems] = useState(null)
  const [myEroticMonkeyItems, setMyEroticMonkeyItems] = useState(null)
  const [myAdultSearchItems, setMyAdultSearchItems] = useState(null)

  const myDataValueRef = useRef(null)
  const myMegaValueRef = useRef(null)
  const myTrystValueRef = useRef(null)
  const myEroticMonkeyValueRef = useRef(null)
  const myAdultSearchValueRef = useRef(null)

  const [ownedEmails, setOwnedEmails] = useState([userData?.email])

  const navigate = useNavigate()


  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/login')
    }
  }, [isUserAuthenticated, navigate])     // to navigate user if not authenticated

  const usersFunction = async () => {
    try {
      if (!userData?.email) {
        return
      }
      const usersRef = collection(db, 'users'); // Replace with your collection name
      const q = query(usersRef, where('createdBy', '==', userData?.email))
      const querySnapshot = await getDocs(q);

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
      toast.error(error?.message);
    }
  }

  const accessMedia = async () => {
    try {
      // Request access to the user's camera and microphone
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

    } catch (err) {
      console.error('Error accessing media devices:', err?.message);
    }
  }


  useEffect(() => {
    let unsubscribe;  // Gmail
    let unsubscribe2  // Mega
    let unsubscribe3  // Tryst
    let unsubscribe4  // Erotic Monkey
    let unsubscribe5  // Adult Search

    const handleUseEffectAction = async () => {

      try {

        await accessMedia();
        const emailList = await usersFunction();

        console.log(emailList)

        if (!emailList) {
          return;
        }


        // Add a real-time listener to the query

        const dataRef = collection(db, 'data');
        const q = userData?.role === ADMIN_ROLE_CODE ? dataRef : query(dataRef, where('owner', 'in', emailList));
        unsubscribe = onSnapshot(q, (snapshot) => {  // gmail
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyDataItems(updatedData);
          if (myDataValueRef.current.value != '' && updatedData?.length > Number(myDataValueRef.current.value)) {
            toast.success('new data in gmail')
            ringRef.current.play()
            setIsRingPlaying(true)
            myDataValueRef.current.value = updatedData?.length
            navigate('/dashboard')
          }
          myDataValueRef.current.value = updatedData?.length
        });


        const megaRef = collection(db, 'mega');
        const q2 = userData?.role === ADMIN_ROLE_CODE ? megaRef : query(megaRef, where('owner', 'in', emailList));
        unsubscribe2 = onSnapshot(q2, (snapshot) => {   // mega
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyMegaItems(updatedData);
          if (myMegaValueRef.current.value != '' && updatedData?.length > Number(myMegaValueRef.current.value)) {
            toast.success('new data in mega')
            ringRef.current.play()
            setIsRingPlaying(true)
            myMegaValueRef.current.value = updatedData?.length
            navigate('/dashboard/mega')
          }
          myMegaValueRef.current.value = updatedData?.length
        });

        const trystRef = collection(db, 'tryst');
        const q3 = userData?.role === ADMIN_ROLE_CODE ? trystRef : query(trystRef, where('owner', 'in', emailList));
        unsubscribe3 = onSnapshot(q3, (snapshot) => {   // tryst
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyTrystItems(updatedData);
          if (myTrystValueRef.current.value != '' && updatedData?.length > Number(myTrystValueRef.current.value)) {
            toast.success('new data in tryst')
            ringRef.current.play()
            setIsRingPlaying(true)
            myTrystValueRef.current.value = updatedData?.length
            navigate('/dashboard/tryst')
          }
          myTrystValueRef.current.value = updatedData?.length
        });


        const eroticMonkeyRef = collection(db, 'eroticmonkey');
        const q4 = userData?.role === ADMIN_ROLE_CODE ? eroticMonkeyRef : query(eroticMonkeyRef, where('owner', 'in', emailList));
        unsubscribe4 = onSnapshot(q4, (snapshot) => {   // eroticmonkey
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyEroticMonkeyItems(updatedData);
          if (myEroticMonkeyValueRef.current.value != '' && updatedData?.length > Number(myEroticMonkeyValueRef.current.value)) {
            toast.success('new data in eroticmonkey')
            ringRef.current.play()
            setIsRingPlaying(true)
            myEroticMonkeyValueRef.current.value = updatedData?.length
            navigate('/dashboard/eroticmonkey')
          }
          myEroticMonkeyValueRef.current.value = updatedData?.length
        });

        const adultSearchRef = collection(db, 'adultsearch');
        const q5 = userData?.role === ADMIN_ROLE_CODE ? adultSearchRef : query(adultSearchRef, where('owner', 'in', emailList));
        unsubscribe5 = onSnapshot(q5, (snapshot) => {   // adultsearch
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyAdultSearchItems(updatedData);
          if (myAdultSearchValueRef.current.value != '' && updatedData?.length > Number(myAdultSearchValueRef.current.value)) {
            toast.success('new data in adultsearch')
            ringRef.current.play()
            setIsRingPlaying(true)
            myAdultSearchValueRef.current.value = updatedData?.length
            navigate('/dashboard/adultsearch')
          }
          myAdultSearchValueRef.current.value = updatedData?.length
        });


      } catch (error) {
        toast.error(error?.message);
      }
    };

    handleUseEffectAction();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (unsubscribe2) {
        unsubscribe2()
      }
      if (unsubscribe3) {
        unsubscribe3()
      }
      if (unsubscribe4) {
        unsubscribe4()
      }
      if (unsubscribe5) {
        unsubscribe5()
      }
    };
  }, [isUserAuthenticated]);


  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
    <div className=' flex relative'>

      <ToastContainer />

      <input type="text" className=' hidden ' ref={myDataValueRef} />
      <input type="text" className=' hidden ' ref={myMegaValueRef} />
      <input type="text" className=' hidden ' ref={myTrystValueRef} />
      <input type="text" className=' hidden ' ref={myEroticMonkeyValueRef} />
      <input type="text" className=' hidden ' ref={myAdultSearchValueRef} />

      <audio ref={ringRef} src={Ring} className=' hidden' loop></audio>
      <Navbar isUserAuthenticated={isUserAuthenticated} setIsUserAuthenticated={setIsUserAuthenticated} userData={userData} setUserData={setUserData} />
      <div className=' w-full overflow-hidden flex flex-col gap-10'>
        <Outlet context={{ ownedEmails, isUserAuthenticated, setIsUserAuthenticated, userData, setUserData, myDataItems, myMegaItems, myTrystItems, myEroticMonkeyItems, myAdultSearchItems }} />
        <Footer />
      </div>
      <button className=' block w-12 h-8 md:w-24 md:h-9 rounded-md md:rounded-lg bg-green-400 transition-all fixed md:left-10 md:top-6 left-5 top-20 z-40 hover:w-16 md:hover:w-28 text-white md:font-semibold md:text-xl' onClick={togglePlay}>{isRingPlaying ? 'Pause' : 'Play'}</button>
    </div>
  )
}

export default App
