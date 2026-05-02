import React from "react"

const SectionTitle = ({
  eyebrow,
  title,
  description,
  className = "",
  align = "left", // optional: center / left
}) => {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "text-center mx-auto" : ""
      } ${className}`}
    >
      {eyebrow && (
        <p className="text-xs tracking-[0.3em] uppercase text-[#7A688A] mb-4">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl md:text-5xl font-medium text-[#0F5C5C] leading-tight mb-6">
        {title}
      </h2>

      {description && (
        <p className="text-[#7A688A] leading-relaxed max-w-xl">{description}</p>
      )}
    </div>
  )
}

export default SectionTitle
