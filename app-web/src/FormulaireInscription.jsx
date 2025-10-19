function FormulaireInscription() {

    return ( 
        <div className="h-screen flex justify-center items-center py-7 bg-[#5E856B] w-auto ">
            <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full">
                <h1 className="text-center text-xl md:text-4xl font-bold m-5 text-white">Créer un nouveau compte</h1>
                <h2 className="text-center text-sm md:text-xl mt-3 font-bold text-white">Déja inscrit ? <a href="#" className="text-[#7CA982] underline contrast-200">Connectez-vous</a></h2>

                <div className="mt-5 mx-auto w-full max-w-lg">
                  <form action="#" className="space-y-8">

                    <div className="md:flex md:gap-7 md:w-full space-y-8 md:space-y-0">
                        {/* ---- prénom ---- */}
                        <div className="md:w-1/2 mt-2">
                          <input
                            type="text"
                            required
                            placeholder="Prenom"
                            className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                          />
                        </div>

                        {/* ---- nom ---- */}
                        <div className="md:w-1/2 mt-2">
                            <input
                                type="text"
                                required
                                placeholder="Nom"
                                className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* ---- email ---- */}
                    <div className="mt-2">
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                        />
                    </div>

                    {/* ---- Date de naissance ---- */}
                    <div className="mt-2">
                        <input
                            name="email"
                            type="date"
                            required
                            placeholder="Date de naissance"
                            className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold text-[#aaa] font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                        />
                    </div>

                    {/* ---- Téléphone ---- */}

                    <div className="mt-2">
                        <input
                            name="telephone"
                            type="tel"
                            required
                            placeholder="Numéro de téléphone"
                            className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                        />
                    </div>

                    <div className="md:flex md:gap-7 md:w-full space-y-8 md:space-y-0">
                        {/* ---- Mot de passe ---- */}

                        <div className="md:w-1/2 mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              required
                              placeholder="Mot de passe"
                              className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                            />
                        </div>

                        {/* ---- Confirmer Mot de passe ---- */}

                        <div className="md:w-1/2 mt-2">
                            <input
                              id="confirmePassword"
                              name="confirmePassword"
                              type="password"
                              required
                              placeholder="Confirmer mot de passe"
                              className="flex m-auto w-[90%] text-base p-4 rounded-md md:w-full bg-white placeholder:text-[#aaa] placeholder:font-semibold shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-300 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Bouton s'inscrire */}
                    <button type="submit" className="flex m-auto w-[90%] md:w-full justify-center rounded-md shadow-xs bg-[#8BB78F] px-4 py-2.5 text-sm/6 font-semibold text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">Sign in</button>

                  </form>
                </div>
            </div>
        </div>
     );
}

export default FormulaireInscription;