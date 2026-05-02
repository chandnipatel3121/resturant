import React from 'react';

const Card = ({ image, name, price, rating }) => {
  return (
    <article className="group relative overflow-hidden rounded-[32px] bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_18px_50px_rgba(82,60,42,0.08)] transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-100/70 blur-3xl" />
      <div className="relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-3">
          <p className="text-sm text-white uppercase tracking-[0.18em]">Chef’s Pick</p>
        </div>
      </div>
      <div className="p-6 space-y-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-[#3E2C1C]">{name}</h3>
          <p className="text-sm text-[#7B6A5A]">{price}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-orange-500 text-sm">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className={index < rating ? 'opacity-100' : 'opacity-40'}>★</span>
            ))}
          </div>
          <button className="rounded-full bg-linear-to-r from-orange-500 to-yellow-400 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-xl">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
