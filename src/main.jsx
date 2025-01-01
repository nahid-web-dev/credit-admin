import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Users from './pages/Users.jsx'
import Login from './pages/Login.jsx'
import Links from './pages/Links.jsx'
import Loader from './components/Loader.jsx'
import Dashboard from './pages/Dashboard.jsx'
import RoleCodesProvider from './store/RoleCodes.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RoleCodesProvider><App /></RoleCodesProvider>,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        // children: [
        //   {
        //     path: '/',
        //     element: <Home />
        //   }
        // ]
      },
      // {
      //   path: '/home',
      //   element: <Home />
      // },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/:pageName',
        element: <Dashboard />,
        // children: [
        //   {
        //     path
        //   },
        //   {
        //     path: '/dashboard/',
        //     element: <Home />
        //   },
        //   {
        //     path: '/dashboard/mega',
        //     element: <Mega />
        //   },
        //   {
        //     path: '/dashboard/tryst',
        //     element: <Tryst />
        //   },
        //   {
        //     path: '/dashboard/eroticmonkey',
        //     element: <EroticMonkey />
        //   },
        //   {
        //     path: '/dashboard/adultsearch',
        //     element: <AdultSearch />
        //   },
        // ]
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/links',
        element: <Links />
      },
      {
        path: '/loader',
        element: <Loader />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
