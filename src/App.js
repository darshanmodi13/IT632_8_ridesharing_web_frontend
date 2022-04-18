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
import BookRideMain from "./pages/BookRide/BookRideMain";
import FindRideMain from "./pages/FindRide/FindRideMain";
import DriverDistanceMain from "./pages/DriverDistance/DriverDistanceMain";
import OfferRide from "./pages/OfferRide/Main";
//routes
import NotLoggedInRoutes from "./components/routes/NotLoggedInRoute";
import AuthRoutes from "./components/routes/AuthRoute";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/book-ride" element={<BookRideMain />} exact />
          <Route path="/find-ride" element={<FindRideMain />} exact />
          <Route path="/offer-ride" element={<OfferRide />} exact />
          <Route
            path="/wait-for-driver"
            element={<DriverDistanceMain />}
            exact
          />
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
