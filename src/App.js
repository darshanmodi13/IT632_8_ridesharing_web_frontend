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
import ViewProfile from "./pages/ViewProfile/ViewProfile";
import Upload from "./pages/UploadDocs/Upload";
import Account from "./pages/Account/Account";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";

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
          <Route path="/account" element={<Account />} exact />
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
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
          <Route
            path="/view-profile"
            element={
              <AuthRoutes>
                <ViewProfile />
              </AuthRoutes>
            }
            exact
          />
          <Route
            path="/update-profile"
            element={
              <AuthRoutes>
                <UpdateProfile />
              </AuthRoutes>
            }
            exact
          />
          <Route
            path="/upload-docs"
            element={
              <AuthRoutes>
                <Upload />
              </AuthRoutes>
            }
            exact
          />
          <Route
            path="*"
            element={
              <>
                <h1>404 not found</h1>
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
