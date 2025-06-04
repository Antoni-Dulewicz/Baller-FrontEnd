import Footer from "../components/Footer";
import Header from "../components/Header";


const HomePage = () => {
    const navigationElements = [

    ]

    return (
        <div className="min-h-screen bg-blue-50">
            <Header
                navigationElements={navigationElements}
                userState={null}
            />
            <div className="relative h-screen bg-fixed bg-center bg-cover z-10 flex justify-center items-center" style={{ backgroundImage: "url('home.jpg')" }}>
                <div className="h-1/2 flex flex-col justify-evenly text-blue-50 font-bold drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
                    <h1 className="text-7xl">Wejdź do gry już teraz!</h1>
                    <h2 className="text-3xl">trenuj, ćwicz, wygrywaj</h2>
                </div>
            </div>
            <div className="min-h-screen w-5xl">
                
                Wejdź do gry już teraz i przeżyj sportowe emocje na najwyższym poziomie!

                W [Nazwa Firmy] specjalizujemy się w organizacji profesjonalnych wydarzeń ping pongowych i tenisowych, które łączą pasję, rywalizację i świetną atmosferę. Dbamy o każdy detal, aby każdy mecz był wyjątkowym doświadczeniem dla zawodników i kibiców.

                Choć na razie skupiamy się na tenisie stołowym i tenisie ziemnym, nieustannie rozwijamy się i jesteśmy gotowi na nowe wyzwania – wkrótce w naszej ofercie pojawią się kolejne dyscypliny sportowe.

                Dołącz do nas i poczuj, jak sport może inspirować, integrować i motywować do działania!

                Z nami każda gra to początek czegoś wielkiego!

                <button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    onClick={() => console.log()}
                >
                    Dołącz do gry!
                </button>
            </div>
            <Footer>

            </Footer>
        </div>
    )
}

export default HomePage;