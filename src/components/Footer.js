import CopyrightFooter from "./CopyrightFooter";

const Footer = () => {
    return (
        <footer>
            <div className="p-12 min-h-72 bg-blue-100 flex justify-center gap-10">
                <div className="w-96 my-6 mx-6 p-4 border-r-2 border-blue-200">
                    <h1 className="text-blue-50 text-3xl font-bold drop-shadow-[0_0_2px_rgba(0,112,255,1)]">BallerIO</h1>
                    <p className="text-sm mt-6 mb-10">
                        Jesteśmy firmą, u której podstaw leżą rywalizacja, ambicja i sportowy duch! Działamy organizując wydarzenia sportowe już od 2020.
                        Zapraszamy na turnieje sportowe w najlepszej możliwej atmosferze i z nalepszymi ludźmi.
                    </p>
                    <p className="text-xl font-medium text-blue-50 drop-shadow-[0_0_2px_rgba(0,112,255,1)]">
                        Chciałbyś do nas dołączyć?
                    </p>
                    <p className="my-6 text-sm">
                        <a href="" className="underline text-blue-700">rekrutacja@ballerIO.pl</a>
                    </p>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="w-72 ">
                        <h3 className="ml-4 text-xl font-bold">                        
                            Kontakt
                        </h3>
                        <ul className="text-sm mt-10 p-0 [&>li]:m-0 [&>li]:p-1">
                            <li>Maciej Malawski</li>
                            <li>tel. +48 503 733 420</li>
                            <li>
                                <a href="" className="underline text-blue-700">
                                    malaw@balerio.pl
                                </a>
                            </li>
                        </ul>

                        <ul className="text-sm mt-10 p-0 [&>li]:m-0 [&>li]:p-1">
                            <li>Jakub Malawski</li>
                            <li>tel. +48 503 733 420</li>
                            <li>
                                <a href="" className="underline text-blue-700">
                                kub@balerio.pl                        
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <CopyrightFooter />
        </footer>
    )
}

export default Footer;