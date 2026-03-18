const { ethers } = require("hardhat");

async function main() {
  console.log("Starting NameRegistry Tests...\n");

  // Get signers
  const [owner, addr1, addr2] = await ethers.getSigners();
  
  // Deploy contract
  const NameRegistry = await ethers.getContractFactory("NameRegistry");
  const nameRegistry = await NameRegistry.deploy();
  await nameRegistry.waitForDeployment();
  
  const contractAddress = await nameRegistry.getAddress();
  console.log("Contract deployed to:", contractAddress);
  console.log("Contract owner:", owner.address);
  console.log("Test user 1:", addr1.address);
  console.log("Test user 2:", addr2.address);
  console.log("\n" + "=".repeat(50) + "\n");

  let testsPassed = 0;
  let testsFailed = 0;

  // Helper function to run tests
  async function runTest(testName, testFunction) {
    try {
      await testFunction();
      console.log("✅ PASS:", testName);
      testsPassed++;
    } catch (error) {
      console.log("❌ FAIL:", testName);
      console.log("   Error:", error.message);
      testsFailed++;
    }
  }

  // TEST 1: Check initial registration fee
  await runTest("Registration fee should be 0.01 ETH", async () => {
    const fee = await nameRegistry.registrationFee();
    const expectedFee = ethers.parseEther("0.01");
    if (fee.toString() !== expectedFee.toString()) {
      throw new Error(`Expected ${expectedFee}, got ${fee}`);
    }
  });

  // TEST 2: Register a name successfully
  await runTest("Should register a name successfully", async () => {
    const fee = await nameRegistry.registrationFee();
    const tx = await nameRegistry.connect(addr1).registerName("alice", { value: fee });
    await tx.wait();
    
    const isAvailable = await nameRegistry.isAvailable("alice");
    if (isAvailable) {
      throw new Error("Name should not be available after registration");
    }
    
    const owner = await nameRegistry.getOwner("alice");
    if (owner !== addr1.address) {
      throw new Error(`Expected owner ${addr1.address}, got ${owner}`);
    }
  });

  // TEST 3: Cannot register duplicate name
  await runTest("Should reject duplicate name registration", async () => {
    const fee = await nameRegistry.registrationFee();
    try {
      await nameRegistry.connect(addr2).registerName("alice", { value: fee });
      throw new Error("Should have failed but didn't");
    } catch (error) {
      if (!error.message.includes("Name already registered")) {
        throw new Error("Wrong error message: " + error.message);
      }
    }
  });

  // TEST 4: Cannot register without fee
  await runTest("Should reject registration without fee", async () => {
    try {
      await nameRegistry.connect(addr1).registerName("bob", { value: 0 });
      throw new Error("Should have failed but didn't");
    } catch (error) {
      if (!error.message.includes("Insufficient registration fee")) {
        throw new Error("Wrong error message: " + error.message);
      }
    }
  });

  // TEST 5: Cannot register empty name
  await runTest("Should reject empty name", async () => {
    const fee = await nameRegistry.registrationFee();
    try {
      await nameRegistry.connect(addr1).registerName("", { value: fee });
      throw new Error("Should have failed but didn't");
    } catch (error) {
      if (!error.message.includes("Name cannot be empty")) {
        throw new Error("Wrong error message: " + error.message);
      }
    }
  });

  // TEST 6: Transfer name successfully
  await runTest("Should transfer name to new owner", async () => {
    const fee = await nameRegistry.registrationFee();
    await nameRegistry.connect(addr1).registerName("charlie", { value: fee });
    
    const tx = await nameRegistry.connect(addr1).transferName("charlie", addr2.address);
    await tx.wait();
    
    const newOwner = await nameRegistry.getOwner("charlie");
    if (newOwner !== addr2.address) {
      throw new Error(`Expected owner ${addr2.address}, got ${newOwner}`);
    }
  });

  // TEST 7: Cannot transfer if not owner
  await runTest("Should reject transfer by non-owner", async () => {
    try {
      await nameRegistry.connect(addr1).transferName("charlie", addr1.address);
      throw new Error("Should have failed but didn't");
    } catch (error) {
      if (!error.message.includes("You don't own this name")) {
        throw new Error("Wrong error message: " + error.message);
      }
    }
  });

  // TEST 8: Get names owned by address
  await runTest("Should return all names owned by address", async () => {
    const names = await nameRegistry.getNamesOwnedBy(addr1.address);
    if (names.length < 1) {
      throw new Error(`Expected at least 1 name, got ${names.length}`);
    }
    if (!names.includes("alice")) {
      throw new Error("Should include 'alice'");
    }
  });

  // TEST 9: Withdraw fees (only owner)
  await runTest("Should allow owner to withdraw fees", async () => {
    const balanceBefore = await nameRegistry.getContractBalance();
    if (balanceBefore <= 0) {
      throw new Error("Contract should have balance");
    }
    
    const tx = await nameRegistry.connect(owner).withdrawFees();
    await tx.wait();
    
    const balanceAfter = await nameRegistry.getContractBalance();
    if (balanceAfter !== 0n) {
      throw new Error("Balance should be 0 after withdrawal");
    }
  });

  // TEST 10: Non-owner cannot withdraw
  await runTest("Should reject fee withdrawal by non-owner", async () => {
    try {
      await nameRegistry.connect(addr1).withdrawFees();
      throw new Error("Should have failed but didn't");
    } catch (error) {
      if (!error.message.includes("Only contract owner can withdraw")) {
        throw new Error("Wrong error message: " + error.message);
      }
    }
  });

  // Print summary
  console.log("\n" + "=".repeat(50));
  console.log("TEST SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total Tests: ${testsPassed + testsFailed}`);
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log("=".repeat(50));

  if (testsFailed === 0) {
    console.log("\n🎉 All tests passed!\n");
    process.exit(0);
  } else {
    console.log("\n❌ Some tests failed!\n");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
