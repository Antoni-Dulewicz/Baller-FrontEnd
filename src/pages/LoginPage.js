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

    const handleSubmit = () => {

    }
    
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
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                />

                <FormControl variant="outlined">
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
                </FormControl>
                
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Powtórz hasło</InputLabel>
                    <OutlinedInput
                        name="repeatPassword"
                        value={formData.repeatedPassword}
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