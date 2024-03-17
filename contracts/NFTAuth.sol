// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFTAuth is ERC721URIStorage, Ownable{
 
    event MintAuth (address indexed minter, uint256 initialTokenId, uint256 numNfts);
    
    
    uint256 public totalNfts;
    uint256 public maxNfts = 100000; //max supply
    uint256 public maxBatch = 5; // max number of nfts to mint at any given time 
    uint256 public price = 0.0001 ether;
    string public baseURI;
    
    constructor(string memory name_, string memory symbol_, string memory baseURI_) ERC721(name_, symbol_) Ownable(_msgSender()){
        baseURI = baseURI_;
    }
 
    function totalSupply() public view virtual returns (uint256) {
        return totalNfts;
    }
 
    function _baseURI() internal view virtual override returns (string memory){
        return baseURI;
    }
 
    function setBaseURI(string memory _newURI) public onlyOwner {
        baseURI = _newURI;
    }
 
    function changePrice(uint256 _newPrice) public onlyOwner {
        price = _newPrice;
    }
 
    function setTokenURI(uint256 _tokenId, string memory _tokenURI) public onlyOwner {
        _setTokenURI(_tokenId, _tokenURI);
    }
 
    function mintNfts(uint256 _numNfts) payable public {
        require(_numNfts > 0 && _numNfts <= maxBatch, "must mint a minimum of 1 and maximum of 5 NFTs");
        require(totalNfts + _numNfts <= maxNfts, "max supply reached");
        require(msg.value == _numNfts * price, "incorrect price");
        payable(owner()).transfer(msg.value);
        emit MintAuth(_msgSender(), totalNfts+1, _numNfts);
        for(uint256 i = 0; i < _numNfts; i++){
            _mint(_msgSender(), 1 + totalNfts++);
        }
    } 

}