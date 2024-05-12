import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DraggableItems from "./DraggableItems";
import { diameterFromType } from "./Constants";
import Draggable from "./draggables/Draggable";

const fieldLength = 1000; // in pixels

function Field() {
    const [selectedItem, setSelectedItem] = useState(1); // 1, 2, 3, 4, 5 (correspond to e.g. disc)
    const [fieldItems, setFieldItems] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    function addFieldElement(event) {
        if(!isDragging) { // Don't add elements when dragging
            const fieldRect = event.currentTarget.getBoundingClientRect(); // Get the position and dimensions of the field div
            const x = event.clientX - fieldRect.left; // Get the x position of the click relative to the field div
            const y = event.clientY - fieldRect.top; // Get the y position of the click relative to the field div
    
            // Only adds an element when not clicking on an existing element (via stopPropagation)
            setFieldItems([
                ...fieldItems,
                {
                    id: uuidv4(),
                    x0: x,
                    y0: y,
                    type: selectedItem
                }
            ]);

        }
    }

    function removeFieldElement(id) {
        console.log("Removing element");
        if(!isDragging) {
            setFieldItems(fieldItems.filter((item) => {
                return item.id !== id;
            })); // Remove the item
        }
    }

    return (
        <>
            
            <DraggableItems selected={selectedItem} setSelectedItem={setSelectedItem} />
            <div className="field" style={styles.field} onClick={addFieldElement}>
                {fieldItems.map((item) => {
                        return (
                            <Draggable 
                                key={item.id} 
                                id={item.id} 
                                x0={item.x0}
                                y0={item.y0}
                                itemType={item.type} 
                                removeElementHandler={removeFieldElement}
                                setIsDragging={setIsDragging}
                            />
                        )
                })}
                <div className="endzone" style={{...styles.endzone, ...styles.endZoneLeft}}></div>
                <div className="brickMark" style={{...styles.brickMark, ...styles.brickMarkLeft}}>x</div>
                <div className="brickMark" style={{...styles.brickMark, ...styles.brickMarkRight}}>x</div>
                <div className="endzone" style={{...styles.endzone, ...styles.endZoneRight}}></div>
            </div>
        </>
    )
}

const styles = {
    field: {
        width: fieldLength,
        height: fieldLength * 0.37,
        position: "relative",
        background: "#69d17b",
        marginTop: 15,
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: 1,
    },

    endzone: {
        width: fieldLength * 0.18,
        height: fieldLength * 0.37,
        background: "#5ac46d",
        borderRight: "1px solid white",
        borderLeft: "1px solid white",
        position: "absolute",
        zIndex: 2,
    },

    endZoneLeft: {
        left: 0,
        top: 0,
    },

    endZoneRight: {
        right: 0,
        top: 0,
    },

    brickMark: {
        position: "absolute",
        color: "white",
        textAlign: "center",
        height: 20,
        width: 20,
        lineHeight: "20px",
        top: (fieldLength * 0.37 * 0.5) - 10,
        zIndex: 2,
    },

    brickMarkLeft: {
        left: (fieldLength * 0.36) - 10,
    },

    brickMarkRight: {
        right: (fieldLength * 0.36) - 10,
    }
};

export default Field;