import React from "react";

function Offence({key, x, y}) {
    const discDiameter = 20;

    const styles = {
        disc: {
            width: discDiameter,
            height: discDiameter,
            borderRadius: "50%",
            background: "#4fade8",
            position: "absolute",
            left: x - (discDiameter / 2),
            top: y - (discDiameter / 2),
        }
    };

    return (
        <div key={key} className="disc" style={styles.disc}>
            
        </div>
    )
}

export default Offence;