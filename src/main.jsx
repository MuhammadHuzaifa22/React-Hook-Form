// Improting functions
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'




// Create router for path of pages.
const router = createBrowserRouter([
  {
    path:'/', 
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Login/>
      },{
        path:'register',
        element:<Register/>
      },
      {
        path:'home',
        element:<Home/>,
      }, 

    ]
  },
])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
  </RouterProvider>
)
