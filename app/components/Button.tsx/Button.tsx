import classNames from "classnames";
import React from "react";

type BaseProps = {};
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white";
  children: React.ReactNode;
  size?: "xs" | "sm" | "base" | "md" | "lg" | "xl";
}

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "white";
  children: React.ReactNode;
  size?: "xs" | "sm" | "base" | "md" | "lg" | "xl";
}

const baseClass =
  "focus:outline-none rounded-md font-medium shadow-sm focus:ring focus:ring-offset-2 inline-flex items-center";
const primaryVariantClass =
  "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500";
const secondaryVariantClass =
  "text-purple-700 bg-purple-50 hover:bg-purple-100 focus:bg-purple-50 focus:ring-purple-700";
const whiteVariantClass =
  "bg-white text-slate-600 hover:bg-gray-200 focus:ring-gray-700";

const Button = ({
  type,
  children,
  size = "base",
  variant = "primary",
  className,
  ...rest
}: ButtonProps) => {
  const buttonClass = classNames(
    baseClass,
    variant === "primary" && primaryVariantClass,
    variant === "secondary" && secondaryVariantClass,
    variant === "white" && whiteVariantClass,

    {
      "px-3 py-2 text-xs leading-4 font-medium xs": size === "xs",
      "px-3 py-2 text-xs leading-4 font-medium sm": size === "sm",
      "px-3 py-2 text-sm leading-5 font-medium base": size === "base",
      "px-3 py-2 text-base leading-6 font-medium md": size === "md",
      "px-3 py-2 text-base leading-6 font-medium lg": size === "lg",
      "px-3 py-3 text-lg leading-6 font-medium lg": size === "xl",
    },
    className
  );
  return (
    <button type={type} className={buttonClass} {...rest}>
      {children}
    </button>
  );
};

export const LinkButton = ({
  children,
  size = "base",
  variant = "primary",
  className,
  ...rest
}: LinkButtonProps) => {
  const linkClass = classNames(
    baseClass,
    variant === "primary" && primaryVariantClass,
    variant === "secondary" && secondaryVariantClass,
    variant === "white" && whiteVariantClass,

    {
      "px-3 py-2 text-xs leading-4 font-medium xs": size === "xs",
      "px-3 py-2 text-xs leading-4 font-medium sm": size === "sm",
      "px-3 py-2 text-sm leading-5 font-medium base": size === "base",
      "px-3 py-2 text-base leading-6 font-medium md": size === "md",
      "px-3 py-2 text-base leading-6 font-medium lg": size === "lg",
    },

    className
  );
  return (
    <a className={linkClass} {...rest}>
      {children}
    </a>
  );
};

export default Button;
