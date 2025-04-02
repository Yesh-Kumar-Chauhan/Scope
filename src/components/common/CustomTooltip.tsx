import React, { useState, ReactNode } from 'react';

interface CustomTooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-1';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-1';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-1';
      default: // top
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-1';
    }
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap ${getPositionClasses()}`}>
          {content}
        </div>
      )}
    </div>
  );
};



export const TruncatedText: React.FC<any> = ({
  text,
  maxLength = 30,
  className = '',
  tooltipPosition = 'top',
  tooltipDelay = 0,
}) => {
  const truncated = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <CustomTooltip content={text} position={tooltipPosition} delay={tooltipDelay}>
      <span className={`block truncate ${className}`}>{truncated}</span>
    </CustomTooltip>
  );
};