import React from "react";

const NSLogo = ({ size = 40, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`ns-logo ${className}`}
    >
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#2563eb" }} />
          <stop offset="100%" style={{ stopColor: "#1e40af" }} />
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ffffff" }} />
          <stop offset="100%" style={{ stopColor: "#e0e7ff" }} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="18" ry="18" fill="url(#bgGradient)" />
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize="44"
        fontWeight="800"
        fill="url(#textGradient)"
        letterSpacing="-2"
      >
        NS
      </text>
    </svg>
  );
};

export default NSLogo;
