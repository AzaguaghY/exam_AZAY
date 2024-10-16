// modeles/clients.js
const mongoose = require('mongoose');

// Définir le schéma pour les clients
const clientSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true,
        trim: true
    },
    adresse: {
        type: String,
        required: true,
        trim: true
    },
    telephone: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String, // Utiliser 'Date' si vous préférez le format Date, sinon 'String'
        required: true
    }
});

// Créer le modèle basé sur le schéma
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;