import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import NavBar from './components/navBar'

function MesMatchs() {
    const [open, setOpen] = useState(true)
    const [matchs, setMatchs] = useState([])
    const [matchSelectionne, setMatchSelectionne] = useState(null)
    const [monScore, setMonScore] = useState('')
    const [message, setMessage] = useState('')
    const [chargement, setChargement] = useState(true)
    const navigate = useNavigate()

    const chargerMatchs = async () => {
        try {
            const response = await axios.get(
                '/api/statistiqueAdherent/visualisationMatch',
                { withCredentials: true }
            )
            setMatchs(response.data)
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/Connexion')
                return
            }
            setMessage("Impossible de charger les matchs.")
        } finally {
            setChargement(false)
        }
    }

    useEffect(() => {
        chargerMatchs()
    }, [])

    const ouvrirMatch = (match) => {
        setMatchSelectionne(match)
        setMonScore(match.mon_score ?? '')
        setMessage('')
    }

    const enregistrerScore = async (event) => {
        event.preventDefault()
        const score = Number(monScore)

        if (!Number.isInteger(score) || score < 0) {
            setMessage('Le nombre de buts doit être un entier positif ou nul.')
            return
        }

        try {
            await axios.post(
                '/api/statistiqueAdherent/mettreScore',
                { id_match: matchSelectionne.id_match, mon_score: score },
                { withCredentials: true }
            )
            setMessage('Votre score a bien été enregistré.')
            await chargerMatchs()
            setMatchSelectionne((matchActuel) => ({
                ...matchActuel,
                mon_score: score
            }))
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/Connexion')
                return
            }
            setMessage(error.response?.data?.message || "Impossible d'enregistrer le score.")
        }
    }

    return (
        <>
            <NavBar open={open} setOpen={setOpen} />

            <main className={open ? 'ml-64 p-6' : 'ml-20 p-6'}>
                <h1>Mes matchs</h1>

                {chargement && <p>Chargement...</p>}
                {!chargement && matchs.length === 0 && <p>Aucun match trouvé.</p>}

                <ul>
                    {matchs.map((match) => (
                        <li key={match.id_match}>
                            <button type="button" onClick={() => ouvrirMatch(match)}>
                                {new Date(match.date_match).toLocaleDateString('fr-FR')}
                                {' — contre '}
                                {match.prenom_adversaire} {match.nom_adversaire}
                            </button>
                        </li>
                    ))}
                </ul>

                {matchSelectionne && (
                    <section>
                        <h2>
                            Match contre {matchSelectionne.prenom_adversaire}{' '}
                            {matchSelectionne.nom_adversaire}
                        </h2>
                        <p>
                            Date : {new Date(matchSelectionne.date_match).toLocaleDateString('fr-FR')}
                        </p>

                        <form onSubmit={enregistrerScore}>
                            <div>
                                <label htmlFor="mon-score">Mes buts : </label>
                                <input
                                    id="mon-score"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={monScore}
                                    onChange={(event) => setMonScore(event.target.value)}
                                    required
                                />
                            </div>

                            <p>
                                Buts de l'adversaire :{' '}
                                {matchSelectionne.score_adversaire ?? 'pas encore renseignés'}
                            </p>

                            <button type="submit">Enregistrer mes buts</button>
                        </form>
                    </section>
                )}

                {message && <p>{message}</p>}
            </main>
        </>
    )
}

export default MesMatchs
