// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CircularCredit {
    mapping(address => uint256) public balanceOf;
    string public name = "CircularCredit";
    string public symbol = "CIRC";

    event CreditMinted(address to, uint256 amount, uint256 materialId);

    function _mint(address to, uint256 amount, uint256 materialId) internal {
        balanceOf[to] += amount;
        emit CreditMinted(to, amount, materialId);
    }
}

contract MaterialRegistry is CircularCredit {
    struct Material {
        address owner;
        string category;
        uint256 co2Saved;
        bool verified;
        bool exists;
    }

    mapping(uint256 => Material) public materials;
    uint256 public nextId;
    address public verifierAgent;
    mapping(address => uint256) public reputationScore;

    event MaterialListed(uint256 id, address owner, string category, uint256 co2Saved);
    event OwnershipTransferred(uint256 id, address from, address to);

    modifier onlyVerifier() {
        require(msg.sender == verifierAgent, "Not authorized");
        _;
    }

    constructor() {
        verifierAgent = msg.sender;
    }

    function listMaterial(string memory category, uint256 co2Saved) external returns (uint256) {
        uint256 id = nextId++;
        materials[id] = Material(msg.sender, category, co2Saved, false, true);
        emit MaterialListed(id, msg.sender, category, co2Saved);
        return id;
    }

    function verifyAndTransfer(uint256 id, address newOwner) external onlyVerifier {
        Material storage m = materials[id];
        require(m.exists, "Not found");
        address prevOwner = m.owner;
        m.owner = newOwner;
        m.verified = true;
        emit OwnershipTransferred(id, prevOwner, newOwner);
        _mint(newOwner, m.co2Saved, id);
        reputationScore[newOwner] += 1;
    }
}
