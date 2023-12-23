// App.tsx
import React from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Guest from "./pages/guest/Guest";
import Layout from "./Layout";
import Motel from "./pages/Motel/Motel";
import Request from "./pages/Request/Request";
import Room from "./pages/Rooms/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Motel />
      </Layout>
    ),
  },
  {
    path: "/guest",
    element: (
      <Layout>
        <Guest />
      </Layout>
    ),
  },
  {
    path: "/request",
    element: (
      <Layout>
        <Request />
      </Layout>
    ),
  },
  {
    path: "/room",
    element: (
      <Layout>
        <Room />
      </Layout>
    ),
  },
  {
    path: "/simulation",
    element: (
      <Layout>
        <Room />
      </Layout>
    ),
  },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
};

export default App;
