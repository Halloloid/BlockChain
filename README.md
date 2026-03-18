# Name Registry - Clean Blockchain dApp

A simple blockchain application using **ONLY**:
- ✅ **Hardhat** - For development and testing
- ✅ **Solidity** - Smart contract language
- ✅ **HTML/CSS/JavaScript** - Frontend

**NO Chai, NO extra libraries** - Just the basics!

---

## 📁 Project Structure

```
name-registry-clean/
├── contracts/
│   └── NameRegistry.sol          # Smart contract
├── scripts/
│   └── deploy.js                 # Deployment script
├── test/
│   └── NameRegistry.test.js      # Tests (plain JavaScript!)
├── hardhat.config.js             # Hardhat configuration
├── package.json                  # Dependencies
├── index.html                    # Frontend
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

This installs only **Hardhat** - nothing else!

### Step 2: Compile Contract

```bash
npx hardhat compile
```

### Step 3: Run Tests

```bash
npx hardhat test
```

You should see:
```
✅ PASS: Registration fee should be 0.01 ETH
✅ PASS: Should register a name successfully
✅ PASS: Should reject duplicate name registration
✅ PASS: Should reject registration without fee
✅ PASS: Should reject empty name
✅ PASS: Should transfer name to new owner
✅ PASS: Should reject transfer by non-owner
✅ PASS: Should return all names owned by address
✅ PASS: Should allow owner to withdraw fees
✅ PASS: Should reject fee withdrawal by non-owner

🎉 All tests passed!
```

### Step 4: Start Local Blockchain

**Open Terminal 1:**
```bash
npx hardhat node
```

Keep this running! You'll see 20 test accounts with 10000 ETH each.

### Step 5: Deploy Contract

**Open Terminal 2:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

You'll see:
```
✅ NameRegistry deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
📋 Registration fee: 0.01 ETH
👤 Contract owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

==========================================================
IMPORTANT: Copy this address to use in your frontend!
==========================================================

Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**COPY THE CONTRACT ADDRESS!**

### Step 6: Update Frontend

1. Open `index.html`
2. Find line 308:
   ```javascript
   const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
   ```
3. Replace with your address:
   ```javascript
   const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
   ```
4. Save the file

### Step 7: Setup MetaMask

1. **Install MetaMask** browser extension
2. **Add Local Network:**
   - Click MetaMask
   - Click network dropdown
   - "Add Network" → "Add network manually"
   - Fill in:
     - **Network Name:** Localhost 8545
     - **RPC URL:** http://127.0.0.1:8545
     - **Chain ID:** 1337
     - **Currency:** ETH
   - Click "Save"

3. **Import Test Account:**
   - Go to Terminal 1 (hardhat node)
   - Copy one of the private keys
   - MetaMask → Click account icon → "Import Account"
   - Paste private key
   - Now you have 10000 ETH!

### Step 8: Open Frontend

Simply double-click `index.html` or:
```bash
open index.html
```

---

## 🎯 How to Use

### 1. Connect Wallet
- Click "Connect MetaMask"
- Approve the connection
- Your address will appear

### 2. Check Name
- Enter a name (e.g., "alice")
- Click "Check Availability"
- See if it's available

### 3. Register Name
- Enter name to register
- Click "Register Name"
- Confirm in MetaMask (0.01 ETH)
- Wait for confirmation

### 4. View Your Names
- Click "Load My Names"
- See all registered names

### 5. Transfer Name
- Enter name to transfer
- Enter recipient address
- Confirm transaction

---

## 🧪 Testing Explained

### No Chai! Just Plain JavaScript

The tests use simple JavaScript assertions:

```javascript
// Instead of Chai's expect().to.equal()
if (result !== expected) {
  throw new Error("Test failed!");
}

// Instead of Chai's expect().to.be.revertedWith()
try {
  await someFunction();
  throw new Error("Should have failed!");
} catch (error) {
  if (!error.message.includes("Expected error")) {
    throw new Error("Wrong error!");
  }
}
```

### 10 Tests Included:
1. ✅ Check registration fee
2. ✅ Register name successfully
3. ✅ Reject duplicate names
4. ✅ Reject without payment
5. ✅ Reject empty names
6. ✅ Transfer name
7. ✅ Reject unauthorized transfer
8. ✅ Get owned names
9. ✅ Withdraw fees (owner only)
10. ✅ Reject unauthorized withdrawal

