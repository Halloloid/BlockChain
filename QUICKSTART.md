# QUICK REFERENCE GUIDE

## 🚀 Setup in 5 Steps

### 1. Install
```bash
npm install
```

### 2. Compile & Test
```bash
npx hardhat compile
npx hardhat test
```

### 3. Start Blockchain (Terminal 1)
```bash
npx hardhat node
```
Leave this running!

### 4. Deploy (Terminal 2)
```bash
npx hardhat run scripts/deploy.js --network localhost
```
Copy the contract address!

### 5. Update Frontend
Open `index.html`, line 308:
```javascript
const CONTRACT_ADDRESS = "PASTE_YOUR_ADDRESS_HERE";
```

---

## 🦊 MetaMask Setup

### Add Network
- Name: `Localhost 8545`
- RPC: `http://127.0.0.1:8545`
- Chain ID: `1337`
- Currency: `ETH`

### Import Account
- Copy private key from Terminal 1
- MetaMask → Import Account → Paste

---

## 🎯 Demo Script

1. **Run tests** → Show all passing
2. **Deploy contract** → Show address
3. **Open `index.html`** → Connect MetaMask
4. **Register name** → Show transaction
5. **Transfer name** → Show ownership change

---

## ⚡ Key Commands

```bash
npm run compile    # Compile contract
npm run test       # Run all tests
npm run node       # Start blockchain
npm run deploy     # Deploy contract
```

---

## 📝 What This Uses

- ✅ Hardhat (development)
- ✅ Solidity (smart contract)
- ✅ HTML/CSS/JS (frontend)
- ❌ NO Chai (tests use plain JavaScript)
- ❌ NO React (just HTML)
- ❌ NO Express (no backend server)

---

## 🔍 File Locations

- Contract: `contracts/NameRegistry.sol`
- Tests: `test/NameRegistry.test.js`
- Deploy: `scripts/deploy.js`
- Frontend: `index.html`
- Config: `hardhat.config.js`

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests fail | Run `npm install` |
| Can't deploy | Check Terminal 1 is running |
| MetaMask error | Switch to Localhost 8545 |
| No funds | Import test account |
| Contract error | Update address in index.html |

---

## 🎓 For Instructor

**Key Points:**
1. No backend server - contract IS the backend
2. No Chai - tests use plain JavaScript
3. Decentralized - runs on blockchain
4. Permanent - data can't be deleted
5. Secure - cryptographic ownership

**Technologies:**
- Hardhat for development
- Solidity for smart contract
- Ethers.js for blockchain connection
- MetaMask for wallet

---

Good luck! 🚀
