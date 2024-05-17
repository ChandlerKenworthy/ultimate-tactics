import { Button, Typography } from "@mui/material";
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { blueGrey } from "@mui/material/colors";

function DraggableIconButton({id, text}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: id});
    const style = { transform: CSS.Translate.toString(transform) };

    return (
        <div style={{position: 'relative'}}>
            <Typography
                variant="button"
                component={"h2"}
                style={{
                    color: blueGrey[200], 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 11,
                }}
            >
                {text}
                <Typography
                    variant="button"
                    component={"h2"}
                    ref={setNodeRef}
                    style={{
                        ...style, 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 12, 
                        color: blueGrey[700]
                    }}
                    {...listeners}
                    {...attributes}
                >
                    {text}
                </Typography>
            </Typography>
        </div>
    )
}

export default DraggableIconButton;