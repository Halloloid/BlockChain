const hre = require("hardhat");

async function main() {
  console.log("Deploying NameRegistry contract...\n");

  const NameRegistry = await hre.ethers.getContractFactory("NameRegistry");
  const nameRegistry = await NameRegistry.deploy();

  await nameRegistry.waitForDeployment();

  const address = await nameRegistry.getAddress();
  console.log("✅ NameRegistry deployed to:", address);
  
  const fee = await nameRegistry.registrationFee();
  console.log("📋 Registration fee:", hre.ethers.formatEther(fee), "ETH");
  
  const owner = await nameRegistry.contractOwner();
  console.log("👤 Contract owner:", owner);
  
  console.log("\n" + "=".repeat(60));
  console.log("IMPORTANT: Copy this address to use in your frontend!");
  console.log("=".repeat(60));
  console.log("\nContract Address:", address);
  console.log("\nUpdate index.html line 308 with this address:");
  console.log(`const CONTRACT_ADDRESS = "${address}";`);
  console.log("=".repeat(60) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
