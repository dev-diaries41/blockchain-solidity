import { ethers } from "hardhat";

async function main() {
  const recipient = '0x9AC2A0Fa7C48484FB8C7B646e9cf0e4499F974f1';
  const ecommerce = await ethers.deployContract("Ecommerce", [recipient]);
  await ecommerce.waitForDeployment();
  console.log(`Ecommerce contract with recipient ${recipient} deployed to ${ecommerce.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
