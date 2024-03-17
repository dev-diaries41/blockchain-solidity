// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

// Single use
// Deploy new instance for a new group

contract ManageGroups is Ownable {
    mapping(address => bool) public groupMembers; 

    event NewMember(address indexed member, uint when);
    event MemberRemoved(address indexed member, uint when);

    constructor() Ownable(_msgSender()) {
    }

    function addMember(address payable _newMember) public onlyOwner {
        require(!groupMembers[_newMember], "address already exists in group."); // Prevent duplicates
        groupMembers[_newMember] = true; // Update the state variable to include the new member
        emit NewMember(_newMember, block.timestamp);
    }

    function removeMember(address _memberToRemove) public onlyOwner {
    require(groupMembers[_memberToRemove], "address doesn't exist in group."); // Ensure the member exists in the group
    groupMembers[_memberToRemove] = false; // Update the state variable to remove the member
    emit MemberRemoved(_memberToRemove, block.timestamp);
}
}
