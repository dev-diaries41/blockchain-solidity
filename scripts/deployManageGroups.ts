import { ethers } from "hardhat";

async function main() {
  const manageGroups = await ethers.deployContract("ManageGroups", []);
  await manageGroups.waitForDeployment();
  console.log(`ManageGroups contract deployed to ${manageGroups.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
