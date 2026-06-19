import { useState } from "react";
import { useNavigate } from 'react-router';
import axios from "axios";

function ModifierMotDePasse() {

    const navigate = useNavigate()

    // ---------------------------- Enregistrement Input dans le formData ----------------------------//

    // Création des Regex pour chaque Input
    const regexEmail = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
    const regexMotDePasse = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[é'(-è^_ç#./+=?!@$%^&*-]).{12,}$")
    
    // Attribut les valeur des input selon leurs clés
    const [formData, setFormData] = useState({
        email: "",
        oldMotDePasse : "",
        newConfirmMotDePasse : ""
    })
    
    // Indique ou non si les inputs respectent les Regex
    const [isInputValid, setIsInputValid] = useState(true)

    
    
    // ---------------------------- Enregistrement de formData dans le formFinal => envoie vers l'api ----------------------------//

    const { formFinal, setFormFinal } = useState()

    // Vérifie si les inputs sont conforment aux Regex ainsi que les MDP
    async function checkValidInput(event) {
        event.preventDefault()

        if (regexEmail.test(formData.email) && regexMotDePasse.test(formData.oldMotDePasse) && regexMotDePasse.test(formData.newConfirmMotDePasse)) {
            setIsInputValid(true) // Attribut True si le résultat lors de la 1er condition etait dans le else
            const formFinal = {
                email: formData.email,
                oldMotDePasse: formData.oldMotDePasse,
                newConfirmMotDePasse: formData.newConfirmMotDePasse
            }

            try {
                await axios.put("/api/auth/modifierMotDePasse", formFinal, {withCredentials : true})
                navigate("../profile");
            } catch (err) {
                console.log(err);
                // Ajouter des useState pour afficher au front les erreurs
            }

        }else{
            setIsInputValid(false)
            event.preventDefault() // empêche la réinitilisation du form si input n'est pas conforme avec les Regex
        }
    }

     return (
         <div className='flex flex-col justify-center h-screen bg-[#5E856B]'>
            <div className="flex justify-center items-center bg-[#5E856B] w-auto">
                <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full">
                        <h1 className="text-center text-xl md:text-4xl font-bold m-5 text-white">Mot de passe oublié</h1>
                        <h2 className="text-center text-sm md:text-xl mt-3 font-bold text-white">Un problème ? <a href="/Contact" className="text-[#7CA982] underline contrast-200">Contacter l'administrateur</a></h2>
        
                        <div className="mt-5 mx-auto w-full max-w-lg">
                        <form onSubmit={checkValidInput} className="space-y-8">
        
                            {!isInputValid && <p className="ml-5 md:ml-0 text-center md:text-lg text-base text-red-800 font-semibold">Caractère invalide</p>}
        
                            {/* ---- email ---- */}
                            <div className="mt-2">
        
                                {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-800 font-semibold" htmlFor="confirmePassword">Minuscules, ".", "@"</label>}
                                <input
                                    type="email"
                                    required
                                    placeholder="Email"
                                    className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                                    onChange={(e) => setFormData({ ... formData, email : e.target.value })}
                                />
                            </div>
        
                                {/* ---- Ancien Mot de passe ---- */}
        
                                <div className="mt-2">
                                    {!isInputValid && <label className=" ml-5 md:ml-0 text-base text-red-800 font-semibold" htmlFor="confirmePassword">12 caractères: [Majuscules, Minuscules, Caractères spéciaux, Chiffre]</label>}
        
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Ancien Mot de passe"
                                    className={'flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none'}
                                    onChange={(e) => setFormData({ ... formData, oldMotDePasse : e.target.value })}
                                    />
                                </div>
                                    
                                {/* ---- Nouveau Mot de passe ---- */}
                                    
                                <div className="mt-2">
                                    {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-800 font-semibold" htmlFor="confirmePassword">12 caractères: [Majuscules, Minuscules, Caractères spéciaux, Chiffre]</label>}
                                    
                                    <input
                                    id="confirmePassword"
                                    name="confirmePassword"
                                    type="password"
                                    required
                                    placeholder="Nouveau mot de passe"
                                    className={'flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none'}
                                    onChange={(e) => setFormData({ ... formData, newConfirmMotDePasse : e.target.value })}
                                    />
                                </div>
                                    
                            {/* Bouton de sauvegarder */}
                            <button type="submit" className="flex m-auto w-[90%] md:w-full justify-center rounded-md shadow-xs bg-[#8BB78F] px-4 py-2.5 pb-5 text-sm/6 font-semibold text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">Sauvegarder</button>
                                    
                        </form>
                        </div>
                </div>
            </div>
        </div>
     );
}

export default ModifierMotDePasse;