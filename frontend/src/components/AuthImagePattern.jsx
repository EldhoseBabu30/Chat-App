import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div
      className="hidden lg:flex items-center bg-base-100/90 backdrop-blur-sm  justify-center min-h-[80vh] bg-cover bg-center p-12 w-full"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1662974770404-468fd9660389?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhdCUyMGFwcGxpY2F0aW9ufGVufDB8fDB8fHww')` }}
    >
      <div className="w-full text-center rounded-3xl p-12 ">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : "animate-float"
              }`}
            />
          ))}
        </div>
        <h2 className="text-4xl font-bold mb-6 text-primary">{title}</h2>
        <p className="text-base-content/70 text-xl">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;