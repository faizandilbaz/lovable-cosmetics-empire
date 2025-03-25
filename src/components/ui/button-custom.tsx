
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "secondary";
  size?: "sm" | "default" | "lg";
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = ({
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
}: ButtonProps) => {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary disabled:opacity-50 disabled:pointer-events-none btn-hover",
    {
      // Variant styles
      "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
      "bg-transparent border border-input hover:bg-accent": variant === "outline",
      "bg-transparent hover:bg-accent text-foreground": variant === "ghost",
      "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto": variant === "link",
      
      // Size styles
      "h-9 px-4 text-sm rounded-md": size === "sm",
      "h-10 px-6 rounded-md": size === "default",
      "h-12 px-8 rounded-md text-md": size === "lg",
    },
    className
  );

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
      <Link to={to} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={baseStyles}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {content}
    </button>
  );
};

export default Button;
