// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// Single use escrow contract to be deployed by a 'buyer'
contract Escrow {
    address payable public seller;          // Seller
    address payable public buyer;           // Buyer
    address payable private escrowAgent;    // Third-party escrow middleman
    uint256 public amount;                  // Escrow amount locked in contract
    bool public buyerReceivedItem;          // Track if buyer has received item
    enum State { Created, InEscrow, Completed, Cancelled }   // Manage escrow state
    State public state;

    event Claimed(uint256 amount, uint256 when);
    event InEscrow(uint256 when);
    event Cancelled(uint256 when);
    event ItemReceived(uint256 when);


    modifier onlyBuyer() {
        require(msg.sender == buyer, "only the Buyer can call this function");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "only the Seller can call this function");
        _;
    }

    modifier onlyBuyerOrSeller() {
        require(msg.sender == seller || msg.sender == buyer, "only the Buyer or Seller can call this function");
        _;
    }

    constructor(address payable _seller, address payable _escrowAgent) payable {
        seller = _seller;         
        buyer = payable(msg.sender); 
        escrowAgent = _escrowAgent;     
        amount = msg.value;             
        state = State.Created;  
        buyerReceivedItem = false;        
    }
    
    // The function allows the buyer to lock the funds in Escrow
    function lock() external onlyBuyer {
        require(state == State.Created,"escrow is already locked");
        state = State.InEscrow;
        emit InEscrow(block.timestamp);
    }

    function claim() external onlySeller {
        require(state == State.InEscrow, "not yet in escrow state");
        require(buyerReceivedItem, "buyer has not confirmed receipt of item");
        _transferRecipientAmount();
        _transferEscrowAgentFee();
        state = State.Completed;
        emit Claimed(amount, block.timestamp);
    }

    // 1% escrow agents fee
    function _transferEscrowAgentFee() internal {
        uint256 fee = (amount) / 100;        
        escrowAgent.transfer(fee);
    }

    //99% of amount (1% escrow agents fee)
     function _transferRecipientAmount() internal {
        uint256 claimableAmount = (amount * 99) / 100;     
        seller.transfer(claimableAmount);
    }

    // Can only be cancelled when the contract is in one of 2 states: Created or Locked
    // When escrow state is Created it can be cancelled by both parties
    // When escrow state is Locked, it can only be cancelled by the seller
    // this ensure that neither party can cancel dishonestly
    // Return funds to buyer
    function cancel() external onlyBuyerOrSeller {
        require(state == State.Created || (state == State.InEscrow && msg.sender == seller),"escrow cannot be cancelled");
        buyer.transfer(amount);
        state = State.Cancelled;
        emit Cancelled(block.timestamp);       
    }

    function confirmItemReceived() external onlyBuyer {
        require(state == State.InEscrow, "escrow is not active yet - have you locked funds?");
        buyerReceivedItem = true;
        emit ItemReceived(block.timestamp);
    }


    fallback() external {
        revert("fallback function called: direct payment not accepted by this contract.");    
    }
}
