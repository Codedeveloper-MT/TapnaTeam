import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "client/src/NavBar.jsx";

function Layout() {
  return (
    <div>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
