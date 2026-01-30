import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';

import Home from '@/pages/client/Home';
import Cart from '@/pages/client/Cart';
import Orders from '@/pages/client/Orders';

import Dashboard from '@/pages/restaurant/Dashboard';
import ManageProducts from '@/pages/restaurant/ManageProducts';
import RestaurantOrders from '@/pages/restaurant/RestaurantOrders';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Routes with Header and Footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  {/* Client Routes */}
                  <Route
                    path="/"
                    element={
                      <PrivateRoute requiredType="client">
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute requiredType="client">
                        <Cart />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute requiredType="client">
                        <Orders />
                      </PrivateRoute>
                    }
                  />

                  {/* Restaurant Routes */}
                  <Route
                    path="/restaurant/dashboard"
                    element={
                      <PrivateRoute requiredType="restaurant">
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/restaurant/products"
                    element={
                      <PrivateRoute requiredType="restaurant">
                        <ManageProducts />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/restaurant/orders"
                    element={
                      <PrivateRoute requiredType="restaurant">
                        <RestaurantOrders />
                      </PrivateRoute>
                    }
                  />

                  {/* Catch all - redirect based on user type */}
                  <Route
                    path="*"
                    element={
                      user?.type === 'restaurant' ? (
                        <Navigate to="/restaurant/dashboard" replace />
                      ) : (
                        <Navigate to="/" replace />
                      )
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
