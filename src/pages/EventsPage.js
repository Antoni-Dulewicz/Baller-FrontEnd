import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/Table/Table';
import { getVenues, createEvent, getEvents, updateEvent, deleteEvent } from '../services/eventService';
import AdminHeader from '../components/headers/AdminHeader';
import HeaderAdmin from '../components/headers/HeaderAdmin';
import { 
    Box, Button, TextField, Typography, Paper, Select, MenuItem, Collapse,
    Dialog, DialogTitle, DialogContent, DialogActions, Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import CopyrightFooter from '../components/CopyrightFooter';

const AddEventForm = () => {
    const {user} = useAuth()
    console.log(user)

    const navigate = useNavigate();
    const defaultFormData = {
        name: '',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        venues: [],
        description: '',
    };

    const defaultEditFormData = {
        name: '',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        venues: []
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [editFormData, setEditFormData] = useState(defaultEditFormData);
    const [venues, setVenues] = useState([]);
    const [events, setEvents] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    const [formError, setFormError] = useState(null);
    const [editFormError, setEditFormError] = useState(null);

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

        if (formError) setFormError(null);
    };

    const handleEditChange = e => {
        setEditFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (editFormError) setEditFormError(null);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        console.log('Dodano wydarzenie:', formData);
        setFormError(null);

        try {
            await createEvent(formData);
            setFormData(defaultFormData);
            
            // Pobierz zaktualizowaną listę wydarzeń po dodaniu nowego
            const updatedEvents = await getEvents();
            setEvents(updatedEvents);
            
            // Zamknij formularz po dodaniu wydarzenia
            setIsFormOpen(false);
        } catch (error) {
            setFormError(error.message);
        }
    };

    const handleClickEditorOpen = (id) => {
        const eventToEdit = events.find(event => event.id === id);
        console.log(eventToEdit)
        if (eventToEdit) {
            // Format dates for form fields
            const formattedEvent = {
                id: eventToEdit.id,
                name: eventToEdit.name,
                startDate: new Date(eventToEdit.start_date).toISOString().slice(0, 10),
                endDate: new Date(eventToEdit.end_date).toISOString().slice(0, 10),
                venues: venues.filter(venue => eventToEdit.venues.includes(venue.id))
            };
            setEditFormData(formattedEvent);
            setEditorOpen(true);
        }
    };

    const handleClose = (id) => {
        setEditFormError(null);
        setEditorOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            await deleteEvent(id);
            
            const updatedEvents = await getEvents();
            setEvents(updatedEvents);
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async e => {
        e.preventDefault();
        console.log('Edytowano wydarzenie:', editFormData);
        setEditFormError(null);

        try {
            await updateEvent(editFormData);
            setEditFormData(defaultEditFormData)
            
            const updatedEvents = await getEvents();
            setEvents(updatedEvents);
            
            setEditorOpen(false);
        } catch (error) {
            setEditFormError(error.message);
        }

    }

    const handleOpenEventPage = (event) => {
        navigate(`/event/${event.id}`, {state: {event}});
    }
    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const columns = [
        {   
            header: 'Nazwa wydarzenia', 
            accessor: 'name',
            render: (_, event) => (
                <Button variant="contained" color="primary" onClick={() => handleOpenEventPage(event)}>
                    {event.name}
                </Button>
            ),

         },
        { header: 'Od', accessor: 'start_date' },
        { header: 'Do', accessor: 'end_date' },
        {
            header: 'Edytuj',
            accessor: 'id',
            render: (id) => (
            <Button variant="contained" color="primary" onClick={() => handleClickEditorOpen(id)}>
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
        <>
        <div className='min-h-screen'>        
            <Header
                navigationElements={[]}
                userState={null}
            />
            <HeaderAdmin title="Wydarzenia" />

            <Dialog open={editorOpen} onClose={handleClose}>
                <DialogTitle>Dane</DialogTitle>
                {editFormError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {editFormError}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleEdit}>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                        label="Nazwa wydarzenia"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        required
                        />
                        <TextField
                        label="Początek wydarzenia"
                        name="startDate"
                        type="date"
                        value={editFormData.startDate}
                        onChange={handleEditChange}
                        required
                        />
                        <TextField
                        label="Koniec wydarzenia"
                        name="endDate"
                        type="date"
                        value={editFormData.endDate}
                        onChange={handleEditChange}
                        required
                        />
                        <Select
                            label="Lokalizacja"
                            name="venues"
                            value={editFormData.venues} 
                            onChange={handleEditChange}
                            required
                            multiple 
                            renderValue={(selected) => selected.map(loc => loc.name).join(', ')}
                            >
                            {venues.map(venue => (
                                <MenuItem key={venue.id} value={venue}>
                                {venue.name} - {venue.location}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                        label="Opis"
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditChange}
                        multiline
                        rows={4}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Anuluj</Button>
                        <Button type="submit" variant="contained">Zapisz</Button>
                    </DialogActions>
                </Box>
            </Dialog>

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
                    {formError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {formError}
                        </Alert>
                    )}
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
                        <Select
                            label="Lokalizacja"
                            name="venues"
                            value={formData.venues} 
                            onChange={handleChange}
                            required
                            multiple 
                            renderValue={(selected) => selected.map(loc => loc.name).join(', ')}
                            >
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
        <CopyrightFooter />
        </>
    );
};

export default AddEventForm;