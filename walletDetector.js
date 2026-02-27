const Web3 = require('web3');
const axios = require('axios');

class WalletDetector {
  constructor(config = {}) {
    this.web3 = new Web3(config.rpcUrl || 'https://eth-mainnet.g.alchemy.com/v2/demo');
    this.etherscanApiKey = config.etherscanApiKey;
    this.blockchairApiKey = config.blockchairApiKey;
  }

  /**
   * Convert public key to Ethereum address
   * @param {string} publicKey - Public key in hex format
   * @returns {string} Ethereum address
   */
  publicKeyToEthAddress(publicKey) {
    try {
      const address = this.web3.eth.accounts.privateKeyToAccount(publicKey).address;
      return address;
    } catch (error) {
      console.error('Error converting public key to address:', error);
      return null;
    }
  }

  /**
   * Check Ethereum wallet balance
   * @param {string} address - Wallet address
   * @returns {Promise<object>} Balance and transaction data
   */
  async checkEthereumWallet(address) {
    try {
      const balance = await this.web3.eth.getBalance(address);
      const ethBalance = this.web3.utils.fromWei(balance, 'ether');
      
      const transactionCount = await this.web3.eth.getTransactionCount(address);
      
      return {
        address,
        balance: ethBalance,
        transactionCount,
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error checking Ethereum wallet:', error);
      return null;
    }
  }

  /**
   * Check Bitcoin wallet balance using blockchain API
   * @param {string} address - Bitcoin address
   * @returns {Promise<object>} Balance and transaction data
   */
  async checkBitcoinWallet(address) {
    try {
      const url = `https://blockchair.com/bitcoin/addresses/balance?addresses=${address}`;
      const response = await axios.get(url);
      
      const data = response.data.data[address];
      if (!data) {
        return { address, balance: 0, error: 'Address not found' };
      }

      return {
        address,
        balance: data.balance / 100000000, // Convert satoshis to BTC
        transactionCount: data.transaction_count,
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error checking Bitcoin wallet:', error);
      return null;
    }
  }

  /**
   * Detect if wallet is unused/lost (no transactions)
   * @param {object} walletData - Wallet data from checkEthereumWallet or checkBitcoinWallet
   * @returns {boolean} True if wallet appears unused
   */
  isUnusedWallet(walletData) {
    if (!walletData) return false;
    return walletData.transactionCount === 0 && parseFloat(walletData.balance) === 0;
  }

  /**
   * Detect if wallet is inactive (old transactions, no recent activity)
   * @param {object} walletData - Wallet data
   * @param {number} daysSinceActivity - Days threshold for considering inactive
   * @returns {Promise<boolean>} True if wallet is inactive
   */
  async isInactiveWallet(walletData, daysSinceActivity = 365) {
    // This would require historical transaction data
    // Implementation depends on specific blockchain API
    return walletData.transactionCount > 0 && walletData.balance === 0;
  }
}

module.exports = WalletDetector;