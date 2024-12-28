import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import Header from '../components/Header'

const Dashboard = () => {

  const { myDataItems, myMegaItems, myTrystItems, myEroticMonkeyItems, isUserAuthenticated, userData, } = useOutletContext()

  return (
    <div>
      <Header />
      <Outlet context={{ isUserAuthenticated, userData, myDataItems, myMegaItems, myTrystItems, myEroticMonkeyItems, }} />
    </div>
  )
}

export default Dashboard