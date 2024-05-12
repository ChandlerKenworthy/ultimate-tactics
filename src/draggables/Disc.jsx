import React from "react";

function Disc({key, x, y}) {
    const discDiameter = 15;

    const styles = {
        disc: {
            width: discDiameter,
            height: discDiameter,
            borderRadius: "50%",
            background: "#f0f0f0",// "#4fade8",
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

export default Disc;