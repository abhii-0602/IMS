import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import PackageTable from "./PackageTable";
import Teams from "./Teams";
import Apackage from "./Apackage";
import TeamTable from "./TeamTable";
import TeamEdit from "./TeamEdit";
import AddCategory from "./AddCategory";
import PackageEdit from "./PackageEdit";
//import CategoryTable from "./ViewCategory";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/viewPackage",
    element: <PackageTable />,
  },
  {
    path: "/viewTeams",
    element: <Teams />,
  },
  {
    path: "/viewAllTeams",
    element: <TeamTable />,
  },
  {
    path: "/AddPackage",
    element: <Apackage />,
  },
  {
    path: "/TeamEdit/:id",
    element: <TeamEdit />,
  },
  {
    path: "/addTeam",
    element: <Teams />,
  },
  {
    path: "/addViewCategory",
    element: <AddCategory />,
  },
  {
    path: "/addCategory",
    element: <AddCategory />,
  },
  {
    path: "/PackageEdit/:packageId", 
    element: <PackageEdit/>
  },
  
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <RouterProvider router={router} />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
