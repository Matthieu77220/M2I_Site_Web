// ---------------------------------------------------------
// 1) Import des modules nécessaires
// ---------------------------------------------------------
import express from "express";             // Framework principal pour créer le serveur web
import path from "path";                   // Permet de manipuler les chemins de fichiers
import { fileURLToPath } from "url";       // Nécessaire pour récupérer __dirname en ESM
import dotenv from "dotenv";               // Charge les variables d’environnement depuis le fichier .env
import session from "express-session";     // Gère les sessions utilisateur (connexion, déconnexion)
import bcrypt from "bcryptjs";             // Sert à hacher les mots de passe avant de les stocker
import mysql from "mysql2/promise";        // Client MySQL compatible avec les promesses (async/await)
import fs from "fs/promises";              // Permet de lire des fichiers HTML en asynchrone

// ---------------------------------------------------------
// 2) Chargement du fichier .env (configuration du projet)
// ---------------------------------------------------------
dotenv.config(); // Lit le fichier .env à la racine et charge les variables dans process.env

// ---------------------------------------------------------
// 3) Initialisation d’Express et configuration de base
// ---------------------------------------------------------
const app = express(); // Création de l’application Express
const __filename = fileURLToPath(import.meta.url); // Récupération du chemin absolu du fichier actuel
const __dirname = path.dirname(__filename);        // Obtient le dossier courant

// ---------------------------------------------------------
// 4) Configuration des middlewares Express
// ---------------------------------------------------------

// Permet à Express de lire les données envoyées par un formulaire HTML (méthode POST)
app.use(express.urlencoded({ extended: true }));

// Permet de lire les données JSON envoyées depuis un client (API, JS, etc.)
app.use(express.json());

// Indique à Express que tous les fichiers contenus dans /public peuvent être servis directement
app.use(express.static(path.join(__dirname, "public")));

// Configure le système de session pour garder les utilisateurs connectés
app.use(
  session({
    secret: process.env.SESSION_SECRET,      // Clé secrète utilisée pour signer les cookies de session
    resave: false,                           // Évite d’enregistrer la session si rien n’a changé
    saveUninitialized: false,                // N’enregistre pas les sessions vides
    cookie: {                                // Paramètres du cookie envoyé au navigateur
      httpOnly: true,                        // Empêche l’accès au cookie depuis le JavaScript du client
      maxAge: 1000 * 60 * 60,                // Durée de vie : 1 heure (en millisecondes)
    },
  })
);

// ---------------------------------------------------------
// 5) Connexion à la base de données MySQL
// ---------------------------------------------------------
const pool = mysql.createPool({
  host: process.env.DB_HOST,         // Adresse du serveur MySQL (localhost sous XAMPP)
  user: process.env.DB_USER,         // Nom d’utilisateur MySQL (root par défaut)
  password: process.env.DB_PASSWORD, // Mot de passe MySQL (souvent vide sous XAMPP)
  database: process.env.DB_NAME,     // Nom de la base (user dans notre cours)
  waitForConnections: true,          // Met en file d’attente les connexions si la BDD est occupée
  connectionLimit: 10,               // Nombre maximum de connexions simultanées
  queueLimit: 0,                     // Pas de limite pour la file d’attente
});

// ---------------------------------------------------------
// 6) Fonction utilitaire pour remplacer les jetons {{TOKEN}} (Express, par défaut, ne sait pas interpréter ces jetons.C’est donc nous qui avons créé une fonction utilitaire pour le faire manuellement.)
// ---------------------------------------------------------
async function renderHtml(filePath, replacements = {}) {
  // Lit le contenu du fichier HTML passé en argument
  let html = await fs.readFile(filePath, "utf8");

  // Pour chaque paire clé/valeur de l’objet replacements, on remplace le jeton dans le HTML
  for (const [key, value] of Object.entries(replacements)) {
    const token = new RegExp(`{{\\s*${key}\\s*}}`, "g"); // Expression régulière qui cherche {{CLE}}
    html = html.replace(token, value ?? "");              // Remplace le jeton par la valeur correspondante
  }

  // Retourne le fichier HTML final prêt à être envoyé au navigateur
  return html;
}

// ---------------------------------------------------------
// 7) ROUTES PAGES — partie affichage
// ---------------------------------------------------------

// Route d’accueil principale : redirige directement vers le formulaire d’inscription
app.get("/", (req, res) => {
  res.redirect("/inscription"); // Pas de page index.html, donc on envoie directement sur inscription.html
});

// Route qui affiche le formulaire d’inscription
app.get("/inscription", async (req, res) => {
  const formPath = path.join(__dirname, "public", "inscription.html"); // Chemin du fichier
  const html = await fs.readFile(formPath, "utf8");                    // Lecture du fichier
  res.type("html").send(html);                                         // Envoi du HTML au navigateur
});

