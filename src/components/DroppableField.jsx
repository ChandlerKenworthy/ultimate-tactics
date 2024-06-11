import { useDroppable } from "@dnd-kit/core";
import FieldItem from "./FieldItem";
import LineItem from "./LineItem";

const fieldLength = 1100;
const FIELD_ID = 'field';

function DroppableField({fieldItems, lineItems, selected, setSelected}) {
    const {setNodeRef} = useDroppable({id: FIELD_ID});

    function setSelectedHandler(id) {
        setSelected(id);
    }

    return (
        <div ref={setNodeRef} style={styles.field} onClick={() => setSelectedHandler(null)}>
            {fieldItems.map((item) => {
                return (
                    <FieldItem 
                        key={item.id} 
                        id={item.id} 
                        type={item.type} 
                        pos={item.position}
                        zIndex={item.zIndex}
                        color={item.color}
                        isSelected={selected === item.id}
                        setAsSelected={setSelectedHandler}
                    />
                );
            })}
            {lineItems.map((line) => {
                return (
                    <LineItem 
                        key={line.id}
                        id={line.id}
                        color={line.color}
                        posHandleL={line.posHandleL}
                        posHandleR={line.posHandleR}
                        handleLID={line.handleLID}
                        handleRID={line.handleRID}
                        zIndex={line.zIndex}
                        isSelected={selected === line.id}
                        setAsSelected={setSelectedHandler}
                    />
                );
            })}
            <div className="endzone" style={{...styles.endzone, ...styles.endZoneLeft}}></div>
            <div className="brickMark" style={{...styles.brickMark, ...styles.brickMarkLeft}}>x</div>
            <div className="brickMark" style={{...styles.brickMark, ...styles.brickMarkRight}}>x</div>
            <div className="endzone" style={{...styles.endzone, ...styles.endZoneRight}}></div>
        </div>
    )
}

const styles = {
    field: {
        width: fieldLength,
        height: fieldLength * 0.37,
        position: "relative",
        background: "#69d17b",
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

export default DroppableField;