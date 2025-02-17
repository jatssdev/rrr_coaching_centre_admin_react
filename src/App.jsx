import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Options from "./pages/Options";
import Standards from "./pages/Standards";
import Books from "./pages/Books";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Scientists from "./pages/Scientists";
import JivVikashPothi from "./pages/JivVikashPothi";
import GeneralKnowledge from "./pages/GeneralKnowledge";
import BhagwadGeeta from "./pages/BhagwadGeeta";


const router = createBrowserRouter([
  { path: "/login", element: <Login /> }, // Public route

  {
    path: "/",
    element: <ProtectedRoute />, // Protect all routes inside this
    children: [
      {
        path: "/", element: <Layout />, children: [
          { path: "", element: <Dashboard /> },
          { path: "options", element: <Options /> },
          { path: "standards", element: <Standards /> },
          { path: "books", element: <Books /> },
          { path: "scientists", element: <Scientists /> },
          { path: "jivvikashpothi", element: <JivVikashPothi /> },

          { path: "generalknowledge", element: <GeneralKnowledge /> },
          { path: "bhagwadgeeta", element: <BhagwadGeeta /> },


        ]
      },
    ],
  },
]);


export default function App() {
  return <RouterProvider router={router} />;
}
