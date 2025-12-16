import { useState } from "react";
import { useNavigate } from 'react-router';

function ModifierProfile() {

    const navigate = useNavigate()

    // ---------------------------- Enregistrement Input dans le formData ----------------------------//

    // Création des Regex pour chaque Input
    const regexPrenom = new RegExp("^[a-zA-Z]{3,15}$")
    const regexNom = new RegExp("^[a-zA-Z\- ]{3,15}$")
    const regexEmail = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
    const regexTel = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")

    // Attribut les valeur des input selon leurs clés
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email : "",
        dateDeNaissance : "",
        telephone : ""
    })

    // Initialise le type l'input dateNaissance à "text"
    const [inputDateType, setInputDateType] = useState("text")

    // Indique ou non si les inputs respectent les Regex
    const [isInputValid, setIsInputValid] = useState(true)


    // ---------------------------- Enregistrement de formData dans le formFinal => envoie vers l'api ----------------------------//

    const { formFinal, setFormFinal } = useState()

    // Vérifie si les inputs sont conforment aux Regex ainsi que les MDP
    async function checkValidInput(event) {
        event.preventDefault()

        if (regexPrenom.test(formData.prenom) && regexNom.test(formData.nom) && regexEmail.test(formData.email) && regexTel.test(formData.telephone) && regexMotDePasse.test(formData.motDePasse) && regexMotDePasse.test(formData.confirmMotDePasse)) {
            setIsInputValid(true) // Attribut True si le résultat lors de la 1er condition etait dans le else
            const formFinal = {
                prenom: formData.prenom,
                nom: formData.nom,
                email: formData.email,
                dateDeNaissance: formData.dateDeNaissance,
                telephone: formData.telephone
            }

            try {
                await axios.put("http://localhost:3000/api/modifProfil/modificationProfile", formFinal)
                navigate("../profile")
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
        <div className='flex flex-col justify-center lg:h-screen bg-[#5E856B]'>
            <div className="flex justify-center items-center bg-[#5E856B] w-auto">
                <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full">
                    <h1 className="text-center text-xl md:text-4xl font-bold m-5 text-white">Modifier vos informations</h1>
                    <h2 className="text-center text-sm md:text-xl mt-3 font-bold text-white">Un problème ? <span className="text-[#7CA982] underline contrast-200 cursor-pointer" onClick={() => navigate('/connexion')} >Contactez l'administrateur</span></h2>

                    <div className="mt-5 mx-auto w-full max-w-lg">
                    <form onSubmit={checkValidInput} className="space-y-8">

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
                                onFocus={() => setInputDateType("date")} // simule un type = "date" lorsque l'on click dessus
                                onBlur={() => setInputDateType("text")}
                                type={inputDateType}
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

                        {/* Bouton s'inscrire */}
                        <button type="submit" className="flex m-auto w-[90%] md:w-full justify-center rounded-md shadow-xs bg-[#8BB78F] p-5 text-sm/6 font-semibold text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">Sauvegarder</button>

                    </form>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default ModifierProfile;