# Blockchain - Smart contracts and event listners

## Table of Contents
1. [Introduction](#introduction)
2. [How To Install](#how-to-install)
3. [How To Use](#how-to-use)
4. [Additonal Info](#additonal-info)


## Introduction
<a name="introduction"></a>

This repo provides several smart contracts which can be deployed, aswell as an express server which listens to events emitted from a given contract and notifies you via telegram and discord. The following contracts are included: 
- **Ecommerce** - a contract allowing users to buy.
- **Escrow** - a P2P escrow contract; 
- **Gift** - a contract to gift a recipient eth; 
- **ManageGroups** - a contract to manage groups e.g whitelist, affiliate marketers or whatever you want; 
- **MultiSigWallet** - a multi sig wallet; 
- **NFTAuth** - a contract for minting nfts, in my case I'm using it for authentication purposes hence the name but it can be easily adapted for any use case.

**IMPORTANT**
BEFORE USE MAKE SURE YOU REPLACE ALL THE PLACEHOLDER VALUES IN THE SCRIPTS!!


## How To Install
<a name="how-to-install"></a>

To install the blockchain server , follow these installation steps:

**Clone repo:**
Enter the following command in your terminal.

```bash
git clone https://github.com/dev-diaries41/blockchain-solidity.git
```

Change into the cloned repository directory:

```bash
cd blockchain-solidity
```

Install the required dependencies using npm:
  
```bash
npm install
```

## How To Use
<a name="how-to-use"></a>

Make sure to include the following environment variables below.
The MongoDB URL is only needed if you want to use the api-key authentication middleware. Please read the `additonal-info` section for
more on this. You can get your telegram bot token from the `Bot Father` telegram channel. You can get you discord webhook from within discord. Infura is being use as the provider but others such as alchemy can be used.

### Environment variables

MONGODB_URL=your_mongodb_url
PORT=your_port_number

**TELEGRAM CONFIG**
TELEGRAM_CHANNEL_ID=your_telegram_channel_id
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

**DISCORD CONFIG**
DISCORD_WEBHOOK_URL=your_discord_webhook_url

**BLOCKCHAIN**
INFURA_API_KEY=your_infura_api_key
PRIV_KEY=your_wallets_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key

### Deploy Contracts

Deploy contracts by running `npx hardhat run scripts/scriptName.ts`. See the example below:

```bash
npx hardhat run scripts/deployManageGroups.ts 
```


### Available endpoints:

```
/api/v1/events'
```

### Start Server
Start the express server using the following command:

```bash
npm start 
```
The start command utilises ts-node --transpile-only. For most cases, in production you may want to compile the typescript code first and then use the compiled javascript code, but because this server is not intended to be used by mutliple users / handle multiple request from multiple users, performance concerns are negligible. Also, doing so requires some changes which are incovenient when considering the above.

Example of how to start listening to an event:

```typescript
import axios from 'axios'; 

async function listenToEvent() {
  try{
      const apiUrl = 'http://localhost:3000/api/v1/events';
      const eventParams = {contractName: 'ManageGroups', contractAddress: 'your_contract_address', event: 'NewMember'};
    
      const reqBody = eventParams; 
         
      const response= await axios.post(apiUrl, reqBody);
      return response;

  }catch(error: any){
      console.error('Error in listenToEvent: ', error.response.data.error)
  }
}

```

## Additional Info
<a name="additonal-info"></a>

startServer` function in the index.js file that connects to mongoDB.

- **API Key Middleware:**
    The server uses authentication middleware, which checks for a valid api-key. The api-key route for generating an api-key is not included in this repo but can be found in my `expressway` repo. So for the sake of simplicity the middleware has been commented out in the `/src/index.ts` file.

- **MongoDB Connection:**
    The server connects to MongoDB to enable the use of the api-key middleware, this is handled in the `startServer` function in the `/src/index.ts` file. Due to the reasons described above this is commented out.
