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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "options", element: <Options /> },
      { path: "standards", element: <Standards /> },
      { path: "books", element: <Books /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
