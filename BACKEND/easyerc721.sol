// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AvatarMinter is ERC721 {
    constructor()
        ERC721("CoopHackaton", "CH")
    {}

    uint public ids=1;
    mapping(uint token => string uri) public uris;

    function mintAvatar(string memory uriz) external {
        uris[ids] = uriz;
        _safeMint(msg.sender, ids);
        ids++;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return uris[tokenId];
    }
}
