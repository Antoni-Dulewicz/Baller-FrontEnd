import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoutingPersonalRules = ({ children, allowedRoles }) => {
 
    const { user } = useAuth();

    console.log(user)

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace/>;
    }

    return children;
}

export default RoutingPersonalRules;