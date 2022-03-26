//css
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Context
import { GlobalContextProvider } from "./contexts/GlobalContext";

//Pages
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import Login from "./pages/Login/Login";
import Registermain from "./pages/Register/RegsiterMain";
function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/account" element={<Account />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Registermain />} exact />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
