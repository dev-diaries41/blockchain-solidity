// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Ecommerce is Ownable {
    address payable public recipient;

    event Paid(address indexed buyer, uint amount, uint when);

    constructor(address _recipient) Ownable(_msgSender()) {
        recipient = payable(_recipient);
    }

    //Sends funds to recipient
    function buy() public payable {
        require(msg.value > 0, "must pay more than 0");
        recipient.transfer(msg.value);
        emit Paid( msg.sender, msg.value, block.timestamp);
    }

     //Update recipient
    function updateRecipient(address payable _newRecipient) public onlyOwner {
        recipient = _newRecipient;
    }
}
