import React from "react";
import DraggableItems from "./DraggableItems";

const fieldLength = 1000; // in pixels

function Field() {
    return (
        <>
        <DraggableItems />
        <div className="field" style={styles.field}>
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