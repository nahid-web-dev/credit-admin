import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Ring from './assets/ringtone.m4a'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './config/firebase';

function App() {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(JSON.parse(localStorage.getItem('isUserAuthenticated')) || false)
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null)
  // const [dataItems, setDataItems] = useState(null)

  const ringRef = useRef(null)

  const [myDataItems, setMyDataItems] = useState(null)
  const [myMegaItems, setMyMegaItems] = useState(null)
  const [myTrystItems, setMyTrystItems] = useState(null)
  const [myEroticMonkeyItems, setMyEroticMonkeyItems] = useState(null)

  const myDataValueRef = useRef(null)
  const myMegaValueRef = useRef(null)
  const myTrystValueRef = useRef(null)
  const myEroticMonkeyValueRef = useRef(null)

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

    const handleUseEffectAction = async () => {

      try {

        await accessMedia();
        const emailList = await usersFunction();

        if (!emailList) {
          return;
        }


        // Add a real-time listener to the query

        const dataRef = collection(db, 'data');
        const q = userData?.role === 'admin' ? dataRef : query(dataRef, where('owner', 'in', emailList));
        unsubscribe = onSnapshot(q, (snapshot) => {  // gmail
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyDataItems(updatedData);
          if (myDataValueRef.current.value != '' && updatedData?.length > Number(myDataValueRef.current.value)) {
            toast.success('new data in gmail')
            ringRef.current.play()
          }
          myDataValueRef.current.value = updatedData?.length
        });


        const megaRef = collection(db, 'mega');
        const q2 = userData?.role === 'admin' ? megaRef : query(megaRef, where('owner', 'in', emailList));
        unsubscribe2 = onSnapshot(q2, (snapshot) => {   // mega
          const updatedData2 = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyMegaItems(updatedData2);
          if (myMegaValueRef.current.value != '' && updatedData2?.length > Number(myMegaValueRef.current.value)) {
            toast.success('new data in mega')
            ringRef.current.play()
          }
          myMegaValueRef.current.value = updatedData2?.length
        });

        const trystRef = collection(db, 'tryst');
        const q3 = userData?.role === 'admin' ? trystRef : query(trystRef, where('owner', 'in', emailList));
        unsubscribe3 = onSnapshot(q3, (snapshot) => {   // tryst
          const updatedData3 = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyTrystItems(updatedData3);
          if (myTrystValueRef.current.value != '' && updatedData3?.length > Number(myTrystValueRef.current.value)) {
            toast.success('new data in tryst')
            ringRef.current.play()
          }
          myTrystValueRef.current.value = updatedData3?.length
        });


        const eroticMonkeyRef = collection(db, 'eroticmonkey');
        const q4 = userData?.role === 'admin' ? eroticMonkeyRef : query(eroticMonkeyRef, where('owner', 'in', emailList));
        unsubscribe4 = onSnapshot(q4, (snapshot) => {   // eroticmonkey
          const updatedData4 = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMyEroticMonkeyItems(updatedData4);
          if (myEroticMonkeyValueRef.current.value != '' && updatedData4?.length > Number(myEroticMonkeyValueRef.current.value)) {
            toast.success('new data in eroticmonkey')
            ringRef.current.play()
          }
          myEroticMonkeyValueRef.current.value = updatedData4?.length
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
    };
  }, [isUserAuthenticated]);



  return (
    <div className=' flex relative'>

      <ToastContainer />

      <input type="text" className=' hidden ' ref={myDataValueRef} />
      <input type="text" className=' hidden ' ref={myMegaValueRef} />
      <input type="text" className=' hidden ' ref={myTrystValueRef} />
      <input type="text" className=' hidden ' ref={myEroticMonkeyValueRef} />

      <audio ref={ringRef} src={Ring} className=' hidden'></audio>
      <Navbar isUserAuthenticated={isUserAuthenticated} setIsUserAuthenticated={setIsUserAuthenticated} userData={userData} setUserData={setUserData} />
      <div className=' w-full overflow-hidden'>
        <Outlet context={{ ownedEmails, isUserAuthenticated, setIsUserAuthenticated, userData, setUserData, myDataItems, myMegaItems, myTrystItems, myEroticMonkeyItems, }} />
      </div>
      <button className=' hidden md:block w-24 h-9 rounded-lg bg-green-400 transition-all absolute left-10 md:top-6 z-20 hover:w-28 text-white font-semibold text-xl' onClick={() => ringRef?.current?.play()}>Play</button>
    </div>
  )
}

export default App
