import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';

export default function BottomMenu({selected, deleteElementHandler, setItems, setLines, handleExport, handleUndo, historyLength}) {
  return (
    <div style={styles.wrapper}>
      <Grid container spacing={2}>
        <Grid item xs={3} container justifyContent="center" alignItems="center">
          <button style={styles.btn} onClick={handleExport}>
            <SaveIcon fontSize='medium' />
            <p style={styles.btnText}>Save</p>
          </button>
        </Grid>
        <Grid item xs={3} container justifyContent="center" alignItems="center">
          <button style={styles.btn} onClick={handleUndo}>
            <UndoIcon fontSize='medium' style={{color: historyLength ? 'black' : grey[400]}} />
            <p style={{...styles.btnText, color: historyLength ? 'black' : grey[400]}}>Undo</p>
          </button>
        </Grid>
        <Grid item xs={3} container justifyContent="center" alignItems="center">
          <button style={styles.btn} onClick={() => console.log("implement me")}>
            <RedoIcon fontSize='medium' style={{color: historyLength ? 'black' : grey[400]}} />
            <p style={{...styles.btnText, color: historyLength ? 'black' : grey[400]}}>Redo</p>    
          </button>
        </Grid>
        <Grid item xs={3} container justifyContent="center" alignItems="center">
          <button style={styles.btn} onClick={() => {
            setItems([]);
            setLines([]);  
          }}>
            <DeleteForeverIcon fontSize='medium' />
            <p style={styles.btnText}>Clear</p>
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
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: grey[200]
  },

  btnText: {
    margin: 0,
    padding: 0,
    fontSize: 14,
    marginTop: '5px'
  }
}