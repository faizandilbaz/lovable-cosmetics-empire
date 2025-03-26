
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminLayout from "./AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const ProtectedAdminRoute = () => {
  const { isAuthenticated, hasPermission, currentAdmin } = useAdminAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Check route-specific permissions
  useEffect(() => {
    // Skip permission checks for the dashboard
    if (isAuthenticated && location.pathname === "/admin") return;

    // Route to permission mapping
    const pathPermissions: Record<string, { module: string; action: string }> = {
      "/admin/products": { module: "products", action: "read" },
      "/admin/orders": { module: "orders", action: "read" },
      "/admin/blog": { module: "blog", action: "read" },
      "/admin/reviews": { module: "reviews", action: "read" },
      "/admin/users": { module: "users", action: "read" },
      "/admin/settings": { module: "settings", action: "read" },
      "/admin/managers": { module: "settings", action: "read" }, // Only admins can manage managers
    };

    const requiredPermission = pathPermissions[location.pathname];
    
    if (requiredPermission && 
        !hasPermission(requiredPermission.module as any, requiredPermission.action as any)) {
      toast({
        title: "Access Denied",
        description: `You don't have permission to access ${location.pathname.split('/').pop()}`,
        variant: "destructive",
      });
      // We don't redirect here to let the UI handle access restrictions
    }
  }, [location.pathname, isAuthenticated, hasPermission, toast]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default ProtectedAdminRoute;
