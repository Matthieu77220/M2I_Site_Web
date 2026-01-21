import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TerrainPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pitchs, setPitchs] = useState([]);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  // Récupération Terrains
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/voirTerrain", { withCredentials: true })
      .then(res => setPitchs(res.data))
      .catch(err => {
        if (err.response?.status === 401) {
          navigate("/connexion");
        }
        console.error(err);
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note) {
      setMessage("Veuillez sélectionner une note");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/admin/noterTerrain", { id_terrain: id, valeur_note: note}, { withCredentials: true });

      setMessage("Note enregistrée !");
    } catch (err) {
      setMessage("Erreur lors de l’envoi de la note");
      console.error(err);
    }
  };

  return (
    <>
      {pitchs.map((element) => (
        <div key={element.id_terrain}>
          <p>{element.adresse}</p>
        </div>
      ))}

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

      <form onSubmit={handleSubmit}>
        <h2>Noter ce terrain</h2>

        <select value={note} onChange={(e) => setNote(e.target.value)}>
          <option value="">-- Choisir une note --</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <br /><br />

        <button type="submit">Envoyer</button>
        {message && <p>{message}</p>}
      </form>
      
      <br /><br /><br /><br /><br />
      <p>ID du terrain : {id}</p>
    </>
  );
}

export default TerrainPage;
