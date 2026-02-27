// keyDerivation.js

const bip32 = require('bip32');
const bip44 = require('bip44');

/**
 * Derives a wallet address from a public key using BIP32.
 * @param {string} publicKey - The public key to derive the wallet address from.
 * @returns {string} - The derived wallet address.
 */
function deriveAddressBIP32(publicKey) {
    const root = bip32.fromBase58(publicKey);
    const child = root.derive(0); // Derives the first child
    return child.publicKey.toString('hex'); // Returns the address in hex format
}

/**
 * Derives a wallet address from a public key using BIP44.
 * @param {string} publicKey - The public key to derive the wallet address from.
 * @returns {string} - The derived wallet address.
 */
function deriveAddressBIP44(publicKey) {
    const root = bip44.fromPublicKey(publicKey);
    const child = root.derivePath("m/44'/0'/0'/0/0"); // Following BIP44 derivation path
    return child.publicKey.toString('hex'); // Returns the address in hex format
}

module.exports = {
    deriveAddressBIP32,
    deriveAddressBIP44
};