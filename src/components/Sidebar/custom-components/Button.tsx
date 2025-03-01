// components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles =
    variant === "primary"
      ? "px-[50px] py-1 rounded text-sm shadow-[var(--shadow-2)]"
      : "px-[30px] py-1 rounded text-sm shadow-[var(--shadow-2)]";
  const variantStyles =
    variant === "primary"
      ? "bg-[var(--onyx)] text-white hover:bg-[var(--jet)]"
      : "bg-[var(--onyx)] text-white hover:bg-[var(--jet)]";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    />
  );
};

export default Button;
