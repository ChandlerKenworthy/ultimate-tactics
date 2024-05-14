import { useState, useContext } from "react";
import { ScaleContext } from "../Field";

function DashedLine({id, x0, y0, x1, y1, removeElementHandler, setIsDragging}) {
    const {scale, setScale} = useContext(ScaleContext);

    const [start, setStart] = useState({x: x0, y: y0});
    const [end, setEnd] = useState({x: x1, y: y1});
    const [offset, setOffset] = useState({top: Math.min(start.y, end.y), left: Math.min(start.x, end.x)});
    const [dragStart, setDragStart] = useState({x: null, y: null});

    /*function dragHandler(event) {
        console.log("HELLLLPPPP");
        const dx = event.clientX - dragStart.x;
        const dy = event.clientY - dragStart.y;
        setOffset((currOffset) => {
            return {
                top: currOffset.top + dy,
                left: currOffset.left + dx
            }
        });
    }*/

    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    return (
        <svg 
            style={{
                position: "absolute",
                top: offset.top,
                left: offset.left,
                zIndex: 200,
            }}
            //draggable="true"
            //onDrag={dragHandler}
            //onDragStart={(event) => {
            //    console.log("Stating drag");
            //    setDragStart({x: event.clientX, y: event.clientY});
            //    setIsDragging(true)
            //}}
            //onDragEnd={() => {
            //    setDragStart({x: null, y: null});
            //    setIsDragging(false)
            //}}
            width={width}
            height={height} 
            viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
            <line
                onClick={(event) => {
                    event.stopPropagation();
                    removeElementHandler(id)
                }}
                x1={start.x < end.x ? 0 : width}
                y1={start.y < end.y ? 0 : height}
                x2={end.x > start.x ? width : 0}
                y2={end.y > start.y ? height : 0}
                stroke="black"
                strokeWidth={6 * scale}
                strokeDasharray={`${Math.sqrt(width ** 2 + height ** 2) / 10}, ${Math.sqrt(width ** 2 + height ** 2) / 10}`}
                //transform={`rotate(${angle}, ${x0}, ${y0})`}
            />
        </svg>
    )
}

export default DashedLine;