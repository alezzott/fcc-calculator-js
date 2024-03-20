import PropTypes from 'prop-types';
import { useState } from 'react';

export function Tooltip({ text, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="relative inline-block">
      <div onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {children}
      </div>
      {showTooltip && text && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-sm rounded-lg">
          {text}
        </div>
      )}
    </section>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
