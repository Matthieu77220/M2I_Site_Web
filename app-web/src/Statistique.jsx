import { useState } from 'react'
import NavBar from './components/navBar'

import dataMatch from '../src/data/match'

function test() {
    const [open, setOpen] = useState(true)

    return (
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
            <div className={`flex flex-col gap-y-20 justify-center m-14 duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>

                {/* header */}
                <div className='flex justify-around items-center rounded-xl shadow-[0px_10px_30px_rgba(70,0,0,0.3)] w-3xl max-w-5xl m-auto h-28 bg-[#7cca98]'>
                    <div className='flex flex-col items-center justify-center text-center h-full'>
                        <h1 className='text-3xl font-bold text-white'>20</h1>
                        <h2 className='text-sm font-semibold text-white'>Nombre de match</h2>
                    </div>

                    <div className='flex flex-col items-center justify-center text-center h-full'>
                        <h1 className='text-3xl font-bold text-white hover:text-yellow-500 duration-200 ease-in'>7</h1>
                        <h2 className='text-sm font-semibold text-slate-200 hover:text-yellow-500 duration-200 ease-in'>Victoire</h2>
                    </div>

                    <div className='flex flex-col items-center justify-center text-center h-full'>
                        <h1 className='text-3xl font-bold text-white hover:text-[#ef5350] duration-200 ease-in'>6</h1>
                        <h2 className='text-sm font-semibold text-slate-200 hover:text-[#ef5350] duration-200 ease-in'>Défaite</h2>
                    </div>

                    <div className='flex flex-col items-center justify-center text-center h-full'>
                        <h1 className='text-3xl font-bold text-white hover:text-blue-600 duration-200 ease-in'>0</h1>
                        <h2 className='text-sm font-semibold text-slate-200 hover:text-blue-600 duration-200 ease-in'>Match nul</h2>
                    </div>
                </div>

                {/* --- Dashboard --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Revu Match */}
                    <div className="lg:col-span-2 rounded-xl bg-[#7cca98]">
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
                                <tbody>
                                    {dataMatch.map((element) => (
                                        <tr key={element.id} className='border-b border-white/10 hover:bg-white/5 last:border-b-0'>
                                            <td className='px-6 py-4 font-bold text-lg text-white'>{element.date}</td>
                                            <td className='px-6 py-4 font-bold text-lg text-white'>{element.resultat}</td>
                                            <td className='px-6 py-4 font-bold text-lg text-white'>
                                                <div className='flex gap-2 items-center'>
                                                    <span className={`h-3 w-3 rounded-full 
                                                            ${element.status == "victoire"
                                                                ? "bg-green-500"
                                                                : element.status === "défaite"
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

                            </table>
                        </div>
                    </div>

                    {/* Ratio */}
                    <div className="flex rounded-xl max-h-56 p-5 bg-[#7cca98]">
                        <h3 className="text-3xl font-semibold text-white">Ratio</h3>
                        <div className="flex justify-center items-center">
                            <p className='text-2xl font-bold text-white'>53% de victoire</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default test;