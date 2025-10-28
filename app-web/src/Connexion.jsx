import React, { useState } from "react";

function Connexion({ onLogin }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const regexEmail = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
const regexMotDePasse = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[é'(-è^_ç#./+=?!@$%^&*-]).{8,}$")

const handleSubmit = (e) => {
e.preventDefault();
// Simuler une vérification des identifiants

if (email === "admin@test.com" && password === "1234") {
    setMessage("Connexion réussie !");
    onLogin(true);
} else {
    setMessage("Identifiants incorrects.");
    onLogin(false);
}
};

  function checkValidInput() {
        if (regexEmail.test(formData.email) && regexMotDePasse.test(formData.motDePasse)){
            return true;
        } else {
            alert("Format email ou mot de passe incorrect");
            return false;
        }     
    
}

return (
<div className="h-screen flex justify-center items-center py-7 bg-[#5E856B] w-auto">
    <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full">
    <h1 className="text-center text-xl md:text-4xl font-bold m-5 text-white">Connexion</h1>
    
    <div className="mt-5 mx-auto w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
        <div className="mt-2">
            <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
            />
        </div>

        <div className="mt-2">
            <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
            />
        </div>

        <h2 className="text-center text-sm md:text-xl mt-3 font-bold text-white">Pas encore de compte ?{" "}
        <a href="FormulaireIsncription.jsx" className="text-[#7CA982] underline contrast-200">Créez-en un</a>
        </h2>


        <div className="flex justify-center">
            <button
            type="submit"
             onClick={(event) => checkValidInput(event)}
            className="w-[90%] md:w-full bg-[#7CA982] hover:bg-[#6b9576] text-white font-semibold py-3 rounded-md shadow-md transition duration-300">Se connecter
            </button>
        </div>

        {message && (
            <p
            className={`text-center font-semibold ${
                message === "Connexion réussie !"
                ? "text-green-200"
                : "text-red-300"
            }`}
            >
            {message}
            </p>
        )}
        </form>
    </div>
    </div>
</div>
);
}
export default Connexion;