---

## 📝 Smart Contract Functions

```solidity
// Check availability
function isAvailable(string name) → bool

// Register name (costs 0.01 ETH)
function registerName(string name) payable

// Get owner
function getOwner(string name) → address

// Get details
function getNameDetails(string name) → (address, uint256, bool)

// Transfer ownership
function transferName(string name, address newOwner)

// Get all names owned by address
function getNamesOwnedBy(address owner) → string[]

// Admin: Update fee
function setRegistrationFee(uint256 newFee)

// Admin: Withdraw fees
function withdrawFees()

// View balance
function getContractBalance() → uint256
```

---

## 🔧 Available Commands

```bash
# Compile contract
npm run compile

# Run tests
npm run test

# Start local blockchain
npm run node

# Deploy contract
npm run deploy
```

---

## ❓ Common Issues

### "Please install MetaMask"
→ Install MetaMask browser extension and refresh

### "Wrong Network"
→ Switch MetaMask to "Localhost 8545" network

### "Insufficient Funds"
→ Import a test account from hardhat node (Terminal 1)

### "Contract not deployed"
→ Make sure hardhat node is running and contract is deployed

### Tests don't run
→ Run `npm install` first

---

## 🎬 Demo for Instructor

### 1. Show Code (5 min)
- Open `contracts/NameRegistry.sol`
- Explain key functions
- Show mappings and structs

### 2. Run Tests (2 min)
```bash
npm run test
```
- Show all 10 tests passing
- Explain what each test does

### 3. Deploy (2 min)
```bash
# Terminal 1
npm run node

# Terminal 2
npm run deploy
```
- Show deployment output
- Copy contract address

### 4. Live Demo (6 min)
- Open `index.html`
- Connect MetaMask
- Check "alice" → Available
- Register "alice" → Success
- Load My Names → Shows "alice"
- Transfer to another address
- Load My Names → "alice" gone

---

## 🎓 What You'll Learn

1. **Solidity Basics**
   - Smart contracts
   - Mappings & structs
   - Events & modifiers
   - Payable functions

2. **Hardhat Development**
   - Project setup
   - Compilation
   - Testing (without Chai!)
   - Local blockchain
   - Deployment

3. **Web3 Integration**
   - Ethers.js
   - MetaMask connection
   - Transaction signing
   - Event listening

4. **Blockchain Concepts**
   - Decentralization
   - Gas & fees
   - Immutability
   - Smart contract security

---

## 🔒 Security Features

- ✅ Input validation (empty names, length limits)
- ✅ Ownership verification
- ✅ Access control (only owner can transfer)
- ✅ Payment requirements
- ✅ Safe transfers
- ✅ Event logging

---

## 💡 Key Points

### No Backend Server
- Smart contract **IS** the backend
- Runs on blockchain
- No Express, no Node server needed

### No Database
- Blockchain **IS** the database
- Data stored in contract mappings
- Permanent and immutable

### Direct Connection
- Frontend → Blockchain (via Ethers.js)
- No middleware needed
- MetaMask handles transactions

---

## 🚀 What Makes This Different

**Traditional App:**
```
Frontend → Express Server → Database
```

**This dApp:**
```
Frontend → Smart Contract (on Blockchain)
```

**Benefits:**
- ✅ No server hosting costs
- ✅ Always online (blockchain never sleeps)
- ✅ Transparent and verifiable
- ✅ Immutable records
- ✅ Decentralized (no single point of failure)

---

## 📋 Presentation Checklist

- [ ] Hardhat installed (`npm install`)
- [ ] Contract compiles (`npm run compile`)
- [ ] All tests pass (`npm run test`)
- [ ] Local blockchain running (Terminal 1)
- [ ] Contract deployed (Terminal 2)
- [ ] Contract address updated in `index.html`
- [ ] MetaMask installed and configured
- [ ] Test account imported (10000 ETH)
- [ ] Can open `index.html` in browser
- [ ] Can connect MetaMask
- [ ] Can register and transfer names

---

## 🎉 You're Ready!

This is a **complete, working blockchain dApp** with:
- ✅ Clean Solidity contract
- ✅ Tests (no Chai - just JavaScript!)
- ✅ Simple HTML/CSS frontend
- ✅ Full documentation

**Simple to understand, easy to explain, professional quality!**

Good luck with your presentation! 🚀
