pragma solidity ^0.5.0;

contract Dbank {
    // Balance will store the deposit ether of each address
    mapping(address => uint256) public Balance;
    event depositMade(address accAddress, uint256 amount);
    uint256 public totalAccount;
    uint256 convertor = 1000000000000000000;

    constructor() public payable {
        totalAccount = 0;

    }

    function initAccount() public payable returns (uint256) {
        Balance[msg.sender] = msg.value;
        totalAccount++;
        return (Balance[msg.sender]);
    }

    function deposit(uint256 amount) public payable returns (uint256) {
        require(amount > 0);
        Balance[msg.sender] += amount;

        //      emit depositMade(msg.sender, amount);
        return Balance[msg.sender];
    }

    function withDraw(uint256 amount) public payable {
        msg.sender.transfer(amount * convertor);

    }

    function getBalance(address a) public view returns (uint256) {
        return Balance[a];
    }

}
