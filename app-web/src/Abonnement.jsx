import { HiCheckBadge } from "react-icons/hi2";

function Abonnement() {
    const cards = [
        {
            title: "Mensuel",
            price: "19€",
            period: "mois",
            features: [
                "Accès complet aux fonctionnalités de base",
                "10 matchs par mois incluses",
                "Support client standard",
                "Accès aux mises à jour mensuelles",
            ],
        },
        {
            title: "Annuelle",
            price: "100€",
            period: "an",
            features: [
                "Accès complet à toutes les fonctionnalités",
                "120 matchs par an incluses",
                "Support client prioritaire 24/7",
                "Accès anticipé aux nouvelles fonctionnalités",
            ],
        },
        {
            title: "À l’unité",
            price: "5€",
            period: "unité",
            features: [
                "Accès limité pour un match",
                "Pas de support client inclus",
                "Pas de contenu premium",
                "Idéal pour tester le service avant abonnement",
            ],
        },
    ];

    // Fonction pour gérer le clic sur un abonnement
    function onClick(title) {
        console.log(`Abonnement choisi : ${title}`);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-5 bg-[#5E856B]">
            {/* Titre principal */}
            <div className="text-center flex flex-col gap-5 mb-10">
                <h1 className="text-white text-7xl max-md:text-2xl font-bold">
                    Formule d'abonnement
                </h1>
                <h2 className="text-white text-xl max-md:text-sm">
                    Choisissez la formule qui vous convient
                </h2>
            </div>

            {/* Conteneur des cartes */}
            <div className="flex max-lg:flex-col gap-11 justify-around items-stretch w-[70%]">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="relative w-80 h-[500px] rounded-3xl cursor-pointer bg-[#52B788] overflow-hidden group"
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
                                onClick={() => onClick(card.title)}
                                className="w-[65%] px-4 py-3 mt-5 bg-[#52B788] rounded-md text-white font-bold hover:bg-[#52B788] transition-all"
                            >
                                Acheter
                            </button>
                        </div>

                        {/* Contenu visible par défaut */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 p-5 transition-opacity duration-500 group-hover:opacity-0 pointer-events-auto group-hover:pointer-events-none">
                            <h1 className="text-white text-2xl font-bold mb-2">{card.title}</h1>
                            <p className="text-gray-300 text-lg font-bold mb-5">
                                <span className="text-white text-4xl max-lg:text-3xl">{card.price}</span>/{card.period}
                            </p>
                            <button
                                onClick={() => onClick(card.title)}
                                className="w-[65%] px-4 py-3 bg-[#95D5B2] rounded-md text-white font-bold hover:bg-[#3A9F7F] transition-all"
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
