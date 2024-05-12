import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DraggableItems from "./DraggableItems";
import { diameterFromType } from "./Constants";
import Draggable from "./draggables/Draggable";

const fieldLength = 1000; // in pixels

function Field() {
    const [selectedItem, setSelectedItem] = useState(1); // 1, 2, 3, 4, 5 (correspond to e.g. disc)
    const [fieldItems, setFieldItems] = useState([]); // [1, 2, 3, 4, 5


    function addFieldElement(event) {
        const fieldRect = event.currentTarget.getBoundingClientRect(); // Get the position and dimensions of the field div
        const x = event.clientX - fieldRect.left; // Get the x position of the click relative to the field div
        const y = event.clientY - fieldRect.top; // Get the y position of the click relative to the field div

        // Only add the element if it is not a click on an existing element
        let doAddItem = true;
        for (let i = 0; i < fieldItems.length; i++) {
            const isInElement = Math.pow(fieldItems[i].x - x, 2) + Math.pow(fieldItems[i].y - y, 2) < Math.pow(diameterFromType[fieldItems[i].type], 2);
            if(isInElement) {
                doAddItem = false;
            }
        }
        
        if(doAddItem) {
            setFieldItems([
                ...fieldItems,
                {
                    id: fieldItems.length + 1,
                    x: x,
                    y: y,
                    type: selectedItem
                }
            ]);
        }
    }

    function removeFieldElement(id) {
        setFieldItems(fieldItems.filter((item) => {
            return item.id !== id;
        })); // Remove the item
    }

    return (
        <>
            
            <DraggableItems selected={selectedItem} setSelectedItem={setSelectedItem} />
            <div className="field" style={styles.field} onClick={addFieldElement}>
                {fieldItems.map((item) => {
                        return (
                            <Draggable 
                                key={uuidv4()} 
                                id={item.id} 
                                itemType={item.type} 
                                x={item.x} 
                                y={item.y} 
                                removeElementHandler={removeFieldElement}
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
    },

    endzone: {
        width: fieldLength * 0.18,
        height: fieldLength * 0.37,
        background: "#5ac46d",
        borderRight: "1px solid white",
        borderLeft: "1px solid white",
        position: "absolute",
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
    },

    brickMarkLeft: {
        left: (fieldLength * 0.36) - 10,
    },

    brickMarkRight: {
        right: (fieldLength * 0.36) - 10,
    }
};

export default Field;