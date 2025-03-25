
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button as ShadcnButton } from "@/components/ui/button";

interface ButtonCustomProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive";
  size?: "sm" | "default" | "lg" | "icon";
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  loading?: boolean;
}

const ButtonCustom = ({
  children,
  className,
  variant = "default",
  size = "default",
  to,
  onClick,
  disabled,
  type = "button",
  icon,
  loading,
}: ButtonCustomProps) => {
  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn("inline-flex items-center justify-center", className)}>
        <ShadcnButton 
          variant={variant}
          size={size}
          disabled={disabled || loading}
          type={type}
          className={className}
          onClick={onClick}
        >
          {content}
        </ShadcnButton>
      </Link>
    );
  }

  return (
    <ShadcnButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      type={type}
      className={className}
      onClick={onClick}
    >
      {content}
    </ShadcnButton>
  );
};

export default ButtonCustom;
