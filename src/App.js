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

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home />} /> 
          <Route path="/account" element={<Account />} />
             <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
