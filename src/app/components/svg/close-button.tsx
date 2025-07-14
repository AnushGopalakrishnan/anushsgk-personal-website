import React from 'react';

export const CloseButton = ({ 
    width = 28, 
    height = 29, 
    fill = "black", 
    className = "" 
  }) => {
    return (
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 28 29" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ cursor: 'pointer' }}
      >
        <path 
          d="M20.9515 8.48438L15.1468 14.2891L20.9515 20.0938L19.7484 21.2969L13.9456 15.4941L8.14288 21.2969L6.93976 20.1094L12.7444 14.3047L6.93976 8.5L8.14288 7.29688L13.9456 13.0996L19.7484 7.29688L20.9515 8.48438Z" 
          fill={fill}
        />
      </svg>
    );
  };