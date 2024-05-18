import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import * as React from 'react';

export default function BottomMenu({setItems}) {
  const [value, setValue] = React.useState(0);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <p>Something 8 wide</p>
      </Grid>
      <Grid item xs={4}>
        <p>Something 4 wide</p>
      </Grid>
    </Grid>
  );
}