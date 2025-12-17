import React from 'react';

export const UnileverLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Stylized 'U' representing the Unilever logo composition */}
    <path d="M28,15 C28,8 34,2 40,2 H60 C66,2 72,8 72,15 V55 C72,68 64,78 50,78 C36,78 28,68 28,55 V15 Z" fill="#1d4ed8" opacity="0.9"/>
    
    {/* Decorative elements inside the U to mimic the iconic pattern */}
    <path d="M50,15 L50,25 M40,20 L60,20" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="40" r="4" fill="white" />
    <path d="M42,55 Q50,65 58,55" stroke="white" strokeWidth="3" fill="none" />
    <path d="M40,10 L45,5 L55,5 L60,10" fill="none" stroke="white" strokeWidth="2" opacity="0.5"/>
  </svg>
);
