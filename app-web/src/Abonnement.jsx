import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// Import des icons
import { HiCheckBadge } from "react-icons/hi2";

function Abonnement() {

    const navigate = useNavigate()
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAbonnements = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/abonnements');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des abonnements');
                }
                const data = await response.json();
                // On adapte les champs venant de l'API à ceux utilisés dans le composant
                const mapped = data.map((abo) => ({
                    id: abo.id,
                    title: abo.nom,
                    price: `${abo.prix}€`,
                    period: abo.periode,
                    // Pour l'instant, on utilise la description ou un tableau vide pour features
                    features: abo.description
                        ? abo.description.split('\n')
                        : ["Accès aux terrains", "Support standard"],
                }));
                setCards(mapped);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAbonnements();
    }, []);

    async function onClick(card) {
        console.log(`Abonnement choisi : ${card.title}`);

        // Ici on suppose que l'id de l'utilisateur connecté est stocké dans le localStorage.
        // Adapte cette partie selon la façon dont tu gères l'authentification.
        const id_adherent = localStorage.getItem('userId');

        if (!id_adherent) {
            alert("Utilisateur non connecté : impossible d'acheter un abonnement.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/abonnements/acheter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_adherent: Number(id_adherent),
                    id_abonnement: card.id,
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                console.error("Erreur lors de l'achat :", errData);
                alert("Erreur lors de l'achat de l'abonnement.");
                return;
            }

            alert("Abonnement acheté avec succès !");
            // Redirection vers le Dashboard lors du clic sur "Acheter"
            navigate('/Dashboard');
        } catch (err) {
            console.error(err);
            alert("Erreur réseau lors de l'achat.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-5 bg-[#5E856B] px-4">
            {/* Titre principal */}
            <div className="text-center flex flex-col gap-5 mb-10">
                <h1 className="text-white text-7xl md:text-5xl max-md:text-3xl font-bold">
                    Formule d'abonnement
                </h1>
                <h2 className="text-white text-xl md:text-lg max-md:text-sm">
                    Choisissez la formule qui vous convient
                </h2>
            </div>

            {/* État de chargement / erreur */}
            {loading && <p className="text-white">Chargement des abonnements...</p>}
            {error && !loading && <p className="text-red-200">{error}</p>}

            {/* Conteneur des cartes */}
            <div className="flex flex-wrap gap-8 justify-center items-stretch w-full max-w-[1200px]">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="relative w-full sm:w-72 md:w-80 h-[500px] rounded-3xl cursor-pointer bg-[#52B788] overflow-hidden group"
                    >
                        {/* Cercle arrière-plan animé */}
                        <div className="absolute -top-32 -left-16 w-32 h-44 rounded-full bg-[#95D5B2] transition-all duration-500 group-hover:-top-20 group-hover:-left-16 group-hover:w-[140%] group-hover:h-[140%]"></div>

                        {/* Contenu au hover */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-[#95D5B2] opacity-0 transition-all duration-500 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto p-5">
                            <ul className="text-[#2D6A4F] font-semibold space-y-2">
                                {card.features.map((feature, i) => (
                                    <li key={i}>
                                        <HiCheckBadge className="inline text-green-400 mr-1" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => onClick(card)}
                                className="w-[65%] sm:w-[60%] md:w-[65%] px-4 py-3 mt-5 bg-[#52B788] rounded-md text-white font-bold hover:bg-[#52B788] transition-all"
                            >
                                Acheter
                            </button>
                        </div>

                        {/* Contenu visible par défaut */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 p-5 transition-opacity duration-500 group-hover:opacity-0 pointer-events-auto group-hover:pointer-events-none">
                            <h1 className="text-white text-2xl font-bold mb-2">{card.title}</h1>
                            <p className="text-gray-300 text-lg font-bold mb-5">
                                <span className="text-white text-4xl md:text-3xl max-lg:text-2xl">{card.price}</span>/{card.period}
                            </p>
                            <button
                            onClick={() => onClick(card)}
                                className="w-[65%] sm:w-[60%] md:w-[65%] px-4 py-3 bg-[#95D5B2] rounded-md text-white font-bold hover:bg-[#3A9F7F] transition-all"
                            >
                                Acheter
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Abonnement;
