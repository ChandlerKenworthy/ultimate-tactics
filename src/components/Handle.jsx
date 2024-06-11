import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';

// A draggable item that, in pairs describe a line, a handle has a position
function Handle({ id, pos, z, color }) {
    const [isHovered, setIsHovered] = useState(false);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: id});
    const transformStyle = { transform: CSS.Translate.toString(transform) };

    const wrapperStyle = {
        position: 'absolute',
        top: pos.y,
        left: pos.x,
        width: 15,
        height: 15,
        borderRadius: '50%',
        background: color,
        cursor: isHovered ? 'grab' : 'pointer',
        zIndex: z
    };
    
    return (
            <div
                style={{...wrapperStyle, ...transformStyle}}
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                onMouseEnter={() => setIsHovered(true)}  // Set hover state to true
                onMouseLeave={() => setIsHovered(false)} // Set hover state to false
            >

            </div>
    );
}

/*
                        <div ref={innerRef} style={{width: '100%', height: '100%', borderRadius: '50%'}}>

                        </div>
                        */

export default Handle;