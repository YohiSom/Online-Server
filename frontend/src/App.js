import React, { useEffect } from "react";
import "./App.css";
import GetLocation from "./componenets/GetLocation";
import Navbar from "./componenets/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "./store/user-actions";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./componenets/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user || null);

  useEffect(() => {
    dispatch(setUserLocation());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/server"
            element={
              <ProtectedRoute isLoggedIn={user}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
