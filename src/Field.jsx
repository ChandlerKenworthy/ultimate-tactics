import React from "react";

const fieldLength = 900; // in pixels

function Field() {
    return (
        <div className="field" style={styles.field}>
            <div className="endzone" style={styles.endzone}>

            </div>
            
            <div className="endzone" style={styles.endzone}>
                
            </div>
        </div>
    )
}

const styles = {
    field: {
        width: fieldLength,
        height: fieldLength * 0.37,
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        background: "#69d17b",
    },

    endzone: {
        width: fieldLength * 0.18,
        height: fieldLength * 0.37,
        background: "#5ac46d",
        borderRight: "1px solid white",
        borderLeft: "1px solid white"
    }
};

export default Field;