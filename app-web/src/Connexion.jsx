import React, { useState } from "react";
import { useNavigate } from 'react-router';

function Connexion() {

    const navigate = useNavigate()

    // Création des Regex pour chaque Input
    const regexEmail = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
    const regexMotDePasse = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[é'(-è^_ç#./+=?!@$%^&*-]).{8,}$")

    // Attribut les valeur des input selon leurs clés
    const [formData, setFormData] = useState({
        email: "",
        motDePasse : ""
    })

    // Indique ou non si les inputs respectent les Regex
    const [isInputValid, setIsInputValid] = useState(true)

    // Vérifie si les inputs sont conforment aux Regex ainsi que les MDP
    function checkValidInput(event) {
          if (regexEmail.test(formData.email) && regexMotDePasse.test(formData.motDePasse)){
            // rajouter plus tard le useEffect pour faire appel API
          } else {
              setIsInputValid(false)
              event.preventDefault() // empêche la réinitilisation du form si MDP != confirme MDP
          }     
      
    }

return (
<div className="h-screen flex justify-center items-center py-7 bg-[#5E856B] w-auto">
    <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full">
    <h1 className="text-center text-xl md:text-4xl font-bold m-5 text-white">Connexion</h1>
    
    <div className="mt-5 mx-auto w-full max-w-lg">
        <form onSubmit={checkValidInput} className="space-y-8">

        {!isInputValid && <p className="ml-5 md:ml-0 text-center md:text-lg text-base text-red-600 font-semibold">Caractère invalide</p>}
        
        {/* ---- email ---- */}
        {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">Minuscules, ".", "@"</label>}

        <div className="mt-2">
            <input
            type="email"
            placeholder="Adresse email"
            onChange={(e) => setFormData({... formData , email : e.target.value})}
            required
            className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
            />
        </div>

        {/* ---- motDePasse ---- */}
        {!isInputValid && <label className=" ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">8 caractères: [Majuscules, Minuscules, Caractères spéciaux, Chiffre]</label>}

        <div className="mt-2">
            <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setFormData({... formData, motDePasse : e.target.value})}
            required
            className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
            />
        </div>

        <h2 className="text-center text-sm md:text-xl mt-3 font-bold text-white">Pas encore de compte ?{" "}
        <a onClick={() => navigate('/FormulaireInscription')} className="text-[#7CA982] underline contrast-200 cursor-pointer">Créez-en un</a>
        </h2>


        <div className="flex justify-center">
            <button
            type="submit"
            className="w-[90%] md:w-full bg-[#7CA982] hover:bg-[#6b9576] text-white font-semibold py-3 rounded-md shadow-md transition duration-300">Se connecter
            </button>
        </div>
        </form>
    </div>
    </div>
</div>
);
}
export default Connexion;
