# ERC 20 Token

A Erc 20 token with transfer function between users.

## Run locally

Clone the repo

```
git clone https://github.com/shubhamkr95/ERC20_token.git
```

Go to project directory

```
cd ERC20_git
```

Install dependencies and dev-dependencies

```
npm install && npm install -D
```

Provide the value in the .env file

```
API_KEY="API key of alchemy"
ROPSTEN_PRIVATE_KEY="your wallet private key"
```

Run the test file

```
npx hardhat test
```

Deploy the contract on Ropsten testnet

```
npx hardhat run scripts/deploy.js --network ropsten
```

Deployed Token address - [0xba871f6b449529d2ebef5beb9f8d51968b9919d3](https://ropsten.etherscan.io/tx/0x0e8dc0f62550c10ed11e975a28e9d5bb0cf03553674c4d37ceac9abe383651d1)
