import { red, blue, grey } from '@mui/material/colors';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

function FieldItem({id, type, color, pos, zIndex, isSelected, setAsSelected, scale }) {
    const [isHovered, setIsHovered] = useState(false);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: id});
    const transformStyle = { transform: CSS.Translate.toString(transform) };

    const base = {
        position: 'absolute',
        zIndex: zIndex,
        left: pos.x,
        top: pos.y,
        cursor: isHovered ? 'grab' : 'pointer',
        border: isSelected ? '2px solid #2196f3' : 'none',
        boxShadow: isSelected ? 'rgba(149, 157, 165, 0.5) 0px 8px 24px' : 'none',
        background: color,
        width: type === 3 ? 20 * scale : 25 * scale,
        height: type === 3 ? 20 * scale : 25 * scale,
        borderRadius: '50%'
    };
    
    return (
        <div 
            style={{...base, ...transformStyle}}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onMouseEnter={() => setIsHovered(true)}  // Set hover state to true
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false
            onMouseDown={(e) => {
                e.stopPropagation();
                setAsSelected(id);
            }}
        >
        </div>
    )
}

export default FieldItem;