"use client";

import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: "default" | "primary" | "warning" | "danger";
  disabled?: boolean;
  href?: string;
  items?: "start" | "center";
  justify?: "start" | "between" | "center";
  shape?: "default" | "square" | "round";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  variant?: "default" | "outlined" | "minimal";
}

export function Button({
  children,
  className,
  color = "default",
  disabled = false,
  href,
  items = "center",
  justify = "center",
  onClick,
  shape = "default",
  size = "md",
  type = "button",
  variant = "default",
  ...props
}: ButtonProps) {
  const { push } = useRouter();
  const colorClasses = getColorClasses(variant, color, disabled);
  const itemsClasses = getItemsClasses(items);
  const justifyClasses = getJustifyClasses(justify);
  const pointerClasses = disabled ? ["cursor-not-allowed"] : ["cursor-pointer"];
  const shapeClasses = getShapeClasses(shape, size);
  const sizeClasses = getSizeClasses(size);
  const classNames = [
    "border",
    "flex",
    "gap-2",
    "font-medium",
    "overflow-hidden",
    ...colorClasses,
    ...itemsClasses,
    ...justifyClasses,
    ...pointerClasses,
    ...shapeClasses,
    ...sizeClasses,
    className,
  ].join(" ");

  return (
    <button
      onClick={onClick || (href ? () => push(href) : undefined)}
      disabled={disabled}
      type={type}
      className={classNames}
      {...props}
    >
      {children}
    </button>
  );
}

function getColorClasses(
  variant: "default" | "outlined" | "minimal",
  color: "default" | "primary" | "warning" | "danger",
  disabled: boolean,
) {
  if (disabled) {
    return [
      "bg-zinc-300",
      "border-zinc-300",
      "hover:bg-zinc-300",
      "hover:border-zinc-300",
      "cursor-not-allowed",
    ];
  }

  if (variant == "default") {
    if (color == "default") {
      return [
        "text-white",
        "bg-zinc-500",
        "border-zinc-500",
        "hover:bg-zinc-600",
        "hover:border-zinc-600",
      ];
    }
    if (color == "primary") {
      return [
        "text-white",
        "bg-blue-500",
        "border-blue-500",
        "hover:bg-blue-600",
        "hover:border-blue-600",
      ];
    }
    if (color == "warning") {
      return [
        "text-white",
        "bg-yellow-500",
        "border-yellow-500",
        "hover:bg-yellow-600",
        "hover:border-yellow-600",
      ];
    }
    if (color == "danger") {
      return [
        "text-white",
        "bg-red-500",
        "border-red-500",
        "hover:bg-red-600",
        "hover:border-red-600",
      ];
    }

    return [];
  }
  if (variant == "outlined") {
    if (color == "default") {
      return ["text-black", "border-zinc-300", "hover:bg-zinc-100"];
    }
    if (color == "primary") {
      return ["text-blue-500", "border-blue-500", "hover:bg-blue-100"];
    }
    if (color == "warning") {
      return ["text-yellow-500", "border-yellow-500", "hover:bg-yellow-100"];
    }
    if (color == "danger") {
      return ["text-red-500", "border-red-500", "hover:bg-red-100"];
    }

    return [];
  }
  if (variant == "minimal") {
    if (color == "default") {
      return ["text-black", "border-white", "hover:bg-zinc-100", "hover:border-zinc-100"];
    }
    if (color == "primary") {
      return ["text-blue-500", "border-white", "hover:bg-blue-100", "hover:border-blue-100"];
    }
    if (color == "warning") {
      return ["text-yellow-500", "border-white", "hover:bg-yellow-100", "hover:border-yellow-100"];
    }
    if (color == "danger") {
      return ["text-red-500", "border-white", "hover:bg-red-100", "hover:border-red-100"];
    }

    return [];
  }

  return [];
}

function getItemsClasses(items?: "start" | "center") {
  if (items == "start") return ["items-start"];
  if (items == "center") return ["items-center"];
  return [];
}

function getJustifyClasses(justify?: "start" | "between" | "center") {
  if (justify == "start") return ["justify-start"];
  if (justify == "center") return ["justify-center"];
  if (justify == "between") return ["justify-between"];
  return [];
}

function getSizeClasses(size: "sm" | "md" | "lg") {
  if (size == "sm") return ["h-6", "px-2", "text-xs"];
  if (size == "md") return ["h-8", "px-2", "text-sm"];
  if (size == "lg") return ["h-10", "px-4", "text-base"];
  return [];
}

function getShapeClasses(shape: "default" | "square" | "round", size: "sm" | "md" | "lg") {
  if (shape == "default") return ["rounded-lg"];
  if (shape == "square") {
    const widthClasses = (() => {
      if (size == "sm") return ["w-6"];
      if (size == "md") return ["w-8"];
      if (size == "lg") return ["w-10"];
      return [];
    })();
    return ["!px-0", "rounded-lg", ...widthClasses];
  }
  if (shape == "round") return ["rounded-full"];
  return [];
}
