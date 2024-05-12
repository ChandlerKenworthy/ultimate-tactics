import React from "react";

function DraggableItems() {
    const items = [
        {id: 1, name: "Disc"},
        {id: 2, name: "Offence"},
        {id: 3, name: "Defence"},
        {id: 4, name: "Cone"},
        {id: 5, name: "Arrow"},
    ]

    return (
        <ul style={styles.list}>
            {items.map((item) => {
                return (
                    <li key={item.id}>{item.name}</li>
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
    }
};

export default DraggableItems;