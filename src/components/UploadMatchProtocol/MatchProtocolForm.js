import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';

export function MatchProtocolForm({ open, handleClose, players }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Wprowadź protokół meczu</DialogTitle>
            <Box
                component="form"
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Select defaultValue="" displayEmpty>
                        <MenuItem value="" disabled>
                            Wybierz zawodnika
                        </MenuItem>
                        {players.map((player, idx) => (
                            <MenuItem key={idx} value={player}>
                                {player}
                            </MenuItem>
                        ))}
                    </Select>
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
