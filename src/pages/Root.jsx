import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from '../components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Ring from '../assets/ringtone.m4a'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const Root = () => {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(JSON.parse(localStorage.getItem('isUserAuthenticated')) || false)
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null)
  // const [dataItems, setDataItems] = useState(null)
  const ringRef = useRef(null)
  const [myDataItems, setMyDataItems] = useState(null)
  const [counter, setCounter] = useState(0)

  const [ownedEmails, setOwnedEmails] = useState([userData?.email])


  const usersFunction = async () => {
    try {
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
      console.log('error')
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


  const handleUseEffectAction = async () => {
    accessMedia()
    const emailList = await usersFunction()
    const dataRef = collection(db, 'data');

    // Create a query where the 'owner' is in the 'ownedEmails' array
    const q = userData?.role == 'admin' ? dataRef : query(dataRef, where('owner', 'in', emailList));

    // Add a real-time listener to the query
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setMyDataItems(updatedData)
    });
    return () => unsubscribe()
  }

  useEffect(() => {
    handleUseEffectAction()
  }, [])




  const navigate = useNavigate()
  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/admin/login')
    }
  }, [isUserAuthenticated, navigate])



  useEffect(
    () => {
      if (myDataItems && counter > 1) {
        toast.success('new document added!')
        ringRef.current.play()
      }
      setCounter(counter + 1)
    }, [myDataItems]
  )


  return (
    <div className=' flex relative'>
      <audio ref={ringRef} src={Ring} className=' hidden'></audio>
      <ToastContainer />
      {/* <div className={`${isUserAuthenticated ? 'visible' : 'hidden'}`}> */}
      <AdminNavbar isUserAuthenticated={isUserAuthenticated} setIsUserAuthenticated={setIsUserAuthenticated} userData={userData} setUserData={setUserData} />
      {/* </div> */}
      <div className=' w-full overflow-hidden'>
        <Outlet context={{ isUserAuthenticated, setIsUserAuthenticated, userData, setUserData, myDataItems, ownedEmails }} />
      </div>
      <button className=' w-24 h-9 rounded-lg bg-green-400 transition-all absolute right-10 top-6 hover:w-28 text-white font-semibold text-xl' onClick={() => ringRef?.current?.play()}>Play</button>
    </div>
  )
}

export default AdminRoot