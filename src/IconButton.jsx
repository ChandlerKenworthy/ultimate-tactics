import { useState } from "react";

function IconButton({ children, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const wrapperStyle = {
        ...styles.wrapper,
        color: isHovered ? "red" : "black",
    }

    return (
        <div 
            style={wrapperStyle}
            className={`action-button ${isHovered ? "spin" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

const styles = {
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 26,
        marginLeft: 10,
        marginRight: 10
    },
};

export default IconButton;