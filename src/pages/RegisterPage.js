import ChooseUserType from '../components/ChooseUserType';
import { 
    Box, Button, TextField, Typography, Paper, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const navigate = useNavigate()

    const navigationElements = []

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const types = ["Gracz", "Sędzia"]
    const [selectedType, setSelectedType] = useState("Gracz"); 

    const [formData, setFormData] = useState({firstname: "", surname: "", email: "", password: "", repeatPassword: ""})
    const handleFormChange = (event) => {
        const {name, value} = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const [formErrors, setFormErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        const errors = {};

        if (!formData.firstname) {
            errors.firstname = 'Wpisz swoje imię';
        }
        
        if (!formData.surname) {
            errors.surname = 'Wpisz swoje nazwisko';
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Niepoprawny adres email';
        }

        if (!formData.password || formData.password.length < 8) {
            errors.password = 'Hasło musi mieć co najmniej 8 znaków';
        }

        if (formData.password !== formData.repeatPassword) {
            errors.repeatPassword = 'Hasła muszą być identyczne';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        console.log('Dane poprawne:', { ...formData, selectedType });

        const roleMap = {
            "Gracz": "Player",
            "Sędzia": "Referee"
        };

        const payload = {
            email: formData.email,
            password: formData.password,
            first_name: formData.firstname,
            last_name: formData.surname,
            role: roleMap[selectedType]
        };

        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || "Błąd rejestracji");
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("Rejestracja udana:", data);
            navigate("/login")
        })
        .catch(error => {
            console.error("Błąd:", error.message);
            alert("Nie udało się zarejestrować: " + error.message);
        });

        setFormErrors({});
    }
    
    return (
        <div className="min-h-screen bg-blue-50">
            <Header 
                navigationElements={navigationElements}
            />
            <div className="relative h-screen bg-fixed bg-center bg-cover z-10 flex justify-center items-center" style={{ backgroundImage: 'url("/register.jpg")' }}>
                <div className='w-2/3'>
                    <Paper sx={{ maxWidth: 600, margin: '1rem auto'}}>
                        
                        <Typography mb={0} variant="h4" align="center" backgroundColor={"#1565c0"} color={"white"} gutterBottom sx={{ fontWeight: 900, padding: 3, borderTopLeftRadius: 3, borderTopRightRadius: 3}}>
                            Rejestracja
                        </Typography>

                        <ChooseUserType
                            types={types}
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                        />

                        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} marginTop={2} padding={3}>
                            <TextField
                                label="Imię"
                                name="firstname"
                                type="text"
                                value={formData.firstname}
                                onChange={handleFormChange}
                                error={!!formErrors.firstname}
                                helperText={formErrors.firstname}
                            />

                            <TextField
                                label="Nazwisko"
                                name="surname"
                                type="text"
                                value={formData.surname}
                                onChange={handleFormChange}
                                error={!!formErrors.surname}
                                helperText={formErrors.surname}
                            />

                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                error={!!formErrors.email}
                                helperText={formErrors.email}
                            />

                            <FormControl variant="outlined" error={!!formErrors.password}>
                                <InputLabel htmlFor="outlined-adornment-password">Hasło</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    value={formData.password}
                                    onChange={handleFormChange}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    required
                                />
                                {formErrors.password && (
                                    <Typography variant="caption" color="error">
                                    {formErrors.password}
                                    </Typography>
                                )}
                            </FormControl>
                            
                            <FormControl variant="outlined" error={!!formErrors.confirmPassword}>
                                <InputLabel htmlFor="outlined-adornment-confirm-password">Powtórz hasło</InputLabel>
                                <OutlinedInput
                                    name="repeatPassword"
                                    value={formData.repeatPassword}
                                    onChange={handleFormChange}
                                    id="outlined-adornment-confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    required
                                />
                                {formErrors.repeatPassword && (
                                    <Typography variant="caption" color="error">
                                    {formErrors.repeatPassword}
                                    </Typography>
                                )}
                            </FormControl>
                            <Box display="flex" justifyContent="center" marginTop={3} onSubmit={handleSubmit}>
                                <Button type="submit" variant="contained" color="primary" sx={{ width: 200,fontSize: 16, fontWeight: 600}}>
                                    Zarejestruj
                                </Button>
                            </Box>
                        </Box>

                        <Typography align="center" color={"#2074d4"} p={3} fontSize={14} gutterBottom >
                            <a href="/login">
                                Masz już konto? Zaloguj się
                            </a>
                        </Typography>
                    </Paper>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default RegisterPage;