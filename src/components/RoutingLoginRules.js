import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoutingLoginRules = ({ children }) => {
 
    const { userId, role } = useAuth();
    console.log(userId)

    if (userId) {
        console.log(role)

        if (role == "player") {
            return <Navigate to="/user" replace/>
        }
        else if (role == "referee") {
            return <Navigate to="/referee" replace/>
        }
        else if (role == "admin") {
            return <Navigate to="/admin" replace/>
        }
    }

    return children;
}

export default RoutingLoginRules;