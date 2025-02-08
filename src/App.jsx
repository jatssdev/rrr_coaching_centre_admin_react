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
        ]
      },
    ],
  },
]);


export default function App() {
  return <RouterProvider router={router} />;
}
