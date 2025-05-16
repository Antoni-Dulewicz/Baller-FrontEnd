import Header from './Header';
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Select, MenuItem } from '@mui/material';
import { createVenue } from '../services/eventService';

const VenuesPage = () => {

    const defaultFormData = {
        name: '',
        location: '',
        description: '',
    };

    const [formData, setFormData] = useState(defaultFormData);

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async e => {
            e.preventDefault();
    
            console.log('Dodano wydarzenie:', formData);
    
            try {
                await createVenue(formData);
                setFormData(defaultFormData);
            } catch (error) {
                console.error('Błąd przy dodawaniu wydarzenia:', error);
            }
    
            setFormData(defaultFormData);
        };

  

    return (
        <div>
            <Header title="Sedziowie" />

            <Paper sx={{ maxWidth: 500, margin: '2rem auto', padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Dodaj nowy obiekt
                </Typography>
                <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                    <TextField label="Nazwa obiektu" name="name" value={formData.name} onChange={handleChange} required />
                    <Select label="Lokalizacja" name="location" value={formData.location} onChange={handleChange} required>
                        <MenuItem key="krakow" value="Kraków">
                            Kraków
                        </MenuItem>
                    </Select>
                    <TextField label="Opis" name="description" value={formData.description} onChange={handleChange} multiline rows={4} />
                    <Button type="submit" variant="contained" color="primary">
                        Dodaj obiekt
                    </Button>
                </Box>
            </Paper>

        </div>
    );
};

export default VenuesPage;
