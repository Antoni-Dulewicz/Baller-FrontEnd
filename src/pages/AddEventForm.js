import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Select, MenuItem } from '@mui/material';
import { getVenues, createEvent } from '../services/eventService';
import Header from './Header';

const AddEventForm = () => {
    const defaultFormData = {
        name: '',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        location: '',
        description: '',
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const data = await getVenues();
                setVenues(data);
                console.log('Fetched venues:', data);
            } catch (error) {
                console.error('Error fetching venues:', error);
            }
        };
        fetchVenues();
    }, []);

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
            await createEvent(formData);
            setFormData(defaultFormData);
        } catch (error) {
            console.error('Błąd przy dodawaniu wydarzenia:', error);
        }

        setFormData(defaultFormData);
    };

    return (
        <div>        
            <Header title="Wydarzenia" />

            <Paper sx={{ maxWidth: 500, margin: '2rem auto', padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Dodaj nowe wydarzenie
                </Typography>
                <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                    <TextField label="Nazwa wydarzenia" name="name" value={formData.name} onChange={handleChange} required />
                    <TextField
                        label="Początek wydarzenia"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                    <TextField label="Koniec wydarzenia" name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
                    <Select label="Lokalizacja" name="location" value={formData.location} onChange={handleChange} required>
                        {venues.map(venue => (
                            <MenuItem key={venue.id} value={venue}>
                                {venue.name} - {venue.location}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField label="Opis" name="description" value={formData.description} onChange={handleChange} multiline rows={4} />
                    <Button type="submit" variant="contained" color="primary">
                        Dodaj wydarzenie
                    </Button>
                </Box>
            </Paper>
        </div>
    );
};

export default AddEventForm;
