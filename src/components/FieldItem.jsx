import { red, blue, grey } from '@mui/material/colors';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function FieldItem({id, type, pos}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: id});
    const transformStyle = { transform: CSS.Translate.toString(transform) };

    const base = {
        position: 'absolute',
        zIndex: 100,
        left: pos.x,
        top: pos.y
    };

    let style = base;
    if(type === 1) {
       style = {...base, ...styles.offence};
    } else if(type === 2) {
        style = {...base, ...styles.defence};
    } else if(type === 3) {
        style = {...base, ...styles.disc};
    } else {
        style = {...base, background: 'green', width: 30, height: 30}
    }
    
    return (
        <div 
            style={{...style, ...transformStyle}}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
        </div>
    )
}

const styles = {
    offence: {
        background: red[600],
        width: 25,
        height: 25,
        borderRadius: '50%'
    },

    defence: {
        background: blue[500],
        width: 25,
        height: 25,
        borderRadius: '50%'
    },

    disc: {
        background: grey[100],
        width: 20,
        height: 20,
        borderRadius: '50%'
    }
}

export default FieldItem;