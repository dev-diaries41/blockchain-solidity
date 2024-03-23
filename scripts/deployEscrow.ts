import { ethers } from "hardhat";


async function main() {
  const recipient = '0x9AC2A0Fa7C48484FB8C7B646e9cf0e4499F974f1'; //seller
  const escrowAgent = '0x9AC2A0Fa7C48484FB8C7B646e9cf0e4499F974f1'; 

  const lockedAmount = ethers.parseEther("0.001");

  const escrow = await ethers.deployContract("Escrow", [recipient, escrowAgent], {
    value: lockedAmount,
  });

  await escrow.waitForDeployment();

  console.log(
    `Escrow contract with ${ethers.formatEther(
      lockedAmount
    )}ETH  deployed to ${escrow.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
