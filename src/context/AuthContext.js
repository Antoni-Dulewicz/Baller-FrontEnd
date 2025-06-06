import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState({name: "Marcin", role: "referee"});
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("role")
        const storedId = localStorage.getItem("userId");
        
        if (storedRole && storedId) {
            setRole(storedRole);
            setUserId(storedId);
        }

    }, []);

    const login = (id, role) => {
        setUserId(id);
        setRole(role);
        localStorage.setItem("userId", id);
        localStorage.setItem("role", role);
    }

    const logout = () => {
        setUserId(null);
        setRole(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
    }

    return (
        <AuthContext.Provider value={{ userId, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}