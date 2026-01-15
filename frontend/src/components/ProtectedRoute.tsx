// src/components/ProtectedLayout.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/tokenAtom";

const ProtectedLayout: React.FC = () => {
  const [token] = useAtom(tokenAtom);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
