import React from "react"

const TestimonialCard = ({ name, quote, align = "center" }) => {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {/* QUOTE */}
      <p className="text-xl md:text-3xl leading-relaxed text-[#0F5C5C] font-medium">
        “{quote}”
      </p>

      {/* DIVIDER */}
      <div className="w-12 h-[1px] bg-[#7A688A] mx-auto my-6" />

      {/* NAME */}
      <p className="text-sm tracking-wide text-[#7A688A]">{name}</p>
    </div>
  )
}

export default TestimonialCard
