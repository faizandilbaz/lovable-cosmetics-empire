
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AdminAuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  currentAdmin: Admin | null;
};

type Admin = {
  email: string;
  name: string;
  role: string;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const navigate = useNavigate();

  // Check if admin is already logged in
  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const admin = JSON.parse(adminData);
      setCurrentAdmin(admin);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to authenticate
    // For demo purposes, we're using a hardcoded check
    if (email === "admin@example.com" && password === "password") {
      const admin = {
        email: "admin@example.com",
        name: "John Smith",
        role: "Admin",
      };
      setCurrentAdmin(admin);
      setIsAuthenticated(true);
      localStorage.setItem("adminData", JSON.stringify(admin));
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        currentAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
