//css
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Context
import { GlobalContextProvider } from "./contexts/GlobalContext";

//Pages
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
