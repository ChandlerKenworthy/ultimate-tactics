import { diameterFromType, colorFromType } from "../Constants";

function Draggable({id, itemType, x, y, removeElementHandler}) {
    const diameter = diameterFromType[itemType];
    const backgroundColor = colorFromType[itemType];

    const styles = {
        circle: {
            width: diameter,
            height: diameter,
            borderRadius: "50%",
            background: backgroundColor,
            position: "absolute",
            left: x - (diameter / 2),
            top: y - (diameter / 2),
        }
    };

    return (
        <div 
            className="circle" 
            style={styles.circle}
            onClick={() => removeElementHandler(id)}
        >
            
        </div>
    )
}

export default Draggable;