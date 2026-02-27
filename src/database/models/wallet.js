const mongoose = require('mongoose');

// Create a wallet schema
const walletSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

// Create a wallet model from the schema
const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
