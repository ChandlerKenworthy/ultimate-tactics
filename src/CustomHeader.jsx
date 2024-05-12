import { FaGithub } from "react-icons/fa";

function CustomHeader() {
    return (
        <header>
            <h1 style={styles.headerText}>Ultimate Frisbee Tactics Board</h1>
            <h5 style={styles.infoBar}>Current Version: v0.1.0 | Soure Code: <a style={styles.linkStyle} href="https://github.com/ChandlerKenworthy/ultimate-tactics"><FaGithub /></a></h5>
            <p>Left click and drag from the menu to add elements to the pitch. Right click on an element to remove it. You can reposition elements by left click dragging.</p>
        </header>
    )
}

const styles = {
    headerText: {
        fontSize: 40,
        marginBottom: "10px",
    },

    infoBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 14,
        color: "#666",
        marginTop: 0,
    },

    linkStyle: {
        color: "#04a4c4",
        marginLeft: 5
    }
};

export default CustomHeader;