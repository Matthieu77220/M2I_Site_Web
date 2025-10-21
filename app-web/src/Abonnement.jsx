import { HiCheckBadge } from "react-icons/hi2";

function Abonnement() {
    return ( 
        <>
            <div className="min-h-screen xl:h-screen flex flex-col justify-center items-center gap-5 bg-[#5E856B]">
                <div className="text-center flex justify-around flex-col gap-5 h-1/6">
                    <h1 className="text-white text-7xl max-md:text-2xl font-bold">Formule d'abonnement</h1>
                    <h2 className="text-white text-xl max-md:text-sm m-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae alias</h2>
                </div>
                <div className="flex max-lg:flex-col gap-11 justify-around items-center w-[70%] h-[65%]">
                    <div className="h-[80%] max-xl:w-auto w-1/3 bg-[#5E856B] border border-white rounded-2xl p-5 space-y-7">
                        <h1 className="text-white text-2xl font-bold">Mensuel</h1>
                        <p className="text-gray-300 text-xl font-bold"><span className="text-white text-6xl max-lg:text-4xl">19€ </span>/mois</p>
                        <button type="button" className="w-[65%] justify-center text-xl max-lg:text-sm mt-5 mb-5 font-bold rounded-md shadow-xs bg-[#8BB78F] px-4 py-3 text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">Acheter</button>
                        <p className="text-white text-xl max-lg:text-lg font-semibold">Lorem ipsum dolor sit amet.</p>
                        <ul className="text-gray-100 text-xl max-lg:text-sm font-semibold space-y-3">
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem ipsum dolor sit</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem, ipsum dolor sit ammat deus.</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem ipsum dolor sit.</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem, ipsum dolor.</li>
                        </ul>
                    </div>

                    <div className="h-[90%] max-xl:w-auto w-1/3 bg-[#5E856B] border-2 border-white rounded-2xl p-5 space-y-7">
                        <h1 className="text-white text-2xl font-bold">Annuelle</h1>
                        <p className="text-gray-300 text-xl font-bold"><span className="text-white text-6xl max-lg:text-4xl">100€ </span>/an</p>
                        <button type="button" className="w-[65%] justify-center text-xl max-lg:text-sm mt-5 mb-5 font-bold rounded-md shadow-xs bg-[#8BB78F] px-4 py-3 text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">Acheter</button>
                        <p className="text-white text-xl max-lg:text-lg font-semibold">Lorem ipsum dolor sit amet.</p>
                        <ul className="text-gray-100 text-xl max-lg:text-sm font-semibold space-y-3">
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem ipsum dolor sit.</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem ipsum dolor sit amet consectetur elit. Hic.</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem ipsum dolor sit..</li>
                        </ul>
                    </div>

                    <div className="h-[80%] max-xl:w-auto w-1/3 bg-[#5E856B] border border-white rounded-2xl p-5 space-y-7">
                        <h1 className="text-white text-2xl font-bold">À l’unité</h1>
                        <p className="text-gray-300 text-xl max-lg:text-lg font-bold"><span className="text-white text-6xl">5€ </span>/unité</p>
                        <button type="button" className="w-[65%] justify-center text-xl max-lg:text-sm mt-5 mb-5 font-bold rounded-md shadow-xs bg-[#8BB78F] px-4 py-3 text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">Acheter</button>
                        <p className="text-white text-xl font-semibold">Lorem ipsum dolor sit amet.</p>
                        <ul className="text-gray-100 text-xl max-lg:text-sm font-semibold space-y-3">
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem ipsum dolor sit</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem, ipsum dolor sit ammat deus.</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem ipsum dolor sit.</li>
                            <li><HiCheckBadge className="inline text-green-400"/> Lorem, ipsum dolor.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Abonnement;