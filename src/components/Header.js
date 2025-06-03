const Header = ({ navigationElements, userState }) => {
    return (
        <header className="bg-blue-900 border-b border-blue-800 px-6 py-4 sticky top-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <h1 className="text-xl font-semibold text-white">BallerIO</h1>
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
                    {userState ? <button className="text-blue-200 hover:text-white">Wyloguj</button> 
                    : <button className="text-blue-200 hover:text-white">Zaloguj się</button>}
                    
                </div>
            </div>
        </header>
    )    
}

export default Header;