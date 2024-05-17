import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Task from './Task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function Column({tasks}) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid 
                container 
                direction="column"
                spacing={2}
            >
                <SortableContext
                    items={tasks}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((item) => {
                        return (
                            <Grid key={item.id} item xs={12}>
                               <Task id={item.id} title={item.title} />
                            </Grid>
                        )
                    })}
                </SortableContext>
            </Grid>
    </Box>
    )
}

export default Column;