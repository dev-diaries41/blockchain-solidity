/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  ManageGroups,
  ManageGroupsInterface,
} from "../../contracts/ManageGroups";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "when",
        type: "uint256",
      },
    ],
    name: "MemberRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "when",
        type: "uint256",
      },
    ],
    name: "NewMember",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_newMember",
        type: "address",
      },
    ],
    name: "addMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "groupMembers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_memberToRemove",
        type: "address",
      },
    ],
    name: "removeMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50338061003757604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61004081610046565b50610096565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6103d3806100a56000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630b1ca49a14610067578063715018a61461007c5780638da5cb5b146100845780639473ed47146100a4578063ca6d56dc146100d7578063f2fde38b146100ea575b600080fd5b61007a610075366004610379565b6100fd565b005b61007a6101cf565b6000546040516001600160a01b0390911681526020015b60405180910390f35b6100c76100b2366004610379565b60016020526000908152604090205460ff1681565b604051901515815260200161009b565b61007a6100e5366004610379565b6101e3565b61007a6100f8366004610379565b6102a9565b6101056102e7565b6001600160a01b03811660009081526001602052604090205460ff166101725760405162461bcd60e51b815260206004820152601f60248201527f6164647265737320646f65736e277420657869737420696e2067726f75702e0060448201526064015b60405180910390fd5b6001600160a01b03811660008181526001602052604090819020805460ff19169055517f3ac963493df564de734d98633f1145d21512e282ba4c02d3c1011119bf7f2862906101c49042815260200190565b60405180910390a250565b6101d76102e7565b6101e16000610314565b565b6101eb6102e7565b6001600160a01b03811660009081526001602052604090205460ff16156102545760405162461bcd60e51b815260206004820181905260248201527f6164647265737320616c72656164792065786973747320696e2067726f75702e6044820152606401610169565b6001600160a01b038116600081815260016020818152604092839020805460ff191690921790915590514281527f7f48e4f7f3ef2c63408b16a799b8516cb879c145386aedd51a36938a02a1c28391016101c4565b6102b16102e7565b6001600160a01b0381166102db57604051631e4fbdf760e01b815260006004820152602401610169565b6102e481610314565b50565b6000546001600160a01b031633146101e15760405163118cdaa760e01b8152336004820152602401610169565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146102e457600080fd5b60006020828403121561038b57600080fd5b813561039681610364565b939250505056fea264697066735822122002726b58b21b2507d0c1a99d1b91a991a3bbf98f485116a68221ed6c13f4d3c464736f6c63430008140033";

type ManageGroupsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ManageGroupsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ManageGroups__factory extends ContractFactory {
  constructor(...args: ManageGroupsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ManageGroups & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ManageGroups__factory {
    return super.connect(runner) as ManageGroups__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ManageGroupsInterface {
    return new Interface(_abi) as ManageGroupsInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ManageGroups {
    return new Contract(address, _abi, runner) as unknown as ManageGroups;
  }
}
