import React from 'react';

export const LeftArrowIcon = ({ 
  width = 31, 
  height = 29, 
  fill = "black", 
  className = "",
  onClick = undefined 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 31 29" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ cursor: 'pointer'}}
    >
      <path 
        d="M14.8361 21.2969L7.83612 14.297L14.8361 7.297L16.0392 8.48449L11.0861 13.4376H23.9142V15.1563H11.0861L16.0392 20.0938L14.8361 21.2969Z" 
        fill={fill}
      />
    </svg>
  );
};