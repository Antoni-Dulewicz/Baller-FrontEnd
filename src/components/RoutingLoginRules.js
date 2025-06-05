import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoutingLoginRules = ({ children }) => {
 
    const { user } = useAuth();

    if (user) {
        if (user.role == "player") {
            return <Navigate to="/user" replace/>
        }
        else if (user.role == "referee") {
            return <Navigate to="/referee" replace/>
        }
        else if (user.role == "admin") {
            return <Navigate to="/admin" replace/>
        }
    }

    return children;
}

export default RoutingLoginRules;