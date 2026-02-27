module.exports = {
  networks: {
    bitcoin: {
      name: 'Bitcoin',
      chain: 'BTC',
      network_id: '1', // Bitcoin mainnet
      rpc_url: 'https://bitcoin.org/en/full-node#what-is-a-full-node',
    },
    ethereum: {
      name: 'Ethereum',
      chain: 'ETH',
      network_id: '1', // Ethereum mainnet
      rpc_url: 'https://ethereum.org/en/developers/docs/apis/json-rpc/',
    },
    litecoin: {
      name: 'Litecoin',
      chain: 'LTC',
      network_id: '2', // Litecoin mainnet
      rpc_url: 'https://litecoin.org/',
    },
    // Additional networks can be configured here 
    // For example: Binance Smart Chain, Cardano, etc.
  }
};