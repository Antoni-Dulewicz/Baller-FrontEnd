import Footer from "../components/Footer";
import Header from "../components/Header";
import "../Animations.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigationElements = [

    ]

    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-blue-50">
            <Header
                navigationElements={navigationElements}
                userState={null}
            />
            <div className="relative h-screen bg-fixed bg-center bg-cover z-10 flex justify-center items-center" style={{ backgroundImage: 'url("/home.jpg")' }}>
                <div className="h-1/2 flex flex-col justify-evenly text-blue-50 font-bold drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
                    <h1 className="text-7xl">Wejdź do gry już teraz!</h1>
                    <h2 className="text-3xl">trenuj, ćwicz, wygrywaj</h2>
                </div>
            </div>
            <div className="animated-appearance">
                <div className="py-40 w-2/3 m-auto text-center">
                    
                    <h2 className="font-bold text-4xl mb-20 text-blue-600">
                        Przeżyj sportowe emocje na najwyższym poziomie!
                    </h2>
                    <div className="w-3/5 m-auto [&>p]:text-lg [&>p]:mb-4">
                        <p>
                            W [Nazwa Firmy] specjalizujemy się w organizacji profesjonalnych wydarzeń ping pongowych i tenisowych, które łączą pasję, rywalizację i świetną atmosferę. Dbamy o każdy detal, aby każdy mecz był wyjątkowym doświadczeniem dla zawodników i kibiców.
                        </p>
                        <p>
                            Choć na razie skupiamy się na tenisie stołowym i tenisie ziemnym, nieustannie rozwijamy się i jesteśmy gotowi na nowe wyzwania – wkrótce w naszej ofercie pojawią się kolejne dyscypliny sportowe.
                        </p>
                        <p>
                            Dołącz do nas i poczuj, jak sport może inspirować, integrować i motywować do działania!
                        </p>
                        <p>
                            Z nami każda gra to początek czegoś wielkiego!
                        </p>
                        <button 
                            className="mt-10 text-2xl p-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                            onClick={() => handleButtonClick("/login")}
                        >
                            Dołącz do gry!
                        </button>
                    </div>
                </div>
            </div>
            <Footer>

            </Footer>
        </div>
    )
}

export default HomePage;