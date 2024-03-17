import { ethers } from "hardhat";

async function main() {
    const owners: string[] = [];    // When using must have atleast 1 address
    const numConfirmationsRequired = owners.length;
    const mutliSig = await ethers.deployContract("MultiSigWallet", [owners, numConfirmationsRequired], {});
    await mutliSig.waitForDeployment();
    console.log(`contract deployed to ${mutliSig.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

