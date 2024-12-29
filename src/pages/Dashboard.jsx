import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import Header from '../components/Header'

const Dashboard = () => {

  const { isUserAuthenticated, userData, myDataItems, myMegaItems, myTrystItems, myEroticMonkeyItems, myAdultSearchItems } = useOutletContext()

  return (
    <div>
      <Header />
      <Outlet context={{ isUserAuthenticated, userData, myDataItems, myMegaItems, myTrystItems, myEroticMonkeyItems, myAdultSearchItems }} />
    </div>
  )
}

export default Dashboard