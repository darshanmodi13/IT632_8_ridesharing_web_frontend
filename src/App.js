//css
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Context
import { GlobalContextProvider } from "./contexts/GlobalContext";

//Pages
import Home from "./pages/Home/Home";
import Registermain from "./pages/Register/Registermain";
function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registermain/>}/>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
