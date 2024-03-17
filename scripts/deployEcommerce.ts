import { ethers } from "hardhat";

async function main() {
  const recipient = 'your_recipient_contract_address';   //seller
  const ecommerce = await ethers.deployContract("Ecommerce", [recipient]);
  await ecommerce.waitForDeployment();
  console.log(`Ecommerce contract with recipient ${recipient} deployed to ${ecommerce.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
