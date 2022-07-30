import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonVariant = "primary" | "white" | "danger";

export type ButtonSize = "small";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  /**
   * Set the variant of Button
   * @default "white"
   */
  variant?: ButtonVariant;
  /**
   * Set the size of Button
   * @default "small"
   */
  size?: ButtonSize;
};
export const Button: React.FC<ButtonProps> = ({
  variant = "white",
  size = "small",
  children,
  className,
  ...props
}) => {
  const render = (): React.ReactElement => {
    const commonClassNames =
      "items-center rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
    return (
      <button
        className={`${commonClassNames} ${sizeToStyles[size]} ${variantToTextStyles[variant]} ${variantToBorderStyles[variant]} ${variantToBackgroundStyles[variant]} ${className} `}
        {...props}
      >
        {children}
      </button>
    );
  };

  return render();
};

const variantToBackgroundStyles: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
  white: "bg-white hover:bg-gray-50 focus:ring-indigo-500",
  danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
};

const variantToTextStyles: Record<ButtonVariant, string> = {
  primary: "text-white",
  white: "text-gray-700",
  danger: "text-white",
};

const variantToBorderStyles: Record<ButtonVariant, string> = {
  primary: "border border-transparent",
  white: "border border-gray-300",
  danger: "border border-transparent",
};

const sizeToStyles: Record<ButtonSize, string> = {
  small: "px-4 py-2 text-sm font-medium",
};
