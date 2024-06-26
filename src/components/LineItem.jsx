import { useState } from 'react';
import Handle from './Handle';

function LineItem({ id, color, posHandleL, posHandleR, handleLID, handleRID, zIndex, isSelected, setAsSelected, scale, lineType }) {
  const [isHovered, setIsHovered] = useState(false);

  const dx = posHandleR.x - posHandleL.x;
  const dy = posHandleR.y - posHandleL.y;
  const handleDiameter = 15;

  // Calculate the width and height of the SVG container
  const length = Math.sqrt(dx * dx + dy * dy);

  // Calculate angle of rotation in degrees
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const lineTypeStr = lineType === 1 ? 'solid' : (lineType === 2 ? 'dashed' : 'dotted');

  const lineStyles = {
    width: length,
    height: 0,
    border: `${1 * scale}px ${lineTypeStr} ${color}`,
    position: 'absolute',
    transform: `rotate(${angle}deg)`,
    zIndex: zIndex,
    transformOrigin: '0 0', // Rotate around the top-left corner
    top: posHandleL.y + (handleDiameter / 2),
    left: posHandleL.x + (handleDiameter / 2),
    cursor: isHovered ? 'grab' : 'pointer'
  };

  return (
    <div>
      {isSelected && <Handle id={handleLID} pos={posHandleL} z={zIndex} color={color} />}
      <div
        style={lineStyles}
        onClick={(e) => {
          e.stopPropagation();
          setAsSelected(id)
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

      </div>
      {isSelected && <Handle id={handleRID} pos={posHandleR} z={zIndex} color={color} />}
    </div>
  )
}

export default LineItem;