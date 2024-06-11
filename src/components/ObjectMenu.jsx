// Renders all the custom user options for the selected item including:
// 1. Changing the object colour
// 2. Raising or lowering the z-index
// 3. Changing the scale (size) of the object
// 4. Deleting the object from the canvas

import { grey } from "@mui/material/colors";
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import DeleteIcon from '@mui/icons-material/Delete';
import Slider from '@mui/material/Slider';
import { HexColorPicker } from "react-colorful";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ObjectMenu({ selectedId, selectedItem, updateSelectedItem, deleteElementHandler, updateItemZIndex }) {
    function valueText(value) {
        return `${value}`;
    }

    return (
        <div style={styles.container}>
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
                <div style={styles.sliderWrapper}>
                    <Slider 
                        aria-label="Volume" 
                        value={selectedId ? selectedItem.scale : 1.0} 
                        onChange={(event, value) => updateSelectedItem({
                            ...selectedItem,
                            scale: value
                        })} 
                        min={0.2}
                        max={4.0}
                        step={0.2}
                        marks
                        getAriaValueText={valueText}
                        valueLabelDisplay="auto"
                    />
                </div>
            </div>
            {(selectedId && (selectedItem.type >= 4)) && (
                <div style={styles.row}>
                    <FormControl sx={{ m: 1, minWidth: 180 }} size="small" disabled={false}>
                        <InputLabel id="demo-simple-select-autowidth-label">Line</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={selectedItem.styleId}
                        onChange={(event) => updateSelectedItem({
                            ...selectedItem,
                            styleId: event.target.value
                        })}
                        autoWidth
                        label="Age"
                        >
                        <MenuItem value={1}>Solid</MenuItem>
                        <MenuItem value={2}>Dashed</MenuItem>
                        <MenuItem value={3}>Dotted</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            )}
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
        padding: '0px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
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
    },

    sliderWrapper: {
        width: '180px',
    }
};

export default ObjectMenu;