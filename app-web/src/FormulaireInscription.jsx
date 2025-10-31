import { useState } from "react";
import { useNavigate } from 'react-router';

function FormulaireInscription() {

    const navigate = useNavigate()

    // Création des Regex pour chaque Input
    const regexPrenom = new RegExp("^[a-zA-Z]{3,15}$")
    const regexNom = new RegExp("^[a-zA-Z\- ]{3,15}$")
    const regexEmail = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
    const regexTel = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
    const regexMotDePasse = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[é'(-è^_ç#./+=?!@$%^&*-]).{8,}$")

    // Attribut les valeur des input selon leurs clés
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email : "",
        dateDeNaissance : "",
        telephone : "",
        motDePasse : "",
        confirmMotDePasse : ""
    })

    // Indique ou non si les mots de passe correspondent
    const [isPassWordMatch, setIsPassWordMatch] = useState(true)
    // Indique ou non si les inputs respectent les Regex
    const [isInputValid, setIsInputValid] = useState(true)

    // Vérifie si les inputs sont conforment aux Regex ainsi que les MDP
    function checkValidInput(event) {
        if (regexPrenom.test(formData.prenom) && regexNom.test(formData.nom) && regexEmail.test(formData.email) && regexTel.test(formData.telephone) && regexMotDePasse.test(formData.motDePasse) && regexMotDePasse.test(formData.confirmMotDePasse)) {
            setIsInputValid(true) // Attribut True si le résultat lors de la 1er condition etait dans le else
            if (formData.motDePasse == formData.confirmMotDePasse) {
                setIsPassWordMatch(true)
                
            }else {
                setIsPassWordMatch(false)
                event.preventDefault() // empêche la réinitilisation du form si MDP != confirme MDP
            }
        }else{
            setIsInputValid(false)
            event.preventDefault() // empêche la réinitilisation du form si input n'est pas conforme avec les Regex
        }
    }   

    return (       
        <div className='flex flex-col justify-center lg:h-screen bg-[#5E856B]'>
            <div className="flex justify-center items-center bg-[#5E856B] w-auto">
                <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full">
                    <h1 className="text-center text-xl md:text-4xl font-bold m-5 text-white">Créer un nouveau compte</h1>
                    <h2 className="text-center text-sm md:text-xl mt-3 font-bold text-white">Déja inscrit ? <span className="text-[#7CA982] underline contrast-200 cursor-pointer" onClick={() => navigate('/connexion')} >Connectez-vous</span></h2>

                    <div className="mt-5 mx-auto w-full max-w-lg">
                    <form action="#" className="space-y-8">

                        {!isInputValid && <p className="ml-5 md:ml-0 text-center md:text-lg text-base text-red-600 font-semibold">Caractère invalide</p>}

                        <div className="md:flex md:gap-7 md:w-full space-y-8 md:space-y-0">

                            {/* ---- prénom ---- */}

                            <div className="md:w-1/2 mt-2">
                            {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">Majuscules et Minuscules</label>}
                            <input
                                type="text"
                                required
                                placeholder="Prenom"
                                className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                                onChange={(e) => setFormData({ ... formData, prenom : e.target.value })}
                            />
                            </div>

                            {/* ---- nom ---- */}
                            <div className="md:w-1/2 mt-2">

                            {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">Majuscules, Minuscules, "-"," "</label>}
                                <input
                                    type="text"
                                    required
                                    placeholder="Nom"
                                    className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                                    onChange={(e) => setFormData({ ... formData, nom : e.target.value })}
                                />
                            </div>
                        </div>

                        {/* ---- email ---- */}
                        <div className="mt-2">

                            {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">Minuscules, ".", "@"</label>}
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                                onChange={(e) => setFormData({ ... formData, email : e.target.value })}
                            />
                        </div>

                        {/* ---- Date de naissance ---- */}
                        <div className="mt-2">

                            {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">Exemple: 12/03/1978</label>}

                            <input
                                name="email"
                                type="date"
                                required
                                placeholder="Date de naissance"
                                className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold text-[#aaa] font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                                onChange={(e) => setFormData({ ... formData, dateDeNaissance : e.target.value })}
                            />
                        </div>

                        {/* ---- Téléphone ---- */}

                        <div className="mt-2">

                            {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">Numéro et "+"</label>}

                            <input
                                name="telephone"
                                type="tel"
                                required
                                placeholder="Numéro de téléphone"
                                className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                                onChange={(e) => setFormData({ ... formData, telephone : e.target.value })}
                            />
                        </div>

                        <div className="md:flex md:gap-7 md:w-full space-y-8 md:space-y-0">
                            {/* ---- Mot de passe ---- */}

                            <div className="md:w-1/2 mt-2">

                                {!isPassWordMatch && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="password">Mot de passe différent</label>}
                                {!isInputValid && <label className=" ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">8 caractères: [Majuscules, Minuscules, Caractères spéciaux, Chiffre]</label>}

                                <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Mot de passe"
                                className={`flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:outline-none
                                    ${!isPassWordMatch ? "border-2 border-red-500 bg-red-50 placeholder:text-red-500" : "focus:border-gray-300"}`}
                                onChange={(e) => setFormData({ ... formData, motDePasse : e.target.value })}
                                />
                            </div>

                            {/* ---- Confirmer Mot de passe ---- */}

                            <div className="md:w-1/2 mt-2">
                            
                                {!isPassWordMatch && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">Mot de passe différent</label>}
                                {!isInputValid && <label className="ml-5 md:ml-0 text-base text-red-600 font-semibold" htmlFor="confirmePassword">8 caractères: [Majuscules, Minuscules, Caractères spéciaux, Chiffre]</label>}

                                <input
                                id="confirmePassword"
                                name="confirmePassword"
                                type="password"
                                required
                                placeholder="Confirmer mot de passe"
                                className={`flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:outline-none
                                    ${!isPassWordMatch ? "border-2 border-red-500 bg-red-50 placeholder:text-red-500" : "focus:border-gray-300"}`}
                                onChange={(e) => setFormData({ ... formData, confirmMotDePasse : e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Bouton s'inscrire */}
                        <button type="submit" onClick={(event) => checkValidInput(event)} className="flex m-auto w-[90%] md:w-full justify-center rounded-md shadow-xs bg-[#8BB78F] px-4 py-2.5 pb-5 text-sm/6 font-semibold text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">Inscription</button>

                    </form>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default FormulaireInscription;