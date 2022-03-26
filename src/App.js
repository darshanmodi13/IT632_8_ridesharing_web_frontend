//css
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Context
import { GlobalContextProvider } from "./contexts/GlobalContext";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registermain from "./pages/Register/RegsiterMain";

//routes
import NotLoggedInRoutes from "./components/routes/NotLoggedInRoute";
import AuthRoutes from "./components/routes/AuthRoute";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route
            path="/login"
            element={
              <NotLoggedInRoutes>
                <Login />
              </NotLoggedInRoutes>
            }
            exact
          />
          <Route
            path="/register"
            element={
              <NotLoggedInRoutes>
                <Registermain />
              </NotLoggedInRoutes>
            }
            exact
          />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
