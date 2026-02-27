// src/api/routes/wallets.js

const express = require('express');
const router = express.Router();

// Dummy data for demonstration
const wallets = [
    { id: 1, name: 'Bitcoin Wallet', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { id: 2, name: 'Ethereum Wallet', address: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88' }
];

// Get all wallets
router.get('/', (req, res) => {
    res.json(wallets);
});

// Get wallet by ID
router.get('/:id', (req, res) => {
    const wallet = wallets.find(w => w.id === parseInt(req.params.id));
    if (!wallet) return res.status(404).send('Wallet not found');
    res.json(wallet);
});

// Add a new wallet
router.post('/', (req, res) => {
    const newWallet = {
        id: wallets.length + 1,
        name: req.body.name,
        address: req.body.address
    };
    wallets.push(newWallet);
    res.status(201).json(newWallet);
});

// Update an existing wallet
router.put('/:id', (req, res) => {
    const wallet = wallets.find(w => w.id === parseInt(req.params.id));
    if (!wallet) return res.status(404).send('Wallet not found');
    wallet.name = req.body.name;
    wallet.address = req.body.address;
    res.json(wallet);
});

// Delete a wallet
router.delete('/:id', (req, res) => {
    const walletIndex = wallets.findIndex(w => w.id === parseInt(req.params.id));
    if (walletIndex === -1) return res.status(404).send('Wallet not found');
    wallets.splice(walletIndex, 1);
    res.status(204).send();
});

module.exports = router;