import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Typography,
  TextField,
} from '@mui/material';
import { sendProtocol } from '../../services/protocolService';

export function MatchProtocolForm({ open, handleClose, players }) {
  const [winner, setWinner] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      winner,
      score, // np. "6:4, 3:6, 7:5"
    };

    try {
      await sendProtocol(payload); 
      handleClose();
    } catch (err) {
      console.error('Błąd przy wysyłaniu protokołu:', err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Wprowadź protokół meczu</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Select
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>
              Wybierz zwycięzcę
            </MenuItem>
            {players.map(({id, name}) => (
              <MenuItem key={id} value={name}>
              {name}
              </MenuItem>
            ))}
          </Select>
            <Typography variant="body2" color="textSecondary">
                Format: <strong>{players[0].name}</strong> : <strong>{players[1].name}</strong>
            </Typography>
            
          <TextField
            label="Wynik meczu (np. 6:4, 3:6, 7:5)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button type="submit" variant="contained">
            Zapisz
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
