import { User, Menu, X } from 'lucide-react';

const TopHeader = ({ title, isMenuOpen, setIsMenuOpen}) => {
    return (
    <>
        {/* Top bar with title, menu toggle and user icon */}
        <div className="w-full flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
            
            <div className="flex items-center gap-2">          
            {/* Mobile menu toggle */}
            <button 
                className="p-2 rounded-full hover:bg-gray-100 lg:hidden" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* User icon - always visible */}
            <button className="p-2 rounded-full hover:bg-gray-100">
                <User size={24} />
            </button>
            </div>
        </div>
    </>
    )
}

export default TopHeader;