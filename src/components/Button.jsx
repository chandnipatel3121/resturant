import React from "react"

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300"

  const variants = {
    primary: "bg-[#7A688A] text-[#F3F3F1] hover:bg-[#0F5C5C]",

    outline:
      "border border-[#d4cbbe]/50 text-[#F3F3F1] hover:bg-[#0F5C5C] hover:text-[#F3F3F1]",
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
