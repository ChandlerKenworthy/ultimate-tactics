import { useEffect, useState } from "react";
import { diameterFromType, colorFromType } from "../Constants";

function Draggable({id, x0, y0, itemType, removeElementHandler, setIsDragging}) {
    const diameter = diameterFromType[itemType];
    const backgroundColor = colorFromType[itemType];
    const [pos, setPos] = useState({x: x0, y: y0});

    function dragHandler(event) {
        // Update the position of the element during dragging
        const fieldRect = event.currentTarget.parentElement.getBoundingClientRect();
        const newX = event.clientX - fieldRect.left - diameter / 2;
        const newY = event.clientY - fieldRect.top - diameter / 2;
        setPos({x: newX, y: newY});
    }

    return (
        <div 
            className="circle" 
            style={{
                width: diameter,
                height: diameter,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: "white",
                textAlign: "center",
                borderRadius: "50%",
                background: backgroundColor,
                position: "absolute",
                left: pos.x - (diameter / 2),
                top: pos.y - (diameter / 2),
                zIndex: 100
            }}
            onClick={(event) => {
                event.stopPropagation();
                removeElementHandler(id)
            }}
            draggable="true"
            onDrag={dragHandler}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
        >
            {itemType === 1 ? "" : (itemType === 2 ? "O" : "D")}
        </div>
    )
}

export default Draggable;