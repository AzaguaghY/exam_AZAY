require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const mongoose = require('mongoose');
const clientRoutes = require('./routes/clients'); // Importer les routes des clients

const app = express();
const PORT = process.env.PORT || 8000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware pour parser le JSON
app.use(express.json());

// Exemple de route pour vérifier la connexion
app.get('/', (req, res) => {
    res.send('Connexion réussie avec la base de données "examen" sur le port 8000!');
});

// Utiliser les routes pour les clients
app.use(clientRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