// Route qui affiche la page de bienvenue personnalisée
app.get("/welcome", async (req, res) => {
  // Vérifie qu’un utilisateur est bien connecté (via sa session)
  if (!req.session?.userId || !req.session?.pseudo) return res.redirect("/inscription");

  // Prépare le chemin du fichier à lire
  const file = path.join(__dirname, "public", "welcome.html");

  // Remplace {{PSEUDO}} dans le fichier par le pseudo de la session
  const html = await renderHtml(file, { PSEUDO: req.session.pseudo });

  // Envoie la page au navigateur
  res.type("html").send(html);
});

// Route qui affiche la page de profil avec les vraies données de l’utilisateur
app.get("/profile", async (req, res) => {
  const userId = req.session?.userId;           // On récupère l’ID utilisateur stocké dans la session
  if (!userId) return res.redirect("/inscription"); // Si pas connecté, retour au formulaire

  try {
    // Lecture des informations en base de données pour cet utilisateur
    const [rows] = await pool.execute(
      `SELECT lastname, firstname, pseudo, email, adresse, codepostal, ville,
              telmobile, telpro, sexe, created_at
       FROM users
       WHERE id = ?`,
      [userId]
    );

    const u = rows[0]; // On prend la première ligne du résultat (un seul utilisateur)
    if (!u) return res.redirect("/inscription");

    // Chemin vers la page HTML du profil
    const file = path.join(__dirname, "public", "profile.html");

    // Remplacement de tous les jetons {{...}} dans le HTML par les données de la BDD
    const html = await renderHtml(file, {
      PSEUDO: u.pseudo,
      LASTNAME: u.lastname,
      FIRSTNAME: u.firstname,
      EMAIL: u.email,
      ADRESSE: u.adresse,
      CODEPOSTAL: u.codepostal,
      VILLE: u.ville,
      TELMOBILE: u.telmobile,
      TELPRO: u.telpro ?? "-",
      SEXE: u.sexe,
      CREATED_AT: new Date(u.created_at).toLocaleString("fr-FR"),
    });

    // Envoie la page finale au navigateur
    res.type("html").send(html);
  } catch (err) {
    console.error(err);              // Affiche l’erreur dans la console serveur
    res.status(500).send("Erreur serveur."); // Envoie une erreur 500 au navigateur
  }
});

// ---------------------------------------------------------
// 8) ROUTE DE TRAITEMENT DU FORMULAIRE D’INSCRIPTION (POST)
// ---------------------------------------------------------
app.post("/register", async (req, res) => {
  try {
    // On récupère les champs envoyés depuis le formulaire
    const {
      lastname, firstname, pseudo, email,
      adresse, codepostal, ville,
      telmobile, telpro, sexe,
      password, password_confirm,
    } = req.body;

    // --- Étape 1 : Vérifications de base ---
    if (
      !lastname || !firstname || !pseudo || !email ||
      !adresse || !codepostal || !ville || !telmobile ||
      !sexe || !password || !password_confirm
    ) {
      return res.status(400).send("Champs manquants.");
    }

    if (password !== password_confirm) {
      return res.status(400).send("Les mots de passe ne correspondent pas.");
    }

    if (password.length < 8) {
      return res.status(400).send("Mot de passe trop court (min. 8 caractères).");
    }

    // --- Étape 2 : Hachage du mot de passe ---
    const password_hash = await bcrypt.hash(password, 10); // Hachage avec un “sel” automatique

    // --- Étape 3 : Insertion dans la base de données ---
    const sql = `
      INSERT INTO users
      (lastname, firstname, pseudo, email, adresse, codepostal, ville,
       telmobile, telpro, sexe, password_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      lastname, firstname, pseudo, email, adresse, codepostal, ville,
      telmobile, telpro || null, sexe, password_hash,
    ];

    // Exécution de la requête préparée (empêche les injections SQL)
    const [result] = await pool.execute(sql, params);

    // --- Étape 4 : Création de la session utilisateur ---
    req.session.userId = result.insertId; // Stocke l’ID du nouvel utilisateur
    req.session.pseudo = pseudo;          // Stocke son pseudo pour personnaliser la page d’accueil

    // --- Étape 5 : Redirection vers la page de bienvenue ---
    return res.redirect("/welcome");
  } catch (err) {
    // Si erreur de doublon (même e-mail ou pseudo déjà utilisé)
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(400).send("Pseudo ou e-mail déjà utilisé.");
    }

    // Autre type d’erreur
    console.error(err);
    return res.status(500).send("Erreur serveur.");
  }
});

// ---------------------------------------------------------
// 9) ROUTE DE DÉCONNEXION
// ---------------------------------------------------------
app.get("/logout", (req, res) => {
  // Supprime la session de l’utilisateur et le redirige vers le formulaire
  req.session.destroy(() => {
    res.redirect("/inscription");
  });
});

// ---------------------------------------------------------
// 10) Démarrage du serveur Node.js
// ---------------------------------------------------------
const PORT = process.env.PORT || 3000;           // Port défini dans le fichier .env ou 3000 par défaut
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`); // Message de confirmation
});
