import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';

export default function BottomMenu({setItems}) {
  return (
    <div style={styles.wrapper}>
      <Grid container spacing={2}>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
          <button style={styles.btn} onClick={() => console.log("Implement me")}>
            <SaveIcon fontSize='medium' />
            <p style={styles.btnText}>Save</p>
          </button>
        </Grid>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
          <button style={styles.btn} onClick={() => console.log("Implement me")}>
            <UndoIcon fontSize='medium' />
            <p style={styles.btnText}>Undo</p>
          </button>
        </Grid>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
          <button style={styles.btn} onClick={() => console.log("implement me")}>
            <RedoIcon fontSize='medium' />
            <p style={styles.btnText}>Redo</p>
          </button>
        </Grid>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
          <button style={styles.btn} onClick={() => setItems([])}>
            <DeleteIcon fontSize='medium' />
            <p style={styles.btnText}>Clear</p>
          </button>
        </Grid>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
        <button style={styles.btn} onClick={() => setItems([])}>
            <FlipToBackIcon fontSize='medium' />
            <p style={styles.btnText}>Back</p>
          </button>
        </Grid>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
        <button style={styles.btn} onClick={() => setItems([])}>
            <FlipToFrontIcon fontSize='medium' />
            <p style={styles.btnText}>Front</p>
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: '30px',
    backgroundColor: grey[50],
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px'
  },

  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '15px 20px',
    borderRadius: '50%',
    backgroundColor: grey[200]
  },

  btnText: {
    margin: 0,
    padding: 0,
    marginTop: '5px'
  }
}