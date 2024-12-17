import React, { useState } from "react";
import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import "./MainLayout.css";

function MainLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };


  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <header>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          &#9776;
        </button>
        <h1 className="header-title">Cargo Shipment</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className={`main ${isSidebarVisible ? "" : "collapsed-sidebar"}`}>
        {isSidebarVisible && (
          <div className="sidebar">
            <nav className="side-nav">
              <ul>
                <li>
                  <NavLink
                    to="dashboard"
                    className={({ isActive }) =>
                      isActive ? "link active-link" : "link"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="customer"
                    className={({ isActive }) =>
                      isActive ? "link active-link" : "link"
                    }
                  >
                    Customer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="revenue"
                    className={({ isActive }) =>
                      isActive ? "link active-link" : "link"
                    }
                  >
                    Revenue
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="transaction"
                    className={({ isActive }) =>
                      isActive ? "link active-link" : "link"
                    }
                  >
                    Transaction
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="globals"
                    className={({ isActive }) =>
                      isActive ? "link active-link" : "link"
                    }
                  >
                    Globals
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )}
        <div className="content">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default MainLayout;
