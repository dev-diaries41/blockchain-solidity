import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 300; // add 5mins
  const recipient = '0x9AC2A0Fa7C48484FB8C7B646e9cf0e4499F974f1';

  const lockedAmount = ethers.parseEther("0.001");

  const gift = await ethers.deployContract("Gift", [unlockTime, recipient], {
    value: lockedAmount,
  });

  await gift.waitForDeployment();

  console.log(
    `Gift with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${gift.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
