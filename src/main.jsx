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
import Mails from './pages/Mails.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RoleCodesProvider><App /></RoleCodesProvider>,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/:pageName',
        element: <Dashboard />,
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
        path: '/mails',
        element: <Mails />
      },
      // {
      //   path: '/loader',
      //   element: <Loader />
      // },
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
