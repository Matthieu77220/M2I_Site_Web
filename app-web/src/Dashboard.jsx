import { useState } from "react";
import NavBar from "./components/navBar";

function Dashboard() {
    const [open, setOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("licence");

    return (
        <>
            {/* --- Navbar --- */}
            <div className="flex">
                <NavBar open={open} setOpen={setOpen} />
            </div>

            {/* --- Contenu principal --- */}
            <div className={`transition-all duration-300 ${open ? "ml-64" : "ml-20"} min-h-screen py-10`}>

                <h1 className="text-center text-4xl font-bold text-[#7bd0a0] underline mb-14">
                </h1>

                <section className="flex flex-col items-center justify-center space-y-10 px-4 pb-10">

                    {/* --- Ligne du haut : Licence & Abonnement --- */}
                    <section className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 w-full max-w-5xl">

                        <button
                            onClick={() => setActiveTab("licence")}
                            className={`border-2 border-gray-300 w-full md:w-80 lg:w-96 
                                h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg
                                transition-all duration-300 hover:scale-105 hover:-translate-y-2
                                active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center
                                ${activeTab === "licence" ? "bg-[#7bd0a0] text-white" : "bg-white"}`}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold">Licence</h2>
                        </button>

                        <button
                            onClick={() => setActiveTab("abonnement")}
                            className={`border-2 border-gray-300 w-full md:w-80 lg:w-96 
                                h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg
                                transition-all duration-300 hover:scale-105 hover:-translate-y-2
                                active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center
                                ${activeTab === "abonnement" ? "bg-[#7bd0a0] text-white" : "bg-white"}`}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold">Abonnement</h2>
                        </button>

                    </section>

                    {/* --- Ligne du bas : Statistique --- */}
                    <section className="flex justify-center items-center w-full max-w-5xl">

                        <button
                            onClick={() => setActiveTab("statistique")}
                            className={`border-2 border-gray-300 w-full md:w-80 lg:w-96 
                                h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg
                                transition-all duration-300 hover:scale-105 hover:-translate-y-2
                                active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center
                                ${activeTab === "statistique" ? "bg-[#7bd0a0] text-white" : "bg-white"}`}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold">Statistique</h2>
                        </button>

                    </section>

                </section>
            </div>
        </>
    );
}

export default Dashboard;
