// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NameRegistry {
    // Struct to store name information
    struct NameRecord {
        address owner;
        uint256 registrationTime;
        bool exists;
    }
    
    // Mapping from name to NameRecord
    mapping(string => NameRecord) private names;
    
    // Mapping from address to their registered names
    mapping(address => string[]) private ownerNames;
    
    // Registration fee (0.01 ETH)
    uint256 public registrationFee = 0.01 ether;
    
    // Contract owner
    address public contractOwner;
    
    // Events
    event NameRegistered(string name, address indexed owner, uint256 timestamp);
    event NameTransferred(string name, address indexed from, address indexed to);
    event FeesWithdrawn(address indexed owner, uint256 amount);
    
    constructor() {
        contractOwner = msg.sender;
    }
    
    // Check if a name is available
    function isAvailable(string memory name) public view returns (bool) {
        return !names[name].exists;
    }
    
    // Register a new name
    function registerName(string memory name) public payable {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(name).length <= 32, "Name too long (max 32 characters)");
        require(isAvailable(name), "Name already registered");
        require(msg.value >= registrationFee, "Insufficient registration fee");
        
        // Register the name
        names[name] = NameRecord({
            owner: msg.sender,
            registrationTime: block.timestamp,
            exists: true
        });
        
        // Add to owner's list
        ownerNames[msg.sender].push(name);
        
        emit NameRegistered(name, msg.sender, block.timestamp);
        
        // Refund excess payment
        if (msg.value > registrationFee) {
            payable(msg.sender).transfer(msg.value - registrationFee);
        }
    }
    
    // Get name owner
    function getOwner(string memory name) public view returns (address) {
        require(names[name].exists, "Name not registered");
        return names[name].owner;
    }
    
    // Get name details
    function getNameDetails(string memory name) public view returns (
        address owner,
        uint256 registrationTime,
        bool exists
    ) {
        NameRecord memory record = names[name];
        return (record.owner, record.registrationTime, record.exists);
    }
    
    // Transfer name to another address
    function transferName(string memory name, address newOwner) public {
        require(names[name].exists, "Name not registered");
        require(names[name].owner == msg.sender, "You don't own this name");
        require(newOwner != address(0), "Invalid new owner address");
        
        address previousOwner = names[name].owner;
        names[name].owner = newOwner;
        ownerNames[newOwner].push(name);
        
        emit NameTransferred(name, previousOwner, newOwner);
    }
    
    // Get all names owned by an address
    function getNamesOwnedBy(address owner) public view returns (string[] memory) {
        return ownerNames[owner];
    }
    
    // Update registration fee (only contract owner)
    function setRegistrationFee(uint256 newFee) public {
        require(msg.sender == contractOwner, "Only contract owner can set fee");
        registrationFee = newFee;
    }
    
    // Withdraw collected fees (only contract owner)
    function withdrawFees() public {
        require(msg.sender == contractOwner, "Only contract owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        payable(contractOwner).transfer(balance);
        emit FeesWithdrawn(contractOwner, balance);
    }
    
    // Get contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
