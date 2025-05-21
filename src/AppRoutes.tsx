import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import { useGetMyUser } from "./api/MyUserApi";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminRestaurantsPage from "./pages/AdminRestaurantsPage";
import AdminEditRestaurantPage from "./pages/AdminEditRestaurantPage";
import AdminAddRestaurantPage from "./pages/AdminAddRestaurantPage";
import RestaurantOrdersPage from "./pages/RestaurantOrdersPage";
import { useAuth0 } from "@auth0/auth0-react";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useGetMyUser();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        {/* Restaurant Admin Routes */}
        <Route
          path="/restaurant/orders"
          element={
            <Layout>
              <RestaurantOrdersPage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
        {/* Admin Only Routes */}
        <Route
          path="/admin/orders"
          element={
            <Layout>
              <AdminOrdersPage />
            </Layout>
          }
        />
        <Route
          path="/admin/restaurants"
          element={
            <Layout>
              <AdminRestaurantsPage />
            </Layout>
          }
        />
        <Route
          path="/admin/restaurants/add"
          element={
            <Layout>
              <AdminAddRestaurantPage />
            </Layout>
          }
        />
        <Route
          path="/admin/restaurants/:restaurantId/edit"
          element={
            <Layout>
              <AdminEditRestaurantPage />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
