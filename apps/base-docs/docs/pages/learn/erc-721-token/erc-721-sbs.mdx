---
title: ERC-721 Token
description: Build your own NFT based on the ERC-721 standard.
hide_table_of_contents: false
---

# ERC-721 Token

Punks, Apes, and birds of all kinds. You've heard about them, seen them, and may even be lucky enough to own a famous NFT. Or maybe you've just bought into a random collection and aren't sure what to do with your NFT. NFTs aren't really pictures, or anything else specific. They're a method of proving ownership of a digital asset. Anyone can right-click on a picture of a monkey and set it as their profile picture, but only the owner can use it with apps that utilize web3 ownership.

The ERC-721 token standard is the underlying technical specification that not only makes digital ownership possible, it provides a standardized way for marketplaces, galleries, and other sites to know how to interact with these digital items.

---

## Objectives

By the end of this lesson you should be able to:

- Analyze the anatomy of an ERC-721 token
- Compare and contrast the technical specifications of ERC-20 and ERC-721
- Review the formal specification for ERC-721
- Build and deploy an ERC-721 compliant token
- Use an ERC-721 token to control ownership of another data structure

---

## Implementing the OpenZeppelin ERC-721 Token

JPGs may be all the rage right now but in the future, the selfie you post on social media, a text message you send to your mother, and the +4 battleaxe you wield in your favorite MMO might all be NFTs.

### Import and Setup

Start by opening the [OpenZeppelin] ERC-721 in Github. Copy the link and use it to import the ERC-721 contract. Create your own contract, called `MyERC721`, that inherits from `ERC721Token`. Add a constructor that initializes the `_name` and `_symbol`.

<details>

<summary>Reveal code</summary>

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract MyERC721Token is ERC721 {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {

    }
}
```

</details>

<br/>

### Minting NFTs

The minting function that is provided by OpenZeppelin, `_safeMint`, is `internal`. To use it to let your customers mint NFTs, you'll need to implement a function in your contract that calls the one in the imported contract.

Before you can do that, you need a way to supply the two parameters needed for `_safeMint`:

- `address to` - the owner of the new NFT
- `uint256 tokenId` - the ID number for the new NFT

The owner is easy, you can simply use `msg.sender` to grant ownership to the wallet doing the minting.

ID is slightly more challenging. A common practice is to simply assign the total number of NFTs, including the one being minted, as the `tokenId`. Doing so is straightforward, makes it easier to find all of the NFTs within a collection, and helps lean in to the common community perception that lower-number NFTs are better, just like other limited-edition collectibles.

:::caution
Obfuscating certain information, such as customer IDs, is often considered a best practice. Doing so might make it harder for an attacker who has circumvented other security functions from getting access to more data. If `134` is a valid `customer_id`, it is likely that `135` is too. The same can't be said for `bfcb51bd-c04f-42d5-8116-3def754e8c32`.

This practice is not as useful on the blockchain, because all information is public.
:::

To implement ID generation, simply add a `uint` called `counter` to storage and initialize it as 1, either at declaration or in the constructor.

Now, you can add a function called `redeemNFT` that calls `safeMint` using the `msg.sender` and `counter`, and then increments the `counter`:

<details>

<summary>Reveal code</summary>

```solidity
function redeemNFT() external {
    _safeMint(msg.sender, counter);
    counter++;
}
```

</details>

<br/>

:::danger

As a programmer, you've probably gone through great pains to internalize the idea of zero-indexing. Arrays start at 0. The pixel in the top-left corner of your screen is located at 0, 0.

As a result, you need to be very careful when working with Solidity because there isn't the concept of `undefined`, and "deleted" values return to their default value, which is 0 for numbers.

To prevent security risks, you'll need to make sure that you never give an ID or array index of 0 to anything. Otherwise, attempting to delete a value, such as a `struct` member called `authorizedSellerID` might give the wallet address stored at index 0 access to that resource.

:::

Deploy and test. Be sure to:

- Mint several NFTs
- Transfer an NFT from one Remix account to another
- Try to transfer an NFT to `0x0000000000000000000000000000000000000000`

---

## ERC-721 URIs

The ERC-721 standard includes the option to define a [URI] associated with each NFT. These are intended to point to a `json` file following the _ERC721 Metadata JSON Schema_

```json
{
  "title": "Asset Metadata",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Identifies the asset to which this NFT represents"
    },
    "description": {
      "type": "string",
      "description": "Describes the asset to which this NFT represents"
    },
    "image": {
      "type": "string",
      "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
    }
  }
}
```

Note that they don't have to. In the OpenZeppelin implementation, the function that returns the `_baseURI` is `virtual` and must be overridden by an inheriting contract.

```
// OpenZeppelin ERC-721
/**
    * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
    * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
    * by default, can be overridden in child contracts.
    */
