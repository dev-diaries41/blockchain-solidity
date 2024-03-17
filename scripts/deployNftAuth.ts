import { ethers } from "hardhat";

async function main() {
  const name = 'your_nft_name'  // e.g MyToken
  const symbol = 'your_token_symbol';   // e.g DD
  const baseUri = 'your_base_uri'   // e.g https://ipfs.io/ipfs/QmZTsKpsB1FSnKut3bZ7BY35jCszvhqchqtR81RtSLyWRA/

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

