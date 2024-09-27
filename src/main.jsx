// Improting functions
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Home from './Pages/Home.jsx'
import AdmissionForm from './Pages/admissionForm.jsx'
import VerifyAdmission from './Pages/verifyAdmission.jsx'
import AdmissionVerification from './Pages/verifyAdmission.jsx'





// Create router for path of pages.
const router = createBrowserRouter([
  {
    path:'/', 
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<AdmissionForm/>
      },{
        path:'admission',
        element:<AdmissionVerification/>
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
