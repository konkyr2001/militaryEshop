import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Layout from "./Layout";
import { useState } from "react";
import React from "react";
import ProtectedAccountRoute from "./pages/Account/ProtectedAccountRoute";
export const UserContext = React.createContext(null);
function App() {
  const [user, setUser] = useState({
    email: null,
    password: null,
    id: null,
    cart: [],
    favourites: [],
    role: null,
  });
  return (
    <>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace/>} />
              <Route path="product/:id" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="account/:id" element={<ProtectedAccountRoute />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
