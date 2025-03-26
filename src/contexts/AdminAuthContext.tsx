
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Permission = {
  read: boolean;
  write: boolean;
  delete: boolean;
};

type Permissions = {
  products: Permission;
  orders: Permission;
  blog: Permission;
  reviews: Permission;
  users: Permission;
  settings: Permission;
};

type Admin = {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: Permissions;
  avatar?: string;
};

type AdminAuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  currentAdmin: Admin | null;
  isAdmin: boolean;
  isManager: boolean;
  hasPermission: (module: keyof Permissions, action: keyof Permission) => boolean;
};

// Initial admin users
const adminUsers: Admin[] = [
  {
    id: 1,
    email: "admin@example.com",
    name: "John Smith",
    role: "Admin",
    permissions: {
      products: { read: true, write: true, delete: true },
      orders: { read: true, write: true, delete: true },
      blog: { read: true, write: true, delete: true },
      reviews: { read: true, write: true, delete: true },
      users: { read: true, write: true, delete: true },
      settings: { read: true, write: true, delete: true },
    },
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 2,
    email: "products@example.com",
    name: "Sarah Johnson",
    role: "Product Manager",
    permissions: {
      products: { read: true, write: true, delete: false },
      orders: { read: true, write: false, delete: false },
      blog: { read: true, write: false, delete: false },
      reviews: { read: true, write: false, delete: false },
      users: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
    },
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 3,
    email: "orders@example.com",
    name: "Michael Lee",
    role: "Order Manager",
    permissions: {
      products: { read: true, write: false, delete: false },
      orders: { read: true, write: true, delete: false },
      blog: { read: false, write: false, delete: false },
      reviews: { read: false, write: false, delete: false },
      users: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
    },
    avatar: "https://placehold.co/40x40"
  }
];

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
    // For demo purposes, we're checking credentials from our adminUsers array
    // In a real app, this would be an API call
    
    // For demo purposes, all managers use the same password
    const foundAdmin = adminUsers.find(admin => admin.email === email);
    
    if (foundAdmin && password === "password") {
      setCurrentAdmin(foundAdmin);
      setIsAuthenticated(true);
      localStorage.setItem("adminData", JSON.stringify(foundAdmin));
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

  // Helper functions for permission checks
  const isAdmin = currentAdmin?.role === "Admin";
  
  const isManager = isAuthenticated && currentAdmin?.role !== "Admin";
  
  const hasPermission = (module: keyof Permissions, action: keyof Permission): boolean => {
    if (!currentAdmin) return false;
    if (isAdmin) return true; // Admin has all permissions
    
    return currentAdmin.permissions[module]?.[action] || false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        currentAdmin,
        isAdmin,
        isManager,
        hasPermission,
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
