import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Handle from './Handle';

function LineItem({ id, type, posHandleL, posHandleR, handleLID, handleRID, zIndex, isSelected, setAsSelected }) {
    const dx = Math.abs(posHandleR.x - posHandleL.x);
    const dy = Math.abs(posHandleR.y - posHandleL.y);
    const handleDiameter = 15;

  // Determine the bounds of the SVG container
  const minX = Math.min(posHandleL.x, posHandleR.x);
  const minY = Math.min(posHandleL.y, posHandleR.y) + (handleDiameter / 2);
  const maxX = Math.max(posHandleL.x, posHandleR.x) + (handleDiameter);
  const maxY = Math.max(posHandleL.y, posHandleR.y) + (handleDiameter);

  // Calculate the width and height of the SVG container
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <div>
      <Handle id={handleLID} pos={posHandleL} z={zIndex} />
      <svg 
        width={width + 2} 
        height={height + 2} 
        style={{ position: 'absolute', left: minX, top: minY }}
      >
        <line 
          x1={posHandleL.x - minX} // TODO: Adjust these so they run through the middle of the handles
          y1={posHandleL.y - minY} // TODO: Adjust these so they run through the middle of the handles
          x2={posHandleR.x - minX} // TODO: Adjust these so they run through the middle of the handles
          y2={posHandleR.y - minY} // TODO: Adjust these so they run through the middle of the handles
          stroke="black" 
          strokeWidth="2" 
          strokeDasharray="5,5" // This sets the dashed line pattern
        />
      </svg>
      <Handle id={handleRID} pos={posHandleR} z={zIndex} />
    </div>
  )
}

export default LineItem;