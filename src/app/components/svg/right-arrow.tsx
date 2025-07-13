export const RightArrowIcon = ({ 
    width = 30, 
    height = 29, 
    fill = "black", 
    className = ""
  }) => {
    return (
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 30 29" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ cursor:  'pointer' }}
      >
        <path 
          d="M16.0179 21.2969L14.8147 20.1095L19.7678 15.1563H6.93976V13.4376H19.7678L14.8147 8.50012L16.0179 7.297L23.0178 14.297L16.0179 21.2969Z" 
          fill={fill}
        />
      </svg>
    );
  };