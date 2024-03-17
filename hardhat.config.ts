import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';


dotenv.config()

const PRIVATE_KEY = process.env.PRIV_KEY || ''
const ETHERSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ''

// The default network is selected as mumbai - the polygon testnet
// This has been chosen because it offers the lowest gas fees
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }, 
  defaultNetwork: "mumbai",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    polygon: {
      url: `https://polygon.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
},

sourcify: {
  // Disabled by default
  // Doesn't need an API key
  enabled: true
}
};

export default config;

