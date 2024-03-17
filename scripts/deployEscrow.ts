import { ethers } from "hardhat";


async function main() {
  const recipient = 'your_recipient_contract_address';   //seller
  const escrowAgent = 'your_escrowagent_contract_address';

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
