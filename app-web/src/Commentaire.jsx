import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import NavBar from './components/navBar'

function Commentaire() {

    const [open, setOpen] = useState(true)
    const [commentaires, setCommentaires] = useState([])
    const [contenu, setContenu] = useState("")
    const [editId, setEditId] = useState(null)
    const [editContenu, setEditContenu] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetchCommentaires()
    }, [])

    const fetchCommentaires = () => {
        axios.get("http://localhost:3000/api/commentaire/getCommentaire", { withCredentials: true })
            .then(res => setCommentaires(res.data.commentaires))
            .catch(err => console.error(err))
    }

    const handleAjt = () => {
        setError("")
        axios.post("http://localhost:3000/api/commentaire/ajtCommentaire",
            { contenu },
            { withCredentials: true }
        )
            .then(() => {
                setContenu("")
                fetchCommentaires()
            })
            .catch(err => {
                if (err.response?.status === 401) navigate("/connexion")
                setError(err.response?.data?.message || "Erreur lors de l'ajout")
            })
    }

    const handleEdit = (id) => {
        setError("")
        axios.put(`http://localhost:3000/api/commentaire/editCommentaire/${id}`,
            { contenu: editContenu },
            { withCredentials: true }
        )
            .then(() => {
                setEditId(null)
                setEditContenu("")
                fetchCommentaires()
            })
            .catch(err => {
                if (err.response?.status === 401) navigate("/connexion")
                setError(err.response?.data?.message || "Erreur lors de la modification")
            })
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/commentaire/deleteCommentaire/${id}`, { withCredentials: true })
            .then(() => fetchCommentaires())
            .catch(err => {
                if (err.response?.status === 401) navigate("/connexion")
                console.error(err)
            })
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return ""
        return new Date(dateStr).toLocaleDateString("fr-FR", {
            day: "2-digit", month: "short", year: "numeric"
        })
    }

    return (
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} />
            </div>

            <section className={`duration-500 ${open ? "pl-60" : "pl-[72px]"} min-h-screen bg-white`}>
                <div className="mx-auto w-full max-w-2xl px-6 py-14">

                    {/* Header */}
                    <div className="mb-12 border-b border-black pb-6">
                        <h1 className="font-spartan text-4xl font-bold text-black tracking-tight">Commentaires</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            {commentaires.length} commentaire{commentaires.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    {/* Formulaire ajout */}
                    <div className="mb-12">
                        <textarea
                            rows={3}
                            placeholder="Écrivez un commentaire…"
                            value={contenu}
                            onChange={e => setContenu(e.target.value)}
                            className="w-full resize-none border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors duration-200"
                        />
                        {error && (
                            <p className="mt-1 text-xs text-black">{error}</p>
                        )}
                        <button
                            onClick={handleAjt}
                            className="mt-3 border border-black bg-black px-6 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-200"
                        >
                            Publier
                        </button>
                    </div>

                    {/* Liste */}
                    <div className="flex flex-col divide-y divide-gray-100">
                        {commentaires.length > 0 ? (
                            commentaires.map((c) => (
                                <div key={c.id_commentaire} className="py-6">
                                    {editId === c.id_commentaire ? (
                                        <div className="flex flex-col gap-3">
                                            <textarea
                                                rows={3}
                                                value={editContenu}
                                                onChange={e => setEditContenu(e.target.value)}
                                                className="w-full resize-none border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none focus:border-black transition-colors duration-200"
                                            />
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleEdit(c.id_commentaire)}
                                                    className="border border-black bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-200"
                                                >
                                                    Enregistrer
                                                </button>
                                                <button
                                                    onClick={() => { setEditId(null); setEditContenu("") }}
                                                    className="border border-gray-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors duration-200"
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm text-black leading-relaxed">{c.contenu}</p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-xs text-gray-400">{formatDate(c.date_publication)}</span>
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => { setEditId(c.id_commentaire); setEditContenu(c.contenu) }}
                                                        className="text-xs text-gray-400 underline-offset-2 hover:text-black hover:underline transition-colors duration-150"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(c.id_commentaire)}
                                                        className="text-xs text-gray-400 underline-offset-2 hover:text-black hover:underline transition-colors duration-150"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="py-16 text-center">
                                <p className="text-sm text-gray-400">Aucun commentaire pour le moment.</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Commentaire