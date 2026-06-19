import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import NavBar from './components/navBar'

// import dataMatch from '../src/data/match'
import axios from 'axios'

function Statistique() {
    const [open, setOpen] = useState(true)

    const navigate = useNavigate()

    // ----- Préapration du code en vue de l'api -----

    const [match, setMatch] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [messageAucunMatch, setMessageAucunMatch] = useState(true)

    // Catch : proctection des pages si status = 401
    useEffect(() => {
        axios.get("/api/statistiqueAdherent/statistique", { withCredentials: true })
            .then(res => {
                if (res.data[0].nombreMatch == 0) {
                    setDataUser([
                        {
                            nombreMatch: 0,
                            victoire: 0,
                            defaite: 0,
                            egalite: 0
                        }
                    ])
                } else {
                    setDataUser(res.data)
                }
            })
            .catch(err => {
                if (err.response && err.response.status == 401) {
                    navigate("/connexion")
                }
                console.error(err)
            })
    }, [])

    useEffect(() => {
        axios.get("/api/statistiqueAdherent/visualisationMatch", { withCredentials: true })
            .then(res => setMatch(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
            <div className={`flex flex-col gap-y-20 justify-center m-14 duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>

                {/* header */}
                {
                    dataUser.map((element, index) => (
                        <div
                            key={index}
                            className='flex justify-around items-center rounded-xl shadow-[0px_10px_30px_rgba(70,0,0,0.3)] w-3xl max-w-5xl m-auto h-28 bg-[#7CA982]'
                        >
                            <div className='flex flex-col items-center justify-center text-center h-full'>
                                <h1 className='text-3xl font-bold text-white'>{element.nombreMatch}</h1>
                                <h2 className='text-sm font-semibold text-white'>Nombre de match</h2>
                            </div>

                            <div className='flex flex-col items-center justify-center text-center h-full'>
                                <h1 className='text-3xl font-bold text-white hover:text-green-500 duration-200 ease-in'>{element.victoire}</h1>
                                <h2 className='text-sm font-semibold text-slate-200 hover:text-green-500 duration-200 ease-in'>Victoire</h2>
                            </div>

                            <div className='flex flex-col items-center justify-center text-center h-full'>
                                <h1 className='text-3xl font-bold text-white hover:text-red-500 duration-200 ease-in'>{element.defaite}</h1>
                                <h2 className='text-sm font-semibold text-slate-200 hover:text-red-500 duration-200 ease-in'>Défaite</h2>
                            </div>

                            <div className='flex flex-col items-center justify-center text-center h-full'>
                                <h1 className='text-3xl font-bold text-white hover:text-yellow-500 duration-200 ease-in'>{element.egalite}</h1>
                                <h2 className='text-sm font-semibold text-slate-200 hover:text-yellow-500 duration-200 ease-in'>Match nul</h2>
                            </div>
                        </div>
                    ))
                }

                {/* --- Dashboard --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Revu Match */}
                    <div className="lg:col-span-2 rounded-xl bg-[#7CA982]">
                        <h3 className="text-3xl font-semibold text-white p-5 border-b border-white/10">Revu de vos Match</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xl text-white uppercase bg-white/5">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Match
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                {/* Exemple grace aux tableau match (à remplacer par les valeurs de la BDD) */}

                                {/* -- Préapration du code en vue de l'api -- */}
                                {match.length != 0 ?
                                    <tbody>
                                        {match.map((element, index) => (
                                            <tr key={index} className='border-b border-white/10 hover:bg-white/5 last:border-b-0'>
                                                <td className='px-6 py-4 font-bold text-lg text-white'>{new Date(element.date_reservation).toLocaleDateString("fr-FR")}</td>
                                                <td className='px-6 py-4 font-bold text-lg text-white'>{element.score}</td>
                                                <td className='px-6 py-4 font-bold text-lg text-white'>
                                                    <div className='flex gap-2 items-center'>
                                                        <span className={`h-3 w-3 rounded-full 
                                                                ${element.status == "victoire"
                                                                ? "bg-green-500"
                                                                : element.status === "defaite"
                                                                    ? "bg-red-500"
                                                                    : "bg-yellow-500"
                                                            }`}
                                                        >
                                                        </span>
                                                        <span>{element.status}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :
                                    <tbody>
                                        <tr>
                                            <td><h1 className='text-xl font-black text-red-600'>Aucun match n'a été trouvé.</h1></td>
                                        </tr>
                                    </tbody>

                                }
                                {/* -- Préapration du code en vue de l'api -- */}

                            </table>
                        </div>
                    </div>

                    {/* Ratio */}
                    {match.length !== 0 ? (
                        <div className="flex flex-col rounded-xl max-h-56 p-5 bg-[#7CA982]">
                            <h3 className="text-3xl font-semibold text-white">Ratio</h3>

                            {dataUser.map((element, index) => (
                                <div key={index} className="flex justify-center items-center">
                                    <p className="text-2xl font-bold text-white">
                                        {Math.round(Number((element.victoire) / (Number(element.victoire) + Number(element.defaite))) * 100)}% de victoire
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col rounded-xl max-h-56 p-5 bg-[#7CA982]">
                            <h3 className="text-3xl font-semibold text-white">Ratio</h3>
                            <div className="flex justify-center items-center">
                                <p className="text-2xl font-bold text-white">0% de victoire</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Statistique;