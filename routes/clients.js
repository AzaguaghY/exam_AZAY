// routes/clients.js
const express = require('express');
const Client = require('../modeles/clients'); // Importer le modèle de client

const router = express.Router();

// a) GET /api/clients - Récupérer tous les clients (limité à 250)
router.get('/api/clients', async (req, res) => {
    try {
        const clients = await Client.find().limit(250);
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des clients', error: error.message });
    }
});

// b) GET /api/clients/:telephone - Récupérer un client par son numéro de téléphone complet
router.get('/api/clients/:telephone', async (req, res) => {
    try {
        const client = await Client.findOne({ telephone: req.params.telephone });
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du client', error: error.message });
    }
});

// c) POST /api/clients - Ajouter un nouveau client
router.post('/api/clients', async (req, res) => {
    const { _id, nom, adresse, telephone, date } = req.body;

    // Vérifier que les champs obligatoires sont présents
    if (!nom || !adresse || !telephone || !date) {
        return res.status(400).json({ message: 'Tous les champs (nom, adresse, telephone, date) sont obligatoires' });
    }

    const newClientData = { nom, adresse, telephone, date };

    // Si _id est fourni, l'utiliser pour l'insertion
    if (_id) {
        newClientData._id = _id;
    }

    try {
        const newClient = new Client(newClientData);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout du client', error: error.message });
    }
});

// d) PUT /api/clients/:telephone - Modifier un client par numéro de téléphone
router.put('/api/clients/:telephone', async (req, res) => {
    const updateData = req.body;

    // Empêcher la modification du champ _id
    if (updateData._id) {
        return res.status(400).json({ message: 'La modification de l\'_id n\'est pas autorisée' });
    }

    try {
        const client = await Client.findOneAndUpdate(
            { telephone: req.params.telephone },
            updateData,
            { new: true, runValidators: true }
        );
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du client', error: error.message });
    }
});

// e) DELETE /api/clients/:telephone - Supprimer un client par numéro de téléphone
router.delete('/api/clients/:telephone', async (req, res) => {
    try {
        const client = await Client.findOneAndDelete({ telephone: req.params.telephone });
        if (client) {
            res.json({ message: 'Client supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du client', error: error.message });
    }
});

module.exports = router;

