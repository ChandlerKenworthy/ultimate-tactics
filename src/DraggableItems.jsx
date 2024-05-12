import React from "react";

function DraggableItems({selected, setSelectedItem}) {
    const items = [
        {id: 1, name: "Disc"},
        {id: 2, name: "Offence"},
        {id: 3, name: "Defence"},
    ]

    return (
        <ul style={styles.list}>
            {items.map((item) => {
                return (
                    <li key={item.id}>
                        <a style={
                            selected === item.id ? {...styles.listLink, ...styles.selectedLink} : styles.listLink
                            } 
                            onClick={() => setSelectedItem(item.id)}>{item.name}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

const styles = {
    list: {
        listStyle: "none",
        padding: 0,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#f1f1f1",
        border: "1px solid #ccc",
        borderRadius: 5,
    },

    listLink: {
        color: "#333"
    },

    selectedLink: {
        color: "red"
    }
};

export default DraggableItems;