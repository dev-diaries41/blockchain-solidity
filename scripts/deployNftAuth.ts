import { ethers } from "hardhat";

async function main() {
  const name = 'NFTAuth'
  const symbol = 'n2fa';
  const baseUri = 'https://ipfs.io/ipfs/QmZSsVpsA1FSoKut8bZ7BY35jCszvhqcnqtR81RtSLyWPH/'

  const authme = await ethers.deployContract("NFTAuth", [name, symbol, baseUri], {
  });

  await authme.waitForDeployment();

  console.log(`contract deployed to ${authme.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

