import React from "react";
import { diameterFromType } from "../Constants";

function Disc({id, x, y, removeElementHandler}) {
    const discDiameter = diameterFromType[1];

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
        <div 
            className="disc" 
            style={styles.disc} 
            onClick={() => removeElementHandler(id)}
        >
        </div>
    )
}

export default Disc;