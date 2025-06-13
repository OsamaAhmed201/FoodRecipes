import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from './Components/Shared/AuthLayout/AuthLayout';
import Forget_PassWord from './Components/Authintcation/Forget_PassWord/Forget_PassWord';
import VerifyAcount from './Components/Authintcation/VerifyAcount/VerifyAcount';
import MasterLayout from './Components/Shared/MasterLayout/MasterLayout';
import Dashboard from './Components/Dashboard/Component/Dashboard/Dashboard';
import ReciepesList from './Components/Reciepes/ReciepesList/ReciepesList';
import ReciepesFormDate from './Components/Reciepes/ReciepesFormDate/ReciepesFormDate';
import CategoryList from './Components/Categories/CategoryList/CategoryList';
import CategoryData from './Components/Categories/CategoryData/CategoryData';
import UserList from './Components/Users/UserList/UserList';
import Login from './Components/Authintcation/Login/Login';
import Notfound from './Components/Shared/Notfound/Notfound';
import Register from './Components/Authintcation/Register/Register';
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./Components/Context/authContext/AuthContextProvider.jsx";
import ProtectedRouting from "./Components/Shared/ProtectedRouting/ProtectedRouting.jsx";
import FavoList from './Components/Favouruites/FavoList/FavoList';
import ChangePassword from "./Components/Shared/ChangePassword/ChangePassword.jsx";
import Personal_data from "./Components/Shared/Personal_data/Personal_data.jsx";


function App() {
  let routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forget_pass', element: <Forget_PassWord /> },
        { path: 'verify', element: <VerifyAcount /> },

      ]
      ,
      errorElement: <Notfound />
    },
    {
      path: '/dashboard',
      element: <ProtectedRouting><MasterLayout /></ProtectedRouting>,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'recipes', element: <ReciepesList /> },
        { path: 'recipes-data', element: <ReciepesFormDate /> },
        { path: 'categories', element: <CategoryList /> },
        { path: 'category-data', element: <CategoryData /> },
        { path: 'personal_data', element: <Personal_data /> },
        { path: 'users', element: <UserList /> },
        { path: 'favouruites', element: <FavoList /> },
        { path: 'change-password', element: <ChangePassword /> },

      ],
      errorElement: <Notfound />
    }

  ])

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer />
      </AuthContextProvider>
    </>
  )
}

export default App
