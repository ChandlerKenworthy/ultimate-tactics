import React from "react";
import { draggableItemsList } from "./Constants"

function DraggableItems({selected, setSelectedItem}) {
    return (
        <ul style={styles.list}>
            {draggableItemsList.map((item) => {
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