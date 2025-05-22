import ChooseUserType from '../components/ChooseUserType';
import { 
    Box, Button, TextField, Typography, Paper, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const types = ["Gracz", "Sędzia", "Administrator"]
    const [userType, setUserType] = useState("Player"); 

    const [formData, setFormData] = useState({email: "", password: "", repeatPassword: ""})
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

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Wprowadź poprawny adres email';
        }

        if (!formData.password || formData.password.length < 6) {
            errors.password = 'Hasło musi mieć co najmniej 6 znaków';
        }

        if (formData.password !== formData.repeatPassword) {
            errors.repeatPassword = 'Hasła muszą być identyczne';
        }

        if (!userType) {
            errors.userType = 'Wybierz typ użytkownika';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        console.log('Dane poprawne:', { ...formData, userType });
        setFormErrors({});
    }
    
    return (
        <Paper sx={{ maxWidth: 600, margin: '2rem auto', padding: 3 }}>
            
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 900 }}>
                Rejestracja
            </Typography>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} marginTop={10}>
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

                <ChooseUserType
                    types={types}
                    setUserType={setUserType}
                />
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Zaloguj
                </Button>
            </Box>
        </Paper>
    );
}

export default LoginPage;