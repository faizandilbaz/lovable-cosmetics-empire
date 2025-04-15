
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ProductStatus } from "@/types/product";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: ProductStatus;
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({ status, showIcon = true, className }: StatusBadgeProps) {
  const getVariantByStatus = (): "success" | "destructive" | "warning" => {
    switch (status) {
      case "In Stock":
        return "success";
      case "Out of Stock":
        return "destructive";
      case "Low Stock":
        return "warning";
    }
  };

  const getIconByStatus = () => {
    switch (status) {
      case "In Stock":
        return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      case "Out of Stock":
        return <XCircle className="h-3.5 w-3.5 mr-1" />;
      case "Low Stock":
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
    }
  };

  return (
    <Badge 
      variant={getVariantByStatus()}
      className={cn("flex items-center", className)}
    >
      {showIcon && getIconByStatus()}
      {status}
    </Badge>
  );
}

export default StatusBadge;
