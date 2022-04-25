# thirdweb Minting Edition Contract NFTs using Nextjs API

## Description

This project shows you how to make a Nextjs Endpoint for minting and getting NFTs from thirdweb `edition` contract

### Technologies Used

- Thirdweb
- Next.js
- Openzeppelin
- Rinkbey

### thirdweb SDK Functionality Used

- edition.mintTo(mintToAddress, metadataWithSupply);

### Running the project

- `yarn install`
- `yarn dev`

`
.env.local:
NEXT_PUBLIC_RPC_URL="https://rinkeby-light.eth.linkpool.io/"
PRIVATE_KEY=<Private Key of Wallet that signed Contract>
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=<thirdweb Edition Contract address>
`
### API Calls

- POST: Posts an NFT collection to the contract

Example Body:  

{
    "image": {
        "name": "Bed2",
        "description": "No",
        "image": "https://gateway.ipfscdn.io/ipfs/QmbSDPPMhEp5od6pi6syEtKotJjyjvopv9wS8rCYvNqnvp/0.png",
        "external_url": "https://gateway.ipfscdn.io/ipfs/QmbSDPPMhEp5od6pi6syEtKotJjyjvopv9wS8rCYvNqnvp/1.pdf",
        "id": {
            "type": "BigNumber",
            "hex": "0x02"
        },
        "uri": "https://gateway.ipfscdn.io/ipfs/QmUa6bkpZRDyYWjugp4VvKLjgndkQNvcBuiqWSLdNJ7P9b/0",
        "background_color": "",
        "attributes": [
            {
                "value": "soft",
                "trait_type": "Bed"
            }
        ]
    }
}


EndPoint: https://thirdweb-nextjs-minting-1nhadqwxi-jongan69.vercel.app/api/mint

Etherscan: https://rinkeby.etherscan.io/address/0x4f29FbeE650c3eA006a174547a2F4e74c02a2Be5

- GET: Returns all NFT's in contract

EndPoint: https://thirdweb-nextjs-minting-1nhadqwxi-jongan69.vercel.app/api/getNfts


### Resources

- [Official Thirdweb Docs](https://docs.thirdeb.com)
- [Community Discord](https://discord.gg/thirdweb)
# thirdwebNextjsMintingApi
