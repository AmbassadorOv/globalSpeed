import React, { useState, cloneElement } from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  const childWithProps = cloneElement(children, {
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
  });

  return (
    <div className="tooltip-container">
      {childWithProps}
      {isTooltipVisible && (
        <div className="tooltip-text" role="tooltip">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
