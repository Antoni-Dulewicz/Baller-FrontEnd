import Header from '../components/headers/AdminHeader';
import HeaderAdmin from '../components/headers/HeaderAdmin';
import React, { useEffect, useState } from 'react';
import { 
    Box, Button, TextField, Typography, Paper, Select,
    MenuItem, Grid, Card, CardContent, formError, Alert, 
    Collapse } from '@mui/material';
import { createVenue, getVenues } from '../services/eventService';
import CardMedia from '@mui/material/CardMedia';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const VenuesPage = () => {

    const defaultFormData = {
        name: '',
        location: '',
        description: '',
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (formError) setFormError(null);
    };

    useEffect(() => {
        fetchVenues();
    },[])

    const fetchVenues = async () => {
        try {
            setError(null);
            const venuesData = await getVenues();
            setVenues(venuesData);
        } catch (error) {
            console.error('Błąd podczas pobierania obiektów:', error);
            setError('Nie udało się pobrać istniejących obiektów. Spróbuj ponownie później.');
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setFormError(null);

        console.log('Dodano obiekt:', formData);

        try {
            await createVenue(formData);
            setFormData(defaultFormData);
            // Refresh venues list after adding a new one
            fetchVenues();
            setIsFormOpen(false);
        } catch (error) {
            setFormError(error.message);
        }
    };

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <div>
            <HeaderAdmin title="Obiekty" />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={toggleForm}
                >
                    {isFormOpen ? 'Anuluj dodawanie' : 'Dodaj nowy obiekt'}
                </Button>
            </Box>

            <Collapse in={isFormOpen}>
                <Paper sx={{ maxWidth: 500, margin: '2rem auto', padding: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Dodaj nowy obiekt
                    </Typography>
                    
                    {formError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {formError}
                        </Alert>
                    )}
                    
                    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                        <TextField label="Nazwa obiektu" name="name" value={formData.name} onChange={handleChange} required />
                        <Select label="Lokalizacja" name="location" value={formData.location} onChange={handleChange} required>
                            <MenuItem key="krakow" value="Krakow">
                                Krakow
                            </MenuItem>
                        </Select>
                        <TextField label="Opis" name="description" value={formData.description} onChange={handleChange} multiline rows={4} />
                        <Button type="submit" variant="contained" color="primary">
                            Dodaj obiekt
                        </Button>
                    </Box>
                </Paper>
            </Collapse>

            {/* <Paper sx={{ maxWidth: 800, margin: '2rem auto', padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Istniejące obiekty
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
            
                <Grid container spacing={2}>
                    {venues.map((venue) => (
                        <Grid item xs={12} sm={6} key={venue.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {venue.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lokalizacja: {venue.location}
                                    </Typography>
                                    {venue.description && (
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {venue.description}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper> */}


            <Paper sx={{ maxWidth: 900, margin: '2rem auto', padding: 3, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                    Istniejące obiekty
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                    </Alert>
                )}

                <Grid container spacing={4}>
                    {venues.map((venue) => (
                    <Grid item xs={12} sm={6} md={4} key={venue.id}>
                        <Card 
                        variant="outlined" 
                        sx={{
                            transition: 'box-shadow 0.3s',
                            '&:hover': { boxShadow: 6 },
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        >
                        <CardMedia
                            component="img"
                            height="140"
                            image = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Stadion_Miejski_Krak%C3%B3w_2023.jpg/1200px-Stadion_Miejski_Krak%C3%B3w_2023.jpg"
                            alt={venue.name}
                        />
                        
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {venue.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOnIcon sx={{ fontSize: 20, mr: 0.5 }} />
                            {venue.location}
                            </Typography>
                            {venue.description && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {venue.description}
                            </Typography>
                            )}
                        </CardContent>

                        {/* Optional actions like edit/delete */}
                        {/* <CardActions>
                            <Button size="small" color="primary">Edit</Button>
                            <Button size="small" color="secondary">Delete</Button>
                        </CardActions> */}

                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Paper>
        </div>
    );

};

export default VenuesPage;
