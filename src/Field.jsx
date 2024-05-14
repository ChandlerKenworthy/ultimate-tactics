import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DraggableItems from "./DraggableItems";
import Draggable from "./draggables/Draggable";
import { LuUndo, LuRedo } from "react-icons/lu";
import { RiSave3Line } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import IconButton from "./IconButton";
import DashedLine from "./draggables/DashedLine";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const fieldLength = 1000; // in pixels
const marks = [
    {
        value: 0.5,
        label: '0.5',
      },
    {
      value: 1,
      label: '1.0',
    },
    {
      value: 2,
      label: '2.0',
    },
    {
        value: 3,
        label: '3.0',
      },
    {
        value: 4,
        label: '4.0',
      },
  ];
  
function valuetext(value) {
return `${value}`;
}

export const ScaleContext = React.createContext(1.0);

function Field() {
    const [scale, setScale] = useState(1.0);
    const [selectedItem, setSelectedItem] = useState(1); // 1, 2, 3, 4, 5 (correspond to e.g. disc)
    const [fieldItems, setFieldItems] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [lines, setLines] = useState([]);

    useEffect(() => {
        function handleKeyDown(event) {
          if (event.key === "ArrowRight") {
            // Left arrow key is pressed
            setSelectedItem(prevItem => {
                if(prevItem == 5) {
                    return 1;
                } else {
                    return prevItem + 1;
                }
            });
          } else if(event.key === "ArrowLeft") {
            // Right arrow key is pressed
            setSelectedItem(prevItem => {
                if(prevItem == 1) {
                    return 5;
                } else {
                    return prevItem - 1;
                }
            });
          }
        }
    
        // Add event listener for keydown event
        window.addEventListener("keydown", handleKeyDown);
    
        // Remove event listener on component unmount
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, []); // Empty dependency array ensures that this effect runs only once

    function addLine(x, y) {
        // Check if the last line has a complete set of points
        // if so the user is adding another line and these co-ordinates are the start
        // otherwise these co-ordinates are the end point of the line
        if(lines.length === 0) {
            setLines([{
                id: uuidv4(),
                x0: x,
                y0: y,
                x1: null,
                y1: null
            }]);
        } else {
            let lastLine = lines[lines.length - 1];
            if(lastLine.x1 === null && lastLine.y1 === null) {
                setLines([...lines.slice(0,-1), {
                    ...lastLine,
                    x1: x,
                    y1: y
                }]);
            } else { // Last line in the list has a complete set of points, add a new line
                setLines([...lines, {
                    id: uuidv4(),
                    x0: x,
                    y0: y,
                    x1: null,
                    y1: null
                }])
            }
        }
    }

    function addFieldElement(event) {
        if(!isDragging) { // Don't add elements when dragging
            const fieldRect = event.currentTarget.getBoundingClientRect(); // Get the position and dimensions of the field div
            const x = event.clientX - fieldRect.left; // Get the x position of the click relative to the field div
            const y = event.clientY - fieldRect.top; // Get the y position of the click relative to the field div

            if(selectedItem === 5) { // Adding a point for the line
                addLine(x, y);
            } else {
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
    }

    function removeFieldElement(id) {
        if(!isDragging) {
            setFieldItems(fieldItems.filter((item) => {
                return item.id !== id;
            })); // Remove the item
        }
    }

    function removeLineElement(id) {
        if(!isDragging) {
            setLines(lines.filter((item) => {
                return item.id !== id;
            })); // Remove the line
        }
    }

    return (
        <ScaleContext.Provider value={{ scale: scale, setScale: setScale }}>  
            <DraggableItems selected={selectedItem} setSelectedItem={setSelectedItem} />
            <div style={styles.actionButtonWrapper}>
                <IconButton onClick={() => {}}><LuUndo /></IconButton>
                <IconButton onClick={() => {}}><LuRedo /></IconButton>
                <IconButton onClick={() => {}}><RiSave3Line /></IconButton>
                <IconButton onClick={() => {
                    setFieldItems([]);
                    setLines([]);
                }}><FaRegTrashCan /></IconButton>
                <Box sx={{ width: 300 }}>
                <Slider
                    min={0.1}
                    max={4.0}
                    aria-label="IconScale"
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    step={0.1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(event, value) => setScale(value)}
                />
                </Box>
            </div>
            <div className="field" style={styles.field} onClick={addFieldElement}>
                {lines.map((item) => {
                    if(item.x0 !== null && item.y0 != null && item.x1 !== null && item.y1 !== null) {
                        return (
                            <DashedLine
                                key={item.id}
                                id={item.id}
                                x0={item.x0}
                                y0={item.y0}
                                x1={item.x1}
                                y1={item.y1}
                                removeElementHandler={removeLineElement}
                                setIsDragging={setIsDragging}
                            />
                        )
                    }
                })}
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
        </ScaleContext.Provider>
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
    },

    actionButtonWrapper: {
        display: "flex",
        alignIems: "center",
        justifyContent: "center",
        margin: "auto",
        marginTop: 15,
    },
};

export default Field;