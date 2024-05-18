import { red, blue, grey } from '@mui/material/colors';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

function FieldItem({id, type, pos, zIndex, isSelected, setAsSelected}) {
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
    };

    let style = base;
    if(type === 1) {
       style = {...base, ...styles.offence};
    } else if(type === 2) {
        style = {...base, ...styles.defence};
    } else if(type === 3) {
        style = {...base, ...styles.disc};
    } else {
        style = {...base, background: 'green', width: 30, height: 30}
    }
    
    return (
        <div 
            style={{...style, ...transformStyle}}
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

const styles = {
    offence: {
        background: red[600],
        width: 25,
        height: 25,
        borderRadius: '50%'
    },

    defence: {
        background: blue[500],
        width: 25,
        height: 25,
        borderRadius: '50%'
    },

    disc: {
        background: grey[100],
        width: 20,
        height: 20,
        borderRadius: '50%'
    }
}

export default FieldItem;