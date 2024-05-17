import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Grid from "@mui/material/Grid";
import { useState } from "react";

function Task({id, title}) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
    const [isChecked, setIsChecked] = useState(false);

    const style = {
        border: "1px solid black",
        touchAction: "none",
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <Grid
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            container 
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
        >
            <FormGroup>
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={isChecked} 
                            onChange={(event) => setIsChecked(event.target.checked)} 
                        />
                    } 
                    label="Label" 
                />
            </FormGroup>
            <p>{title}</p>
        </Grid>
    )
}

export default Task;