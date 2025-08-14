import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Products from "../../Pages/Product/Products.jsx";
import Login from "../../Pages/Login/Login.jsx";
import App from "../../App.jsx";
import Error from "../../Pages/Error/Error.jsx";

const WishList = lazy(() => import("../../Pages/WishList/WishList"));
const Cart = lazy(() => import("../../Pages/Cart/Cart"));

function AppRouter() {
  const { loginState } = useSelector((state) => state.Login);

  if (!loginState) {
    // User not logged in — only allow login route and redirect everything else to it
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // User is logged in — allow full app access
  return (
    <Routes>
      {/* Protect /login for logged-in users */}
      <Route path="/login" element={<Navigate to="/" replace />} />

      <Route path="/" element={<App />} />
      <Route path="/men" element={<Products />} />
      <Route path="/women" element={<Products />} />
      <Route path="/kids" element={<Products />} />
      <Route path="/home" element={<Products />} />
      <Route path="/beauty" element={<Products />} />
      <Route path="/genz" element={<Products />} />
      <Route path="/studio" element={<Products />} />

      <Route
        path="/wishlist"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <WishList />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        }
      />

      {/* Catch-all: Error Page */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRouter;