function _baseURI() internal view virtual returns (string memory) {
    return "";
}
```

The owner of the contract can therefore choose what the value is and when, how, or if it is changeable. For example, the [Bored Ape Yacht Club] contract has a function allowing the owner to set or change the \_baseURI, changing where the metadata is stored, and potentially what is in it.

```solidity
// From boredapeyachtclub.sol
function setBaseURI(string memory baseURI) public onlyOwner {
    _setBaseURI(baseURI);
}
```

The metadata for [BAYC] is [stored on IPFS], but some projects even use centralized, web2 storage options!

### NFT Switcheroo

[Doodles] is another NFT collection that [uses IPFS] to store metadata. Let's modify our contract to swap metadata back and forth from one collection to the other.

Start by saving the IPFS metadata bases as constants, at the contract level. Add an enum to enable selection between these two choices, and an instance of that enum.

<details>

<summary>Reveal code</summary>

```solidity
    string constant BAYC = "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    string constant DOODLES = "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/";

    enum NFTMetadata { BAYC, DOODLES }
    NFTMetadata nftMetadata = NFTMetadata.BAYC;
```

</details>

<br/>

Finally, add an override of `_baseURI` that returns the appropriate selection based on which collection is active, and a function to swap the URI.

<details>

<summary>Reveal code</summary>

```solidity
function _baseURI() internal override view returns(string memory) {
    if (nftMetadata == NFTMetadata.BAYC) {
        return BAYC;
    } else if (nftMetadata == NFTMetadata.DOODLES){
        return DOODLES;
    } else {
        revert("Error...");
    }
}

function switchURI() public {
    // TODO: Limit to contract owner
    nftMetadata = nftMetadata == NFTMetadata.BAYC ? NFTMetadata.DOODLES : NFTMetadata.BAYC;
}
```

</details>

<br/>

Deploy, mint some NFTs, and call `tokenURI` to find the information for token number 1. You should get:

```text
https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1
```

This links to the metadata json file for the first Bored Ape:

```json
{
  "image": "ipfs://QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi",
  "attributes": [
    {
      "trait_type": "Mouth",
      "value": "Grin"
    },
    {
      "trait_type": "Clothes",
      "value": "Vietnam Jacket"
    },
    {
      "trait_type": "Background",
      "value": "Orange"
    },
    {
      "trait_type": "Eyes",
      "value": "Blue Beams"
    },
    {
      "trait_type": "Fur",
      "value": "Robot"
    }
  ]
}
```

IPFS links don't work natively directly in the browser, but you can see the image here:

https://ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi/

Now, call your `switchURI` function and then call `tokenURI` again for token 1.

Now, you'll get a new link for metadata:

```text
https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/1
```

Which contains the metadata for Doodle 1 instead of BAYC 1:

```json
{
  "image": "ipfs://QmTDxnzcvj2p3xBrKcGv1wxoyhAn2yzCQnZZ9LmFjReuH9",
  "name": "Doodle #1",
  "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian\u2013based illustrator, designer, animator and muralist.",
  "attributes": [
    {
      "trait_type": "face",
      "value": "holographic beard"
    },
    {
      "trait_type": "hair",
      "value": "white bucket cap"
    },
    {
      "trait_type": "body",
      "value": "purple sweater with satchel"
    },
    {
      "trait_type": "background",
      "value": "grey"
    },
    {
      "trait_type": "head",
      "value": "gradient 2"
    }
  ]
}
```

Your robot ape is now a person with a rainbow beard!

https://ipfs.io/ipfs/QmTDxnzcvj2p3xBrKcGv1wxoyhAn2yzCQnZZ9LmFjReuH9

---

## Conclusion

In this lesson, you've learned how to use OpenZeppelin's ERC-721 implementation to create your own NFT contract. You've also learned how NFT metadata is stored, and that it is not necessarily immutable.

---

[OpenZeppelin]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol
[Coinbase NFT]: https://nft.coinbase.com/
[URI]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
[stored on IPFS]: https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/
[BAYC]: https://nft.coinbase.com/collection/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d
[CryptoPunks]: https://nft.coinbase.com/collection/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb
[Doodles]: https://nft.coinbase.com/collection/ethereum/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e
[uses IPFS]: https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/
