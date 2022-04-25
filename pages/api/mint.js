import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export default async function mint(req, res){

  // Address of the wallet you want to mint the NFT to & Supply
  const { mintToAddress, metadata, supply } = req.body

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY,
      ethers.getDefaultProvider(process.env.NEXT_PUBLIC_RPC_URL),
    )
  );
  const editionAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  const edition = sdk.getEdition(editionAddress);
  console.log('DATA RECIECVED WAS: ', mintToAddress, metadata)

    try {
      const metadataWithSupply = {
        metadata,
        supply, 
      }
      
      const tx = await edition.mintTo(mintToAddress, metadataWithSupply)
      .then(async(tx) => {
        const receipt = tx.receipt; // the transaction receipt
        const tokenId = tx.id; // the id of the NFT minted
        const nft = await tx.data(); // (optional) fetch details of minted NFT(nft);
        console.log('DATA OUTPUT: ', receipt, tokenId, nft)
        if (nft) {
          res.status(200).json({ NFT_MINTED: nft?.metadata })
        } else {
          res.status(200).json({ message: `Nft is being minted to contract ${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}` })
        }
      })

    } catch (error) {
      console.log(error);
    }
}