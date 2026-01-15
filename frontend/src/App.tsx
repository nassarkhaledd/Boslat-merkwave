import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NewCustomer from './pages/NewCustomer';
import AdminCustomers from './pages/AdminCustomers';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import RootRedirect from './components/RootRedirect';
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <RootRedirect /> },
      { path: 'login', element: <Login /> },
      {
        element: <ProtectedRoute />, 
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'new-customer', element: <NewCustomer /> },
          { path: 'customers', element: <AdminCustomers /> },
          { path: 'customers/:id', element: <CustomerDetailsPage /> },

        ],
      },

      { path: '*', element: <Navigate to="/login" replace /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
