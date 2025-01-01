import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import Header from '../components/Header'
import DashboardTable from '../components/DashboardTable'
import NotFound from './NotFound'
import { RoleCodesContext } from '../store/RoleCodes'
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { db } from '../config/firebase';
import { DateTime } from 'luxon'
import { FaMousePointer } from 'react-icons/fa'
import ClicksOverview from '../components/ClicksOverview'

const Dashboard = () => {

  const { pathname } = useLocation()

  const { ADMIN_ROLE_CODE, MANAGER_ROLE_CODE, USER_ROLE_CODE } = useContext(RoleCodesContext)

  const { isUserAuthenticated, userData, myDataItems, myMegaItems, myTrystItems, myEroticMonkeyItems, myAdultSearchItems } = useOutletContext()

  const [yesterDayClicks, setYesterDayClicks] = useState(null)
  const [todayClicks, setTodayClicks] = useState(null)
  const [totalClicks, setTotalClicks] = useState(null)

  const calculateClicksForDate = (data, targetDate) => {
    return data.reduce((acc, obj) => {
      const createdDate = DateTime.fromMillis(obj?.createdAt)
        .setZone('Asia/Dhaka')
        .toFormat('dd:MM:yyyy');
      if (createdDate !== targetDate) return acc;

      const key = obj.name; // Use the "name" field as the key
      acc[key] = (acc[key] || 0) + 1; // Increment the count
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!userData) return;

    const clicksRef = collection(db, 'clicks');
    const q =
      userData?.role === ADMIN_ROLE_CODE
        ? clicksRef
        : query(clicksRef, where('owner', '==', userData?.email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Calculate total clicks
      const allClicksObject = updatedData.reduce((acc, obj) => {
        const key = obj.name; // Use the "name" field as the key
        acc[key] = (acc[key] || 0) + 1; // Increment the count
        return acc;
      }, {});
      setTotalClicks(allClicksObject);

      // Calculate today's clicks
      const todayDate = DateTime.fromMillis(Date.now())
        .setZone('Asia/Dhaka')
        .toFormat('dd:MM:yyyy');
      const todayClicksObject = calculateClicksForDate(updatedData, todayDate);
      setTodayClicks(todayClicksObject);

      // Calculate yesterday's clicks
      const yesterdayDate = DateTime.fromMillis(Date.now() - 24 * 60 * 60 * 1000)
        .setZone('Asia/Dhaka')
        .toFormat('dd:MM:yyyy');
      const yesterDayClicksObject = calculateClicksForDate(updatedData, yesterdayDate);
      setYesterDayClicks(yesterDayClicksObject);
    });

    // Cleanup the onSnapshot listener
    return () => unsubscribe();
  }, []);



  if (!isUserAuthenticated) {
    return (
      <div></div>
    )
  }

  if (userData?.role == ADMIN_ROLE_CODE || userData?.role == MANAGER_ROLE_CODE || userData?.role == USER_ROLE_CODE)
    return (
      <div>
        <Header />
        <div>
          <ClicksOverview totalClicks={totalClicks} todayClicks={todayClicks} yesterDayClicks={yesterDayClicks} />
        </div>
        {
          pathname == '/' || pathname == '/dashboard' || pathname == '/dashboard/' || pathname == '/dashboard/gmail' ?
            <DashboardTable userData={userData} itemsObj={myDataItems} showAccessInTable={true} />
            : pathname == '/dashboard/mega' || pathname == '/dashboard/mega/' ?
              <DashboardTable userData={userData} itemsObj={myMegaItems} showCodeInTable={false} />
              : pathname == '/dashboard/tryst' || pathname == '/dashboard/tryst/' ?
                <DashboardTable userData={userData} itemsObj={myTrystItems} />
                : pathname == '/dashboard/eroticmonkey' || pathname == '/dashboard/eroticmonkey/' ?
                  <DashboardTable userData={userData} itemsObj={myEroticMonkeyItems} showCodeInTable={false} />
                  : pathname == '/dashboard/adultsearch' || pathname == '/dashboard/adultsearch/' ?
                    <DashboardTable userData={userData} itemsObj={myAdultSearchItems} showCodeInTable={false} />
                    : <NotFound />
        }
      </div>
    )

  return (
    <div></div>
  )
}

export default Dashboard




// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useOutletContext } from 'react-router-dom';
// import Header from '../components/Header';
// import DashboardTable from '../components/DashboardTable';
// import NotFound from './NotFound';
// import { RoleCodesContext } from '../store/RoleCodes';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import { DateTime } from 'luxon';

// const Dashboard = () => {
//   const { pathname } = useLocation();
//   const { ADMIN_ROLE_CODE, MANAGER_ROLE_CODE, USER_ROLE_CODE } = useContext(RoleCodesContext);

