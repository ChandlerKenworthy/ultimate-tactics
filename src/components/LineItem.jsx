import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Handle from './Handle';
import { v4 as uuidv4 } from 'uuid';

function LineItem({id, type, pos, zIndex, isSelected, setAsSelected}) {
    const handleOneRef = useRef(null);

    // TODO: When the drag ends this triggers the function inside of App which is adding a new element 
    // because when we drag this line drag end is handled at that point!!

    //useEffect(() => {
    //    if(handleOneRef.current) {
    //        console.log(handleOneRef.current.getBoundingClientRect());
    //    }
    //}, []);
    
    return (
        <Handle id={uuidv4()} pos={pos} innerRef={handleOneRef} z={zIndex} />
    )
}

export default LineItem;

/*
function LineItem({ id, type, pos, zIndex, isSelected, setAsSelected }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: id});
    const transformStyle = { transform: CSS.Translate.toString(transform) };
    const lineLength = 50

    const [isHovered, setIsHovered] = useState(false);
    const [start, setStart] = useState({x: pos.x - (lineLength / 2), y: pos.y - (lineLength / 2)});
    const [end, setEnd] = useState({x: pos.x + (lineLength / 2), y: pos.y + (lineLength / 2)});
    const halfLength = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)) / 2;

    const base = {
        position: 'absolute',
        zIndex: zIndex,
        left: pos.x,
        top: pos.y,
        cursor: isHovered ? 'grab' : 'pointer',
    };

    return (
        <div
            style={{...base, ...transformStyle}}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            {<div 
            {...listeners}
            {...attributes}
            style={{
                ...styles.handle, 
                top: -handleDiameter / 2,
                left: -handleDiameter / 2,
                ...transformStyle
            }}></div>}
            <svg 
                viewBox="0 0 {halfLength*2} {halfLength*2}" 
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                onMouseEnter={() => setIsHovered(true)}  // Set hover state to true
                onMouseLeave={() => setIsHovered(false)} // Set hover state to false
                onMouseDown={(e) => {
                    e.stopPropagation();
                    setAsSelected(id);
                }}
        >
                <line 
                    x1="0" 
                    y1="0" 
                    x2={halfLength*2} 
                    y2={halfLength*2} 
                    stroke="black" 
                    strokeWidth='2px'
                    //style="stroke-dasharray:10,10"
                />
            </svg>
            {<div 
            {...listeners}
            {...attributes}
            style={{
                ...styles.handle, 
                bottom: 0,
                right: -handleDiameter / 2,
            }}></div>}
        </div>
    );
}

const styles = {
    handle: {
        position: 'absolute',
        width: handleDiameter,
        height: handleDiameter,
        borderRadius: '50%',
        background: 'black'
    }
};

export default LineItem;
*/

