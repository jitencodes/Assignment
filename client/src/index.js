import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Departments } from "./Components/Departments";
import { Home } from "./Components/Home";
import Login from "./Components/Login";
import ManageDepartments from "./Components/ManageDepartments";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/dashborad/:nametype",
    element: (<Departments />),
  },
  {
    path: "/dashboard/manage/:nametype/:id",
    element: (<ManageDepartments />),
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);