//   const {
//     isUserAuthenticated,
//     userData,
//     myDataItems,
//     myMegaItems,
//     myTrystItems,
//     myEroticMonkeyItems,
//     myAdultSearchItems,
//   } = useOutletContext();

//   const [yesterDayClicks, setYesterDayClicks] = useState(null);
//   const [todayClicks, setTodayClicks] = useState(null);
//   const [totalClicks, setTotalClicks] = useState(null);

//   // Function to calculate clicks for a specific date
//   const calculateClicksForDate = (data, targetDate) => {
//     return data.reduce((acc, obj) => {
//       const createdDate = DateTime.fromMillis(obj?.createdAt)
//         .setZone('Asia/Dhaka')
//         .toFormat('dd:MM:yyyy');
//       if (createdDate !== targetDate) return acc;

//       const key = obj.name; // Use the "name" field as the key
//       acc[key] = (acc[key] || 0) + 1; // Increment the count
//       return acc;
//     }, {});
//   };

//   // useEffect(() => {
//   //   if (!userData) return;

//   //   const clicksRef = collection(db, 'clicks');
//   //   const q =
//   //     userData?.role === ADMIN_ROLE_CODE
//   //       ? clicksRef
//   //       : query(clicksRef, where('owner', '==', userData?.email));

//   //   const unsubscribe = onSnapshot(q, (snapshot) => {
//   //     const updatedData = snapshot.docs.map((doc) => ({
//   //       ...doc.data(),
//   //       id: doc.id,
//   //     }));

//   //     // Calculate total clicks
//   //     const allClicksObject = updatedData.reduce((acc, obj) => {
//   //       const key = obj.name; // Use the "name" field as the key
//   //       acc[key] = (acc[key] || 0) + 1; // Increment the count
//   //       return acc;
//   //     }, {});
//   //     setTotalClicks(allClicksObject);

//   //     // Calculate today's clicks
//   //     const todayDate = DateTime.fromMillis(Date.now())
//   //       .setZone('Asia/Dhaka')
//   //       .toFormat('dd:MM:yyyy');
//   //     const todayClicksObject = calculateClicksForDate(updatedData, todayDate);
//   //     setTodayClicks(todayClicksObject);

//   //     // Calculate yesterday's clicks
//   //     const yesterdayDate = DateTime.fromMillis(Date.now() - 24 * 60 * 60 * 1000)
//   //       .setZone('Asia/Dhaka')
//   //       .toFormat('dd:MM:yyyy');
//   //     const yesterDayClicksObject = calculateClicksForDate(updatedData, yesterdayDate);
//   //     setYesterDayClicks(yesterDayClicksObject);
//   //   });

//   //   // Cleanup the onSnapshot listener
//   //   return () => unsubscribe();
//   // }, [userData]);

//   if (!isUserAuthenticated) {
//     return <div></div>;
//   }

//   if (
//     userData?.role == ADMIN_ROLE_CODE ||
//     userData?.role == MANAGER_ROLE_CODE ||
//     userData?.role == USER_ROLE_CODE
//   )
//     return (
//       <div>
//         <Header />
//         {(pathname === '/' ||
//           pathname === '/dashboard' ||
//           pathname === '/dashboard/' ||
//           pathname === '/dashboard/gmail') && (
//             <DashboardTable
//               userData={userData}
//               itemsObj={myDataItems}
//               showAccessInTable={true}
//             />
//           )}
//         {pathname === '/dashboard/mega' ||
//           (pathname === '/dashboard/mega/' && (
//             <DashboardTable
//               userData={userData}
//               itemsObj={myMegaItems}
//               showCodeInTable={false}
//             />
//           ))}
//         {pathname === '/dashboard/tryst' ||
//           (pathname === '/dashboard/tryst/' && (
//             <DashboardTable userData={userData} itemsObj={myTrystItems} />
//           ))}
//         {pathname === '/dashboard/eroticmonkey' ||
//           (pathname === '/dashboard/eroticmonkey/' && (
//             <DashboardTable
//               userData={userData}
//               itemsObj={myEroticMonkeyItems}
//               showCodeInTable={false}
//             />
//           ))}
//         {pathname === '/dashboard/adultsearch' ||
//           (pathname === '/dashboard/adultsearch/' && (
//             <DashboardTable
//               userData={userData}
//               itemsObj={myAdultSearchItems}
//               showCodeInTable={false}
//             />
//           ))}
//         {![
//           '/',
//           '/dashboard',
//           '/dashboard/',
//           '/dashboard/gmail',
//           '/dashboard/mega',
//           '/dashboard/mega/',
//           '/dashboard/tryst',
//           '/dashboard/tryst/',
//           '/dashboard/eroticmonkey',
//           '/dashboard/eroticmonkey/',
//           '/dashboard/adultsearch',
//           '/dashboard/adultsearch/',
//         ].includes(pathname) && <NotFound />}
//       </div>
//     );

//   return <div></div>;
// };

// export default Dashboard;
