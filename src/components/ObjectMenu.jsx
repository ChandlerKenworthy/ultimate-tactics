// Renders all the custom user options for the selected item including:
// 1. Changing the object colour
// 2. Raising or lowering the z-index
// 3. Changing the scale (size) of the object
// 4. Deleting the object from the canvas

import { grey } from "@mui/material/colors";
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { HexColorPicker } from "react-colorful";

function ObjectMenu({ selectedId, selectedItem, updateSelectedItem, deleteElementHandler, updateItemZIndex }) {


    return (
        <div style={styles.container}>
            <h3>Object Editor</h3>
            <div style={styles.row}>
                <HexColorPicker 
                    color={selectedId ? selectedItem.color : "#000"}
                    onChange={(color) => updateSelectedItem({
                        ...selectedItem,
                        color: color
                    })}
                    style={styles.picker}
                />
            </div>
            <div style={styles.row}>
                <button style={styles.btn} onClick={() => { if(selectedId) updateItemZIndex(-1) }}>
                    <FlipToBackIcon fontSize='medium' />
                </button>
                <button style={styles.btn} onClick={() => { if(selectedId) updateItemZIndex(1) }}>
                    <FlipToFrontIcon fontSize='medium' />
                </button>
                <button style={styles.btn} onClick={() => {if(selectedId) deleteElementHandler()}}>
                    <DeleteIcon fontSize='medium' />
                </button>
            </div>
            <div style={styles.row}>
                <p>Size slider</p>
                <p>Line type picker</p>
            </div>
        </div>
    )
}

const styles = {
    container: {
        background: grey[50],
        borderRadius: '20px',
        height: '400px',
        width: '200px',
        marginLeft: '20px',
        padding: '0px 10px'
    },

    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '200px'
    },

    btn: {
        borderRadius: 0
    },

    picker: {
        width: '200px',
    }
};

export default ObjectMenu;