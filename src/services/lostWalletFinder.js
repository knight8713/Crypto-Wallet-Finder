// lostWalletFinder.js

/**
 * Function to discover unused wallets.
 * The criteria for a wallet being "unused" can vary.
 * For demonstration, it checks a threshold balance.
 */
const discoverUnusedWallets = (wallets, threshold = 0) => {
    return wallets.filter(wallet => wallet.balance <= threshold);
};

/**
 * Function to discover lost wallets.
 * A wallet could be considered lost if it has been inactive for a certain period.
 */
const discoverLostWallets = (wallets, inactivityThreshold) => {
    const currentTime = Date.now();
    return wallets.filter(wallet => (currentTime - new Date(wallet.lastActive).getTime()) > inactivityThreshold);
};

module.exports = { discoverUnusedWallets, discoverLostWallets };