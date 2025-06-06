import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoutingPersonalRules = ({ children, allowedRoles }) => {
 
    const { userId, role } = useAuth();

    console.log(userId, role)

    console.log(allowedRoles)
    if (!userId || !allowedRoles.includes(role)) {
        console.log(!userId, !allowedRoles.includes(role))
        return <Navigate to="/login" replace/>;
    }

    return children;
}

export default RoutingPersonalRules;