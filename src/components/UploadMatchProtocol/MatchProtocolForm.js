import { Box, Button, Select, MenuItem, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';

export function MatchProtocolForm({ players, handleClose }) {
    return (
        <Box component="form" onSubmit={() => {}}>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <h1>Hello world</h1>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anuluj</Button>
                <Button type="submit" variant="contained">
                    Zapisz
                </Button>
            </DialogActions>
        </Box>
    );
}
