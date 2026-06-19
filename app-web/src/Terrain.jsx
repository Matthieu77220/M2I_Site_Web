import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { GiSoccerField } from "react-icons/gi";
import axios from 'axios';
import NavBar from './components/navBar'

function Terrain() {

     const [open, setOpen] = useState(true)
     const [pitchs, setPitchs] = useState([])
     const navigate = useNavigate()

     useEffect(() => {
        axios.get("/api/terrain/voirTerrain", { withCredentials: true })
            .then(res => setPitchs(res.data))
            .catch(err => {
                if (err.response && err.response.status == 401) {
                    navigate("/connexion")
                }
                console.error(err)
            })
    }, [])
    
  

    return (
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>

            <section className={`duration-500 ${open ? "pl-60" : "pl-[72px]"} min-h-screen bg-[#f8f9fa]`}>
                <div className="mx-auto w-full max-w-7xl px-6 py-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 className="font-spartan text-4xl font-bold text-[#7CA982]">Terrains</h1>
                            <p className="mt-2 max-w-xl text-sm text-gray-600">
                                Retrouvez l'ensemble des terrains disponibles et choisissez le lieu idéal pour vos prochains matchs.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-[#7CA98233] bg-white px-4 py-3 shadow-sm">
                            <span className="h-3 w-3 rounded-full bg-[#7CA982]" />
                            <p className="text-sm font-semibold text-[#3a5d42]">{pitchs.length} terrain(s)</p>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {pitchs.length > 0 ? (
                            pitchs.map((pitch, index) => {
                                const terrainId = pitch?.id_terrain ?? index + 1;
                                const adresse = pitch?.adresse ?? "Adresse indisponible";

                                return (
                                    <article
                                        key={pitch?.id_terrain ?? `terrain-${index}`}
                                        className="group relative overflow-hidden rounded-2xl border border-[#7CA98233] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#7CA982] via-transparent to-transparent opacity-10 transition-opacity duration-300 group-hover:opacity-20" />

                                        <div className="relative flex h-full flex-col gap-6 p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7CA982] text-white shadow-md">
                                                    <GiSoccerField size={24} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#7CA982]">
                                                        Terrain {terrainId}
                                                    </p>
                                                    <h2 className="mt-1 font-spartan text-lg font-bold text-gray-900">
                                                        {adresse}
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#3a5d42]">
                                                {pitch?.id_club && (
                                                    <span className="rounded-full bg-[#7CA9821a] px-3 py-1">Club #{pitch.id_club}</span>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#7CA98255] bg-white px-6 py-16 text-center shadow-sm">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7CA9821a] text-[#7CA982]">
                                    <GiSoccerField size={28} />
                                </div>
                                <h2 className="mt-6 text-xl font-bold text-gray-900">Aucun terrain disponible</h2>
                                <p className="mt-2 max-w-md text-sm text-gray-600">
                                    Nous n'avons pas encore de terrain à afficher pour le moment. Revenez un peu plus tard.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Terrain;