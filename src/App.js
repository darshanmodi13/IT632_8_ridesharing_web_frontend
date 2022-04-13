//css
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Context
import { GlobalContextProvider } from "./contexts/GlobalContext";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
<<<<<<< HEAD
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
=======
import Registermain from "./pages/Register/RegsiterMain";
import ViewProfile from "./pages/ViewProfile/ViewProfile";

//routes
import NotLoggedInRoutes from "./components/routes/NotLoggedInRoute";
import AuthRoutes from "./components/routes/AuthRoute";
>>>>>>> 8b052f170e2a3e26ec99fabc0216fd08c9498222

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
<<<<<<< HEAD
          <Route path="/account" element={<Account />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/UpdateProfile" element={<UpdateProfile />} exact />
=======
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
          <Route
            path="/viewprofile"
            element={
              <ViewProfile></ViewProfile>
            }
            exact
          />
>>>>>>> 8b052f170e2a3e26ec99fabc0216fd08c9498222
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
