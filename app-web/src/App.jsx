import { useState } from "react";
import Connexion from "./Connexion";
import "../public/css/style.css";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      {isLogged ? (
        <h1 className="bg-red-500 text-white text-center p-5 text-3xl">
          Connexion réussie !!
        </h1>
      ) : (
        <Connexion onLogin={setIsLogged} />
      )}
    </>
  );
}

export default App;
