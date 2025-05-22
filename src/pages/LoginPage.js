import ChooseUserType from '../components/ChooseUserType';
import { 
    Box, Button, TextField, Typography, Paper, Select,
    MenuItem, Grid, Card, CardContent, formError, Alert, 
    Collapse } from '@mui/material';
import { useState } from 'react';

const LoginPage = () => {

    const handleSubmit = () => {}
    const [formData, setFormData] = useState();
    const types = ["Gracz", "Sędzia", "Administrator"]


    console.log("BGFD")
    return (
        <Paper sx={{ maxWidth: 400, margin: '2rem auto', padding: 3 }}>
            
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 900 }}>
                Rejestracja
            </Typography>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} marginTop={10}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData}
                    onChange={handleSubmit}
                    required
                />
                <TextField
                    label="Hasło"
                    name="password"
                    type="password"
                    value={formData}
                    onChange={handleSubmit}
                    required
                />
                <TextField 
                    label="Powtórz hasło"
                    name="reply-password"
                    type="password"
                    value={formData}
                    onChange={() => {}}
                    required
                />
                <ChooseUserType
                    types={types}
                />
                <Button type="submit" variant="contained" color="primary">
                    Zaloguj
                </Button>
            </Box>
        </Paper>
    );
}

export default LoginPage;