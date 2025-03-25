
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Container = ({ 
  children, 
  className, 
  as: Component = "div" 
}: ContainerProps) => {
  return (
    <Component className={cn("container mx-auto px-4", className)}>
      {children}
    </Component>
  );
};

export default Container;
