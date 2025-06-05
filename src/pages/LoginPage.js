import ChooseUserType from '../components/ChooseUserType';
import { 
    Box, Button, TextField, Typography, Paper, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {users as mockUsers} from "./../mocks/mockUsers.js"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const LoginPage = () => {


    const { login, user } = useAuth();
    console.log(user)


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const types = ["Gracz", "Sędzia", "Administrator"]
    const [selectedType, setSelectedType] = useState("Gracz"); 

    const [formData, setFormData] = useState({email: "", password: ""})
    const handleFormChange = (event) => {
        const {name, value} = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const [formErrors, setFormErrors] = useState({})

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        
        const foundUser = mockUsers.find(
            u => 
                u.email === formData.email &&
                u.password === formData.password &&
                u.role === selectedType 
        )

        if (foundUser) {
            if (foundUser.role === "Gracz") {
                login({name: "Marcin", role: "player"})
                navigate("/user")
            }
            else if (foundUser.role === "Sędzia") {
                login({name: "Marcin", role: "referee"})
                navigate("/referee")
            }
            else if (foundUser.role === "Administrator") {
                login({name: "Marcin", role: "admin"})
                navigate("/admin")
            }
        } 
        else {
            setFormErrors({ email: "Nieprawidłowe dane logowania", password: "" });
        }
    }
    
    return (
        <Paper sx={{ maxWidth: 600, margin: '1rem auto'}}>
            
            <Typography mb={0} variant="h4" align="center" backgroundColor={"#2074d4"} color={"white"} gutterBottom sx={{ fontWeight: 900, padding: 3, borderTopLeftRadius: 3, borderTopRightRadius: 3}}>
                Logowanie
            </Typography>

            <ChooseUserType
                types={types}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} marginTop={2} padding={3}>

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
                
                <Box display="flex" justifyContent="center" marginTop={3}>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} sx={{ width: 200,fontSize: 16, fontWeight: 600}}>
                        Zaloguj
                    </Button>
                </Box>
            </Box>

            <Typography align="center" color={"#2074d4"} p={3} fontSize={14} gutterBottom >
                <a href="/register">
                    Nie masz konta? Zarejestruj się
                </a>
            </Typography>
        </Paper>
    );
}

export default LoginPage;