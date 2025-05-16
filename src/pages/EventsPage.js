import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Select, MenuItem, Collapse } from '@mui/material';
import CustomTable from '../components/Table/Table';
import { getVenues, createEvent, getEvents } from '../services/eventService';
import Header from '../components/Header';

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
    const [events, setEvents] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

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

        const fetchEvents = async () => {
            try{
                const data = await getEvents();
                setEvents(data);
                console.log('Fetched events:', data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchVenues();
        fetchEvents();

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
            
            // Pobierz zaktualizowaną listę wydarzeń po dodaniu nowego
            const updatedEvents = await getEvents();
            setEvents(updatedEvents);
            
            // Zamknij formularz po dodaniu wydarzenia
            setIsFormOpen(false);
        } catch (error) {
            console.error('Błąd przy dodawaniu wydarzenia:', error);
        }
    };

    const handleUpdate = async (id) => {

    }

    const handleDelete = async (id) => {

    }

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const columns = [
        { header: 'Nazwa wydarzenia', accessor: 'name' },
        { header: 'Od', accessor: 'start_date' },
        { header: 'Do', accessor: 'end_date' },
        {
            header: 'Edytuj',
            accessor: 'id',
            render: (id) => (
            <Button variant="contained" color="primary" onClick={() => handleUpdate(id)}>
                Edytuj
            </Button>
            ),
        },
        {
            header: 'Usuń',
            accessor: 'id',
            render: (id) => (
            <Button variant="contained" color="primary" onClick={() => handleDelete(id)}>
                Usuń
            </Button>
            ),
        }
    ];

    return (
        <div>        
            <Header title="Wydarzenia" />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={toggleForm}
                >
                    {isFormOpen ? 'Anuluj dodawanie' : 'Dodaj nowe wydarzenie'}
                </Button>
            </Box>

            <Collapse in={isFormOpen}>
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
            </Collapse>

            <CustomTable data={events} columns={columns} />
        </div>
    );
};

export default AddEventForm;