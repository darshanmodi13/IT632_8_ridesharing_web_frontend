//css
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Context
import { GlobalContextProvider } from "./contexts/GlobalContext";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
             <Route path="/" element={<Login />} />
          {/*<Route path="/" element={<Home />} />*/}
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
