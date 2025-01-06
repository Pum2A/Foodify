"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
