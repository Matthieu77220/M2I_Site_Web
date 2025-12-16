import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import NavBarAdmin from '../components/NavBarAdmin';
import StatsChart from '../components/StatsChart';

function AdminStats() {
    const [open, setOpen] = useState(true);
    
    // Données de statistiques 
    const membresData = [
        { label: 'Jan', value: 45 },
        { label: 'Fév', value: 52 },
        { label: 'Mar', value: 61 },
        { label: 'Avr', value: 58 },
        { label: 'Mai', value: 73 },
        { label: 'Jun', value: 85 }
    ];

    const terrainsData = [
        { label: 'Terrain 1', value: 120 },
        { label: 'Terrain 2', value: 95 },
        { label: 'Terrain 3', value: 140 },
        { label: 'Terrain 4', value: 110 },
        { label: 'Terrain 5', value: 165 }
    ];

    const utilisationData = [
        { label: 'Lun', value: 78 },
        { label: 'Mar', value: 65 },
        { label: 'Mer', value: 92 },
        { label: 'Jeu', value: 88 },
        { label: 'Ven', value: 95 },
        { label: 'Sam', value: 100 },
        { label: 'Dim', value: 85 }
    ];

    return ( 
        <>
            <div className='flex'>
                <NavBarAdmin open={open} setOpen={setOpen} />
            </div>

            <div className={`duration-500 ${open ? "pl-60" : "pl-[72px]"} pr-8 pt-8 pb-8`}>
                <h1 className="text-3xl md:text-4xl font-bold text-[#7CA982] mb-10 ml-8">
                    Statistiques
                </h1>

                {/* Cartes de statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-8">
                    <div className="bg-[#7CA982] text-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">Total Membres</h3>
                        <p className="text-4xl font-bold">85</p>
                        <p className="text-sm mt-2 opacity-80">+12% ce mois</p>
                    </div>
                    
                    <div className="bg-white border-2 border-[#7CA982] rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Terrains Actifs</h3>
                        <p className="text-4xl font-bold text-[#7CA982]">5</p>
                        <p className="text-sm mt-2 text-gray-600">100% disponibles</p>
                    </div>
                    
                    <div className="bg-[#7CA982] text-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-2 ">Utilisation Moyenne</h3>
                        <p className="text-4xl font-bold ">86%</p>
                        <p className="text-sm mt-2 ">Cette semaine</p>
                    </div>
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 px-8">
                    <StatsChart 
                        data={membresData}
                        title="Évolution des Membres"
                        color="#7CA982"
                        unit="Membres"
                    />
                    
                    <StatsChart 
                        data={terrainsData}
                        title="Utilisation par Terrain"
                        color="#5a8a65"
                        unit="Réservations"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 px-8">
                    <StatsChart 
                        data={utilisationData}
                        title="Utilisation Hebdomadaire"
                        color="#7CA982"
                        unit="% d'occupation"
                    />
                </div>
            </div>
        </>
    );
}

export default AdminStats;