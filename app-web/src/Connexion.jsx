import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';

function Connexion() {

    const navigate = useNavigate()

    // ---------------------------- Enregistrement Input dans le formData ----------------------------//

    // Création des Regex pour chaque Input
    const regexEmail = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
    const regexMotDePasse = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[é'(-è^_ç#./+=?!@$%^&*-]).{8,}$")

    // Attribut les valeur des input selon leurs clés
    const [formData, setFormData] = useState({
        email: "",
        motDePasse : ""
    })

    // ---------------------------- Enregistrement de formData dans le formFinal => envoie vers l'api ----------------------------//

    // Indique ou non si les inputs respectent les Regex
    const [isInputValid, setIsInputValid] = useState(true)

    const [formFinal, setForFinal] = useState()

    // Vérifie si les inputs sont conforment aux Regex ainsi que les MDP
    async function checkValidInput(event) {
        event.preventDefault() // empêche la réinitilisation du form si il y a une erreur

        if (regexEmail.test(formData.email) && regexMotDePasse.test(formData.motDePasse)) {  // Vérifie si les inputs sont conforment aux Regex ainsi que les MDP
            setIsInputValid(true)

            const formFinal = {
                prenom: formData.prenom,
                nom: formData.nom,
                email: formData.email,
                dateDeNaissance: formData.dateDeNaissance,
                telephone: formData.telephone,
                motDePasse: formData.motDePasse
            };

            try {
                 const response = await axios.post("http://localhost:3000/api/auth/connexion", 
                    formFinal,
                    {withCredentials: true,}
                )
                 // Récupérer le rôle de l'utilisateur depuis la réponse
                const userRole = response.data?.role;
                
                // Stocker le rôle dans localStorage
                /*
                if (userRole) {
                    localStorage.setItem('userRole', userRole);
                    localStorage.setItem('userId', response.data?.id);
                }
                */
                // Rediriger selon le rôle
                if (userRole === 'superAdmin') {
                    navigate("../PannelSuperAdmin");
                } else {
                    navigate("../Profile");
                }
            } catch (err) {
                  if (err.response && err.response.status == 401) { 
                    navigate("/connexion")
                    console.log("Erreur d'authentification : ", err.response.data.message);
                }
                console.log(err);
                // Ajouter des useState pour afficher au front les erreurs
            }
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
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, motDePasse: e.target.value })}
                                required
                                className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                            />
                        </div>

                        <h2 className="text-center text-sm md:text-xl mt-3 font-bold text-white">Pas encore de compte ?{" "}
                            <a onClick={() => navigate('/Inscription')} className="text-[#7CA982] underline contrast-200 cursor-pointer">Créez-en un</a>
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
