import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = ({ navigationElements, userState }) => {


    const { userId, logout } = useAuth();
    const navigate = useNavigate();

    const handleClickButton = (path) => {
        navigate(path);
    }

    return (
        <header className="bg-blue-900 border-b border-blue-800 px-6 py-4 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <h1 onClick={() => handleClickButton("/")} className="cursor-pointer display-block text-xl font-semibold text-white">BallerIO</h1>
                    <nav className="flex space-x-6">
                        {navigationElements.map((element, index) => {
                            return <span key={index} className="text-blue-200">{element}</span>
                        })}
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    {/* TRZA DODAĆ IFA Z WYLOGUJ LUB ZALOGUJ */}
                    {/* <button className="p-2 text-blue-300 hover:text-white">CO
                    </button> */}
                    {userId ? <button className="text-blue-200 hover:text-white" onClick={() => {
                        navigate("/login");
                        logout();
                    }}>Wyloguj</button> 
                    : <button className="text-blue-200 hover:text-white" onClick={() => {navigate("/login");}}>Zaloguj się</button>}
                    
                </div>
            </div>
        </header>
    )    
}

export default Header;