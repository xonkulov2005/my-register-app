import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Create from "./pages/Create";

import { useGlobalContext } from "./hooks/useGlobalContext";
import { useEffect } from "react";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const { user, dispatch, isAuthReady } = useGlobalContext();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName && user?.photoURL) {
        dispatch({ type: "LOGIN", payload: user });
      }
      dispatch({ type: "AUTH_READY" });
    });
  }, []);

  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
