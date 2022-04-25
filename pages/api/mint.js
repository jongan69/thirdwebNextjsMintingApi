import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export default async function mint(req, res){

  
  const { mintToAddress, metadata } = req.body

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
      // Address of the wallet you want to mint the NFT to
      const metadataWithSupply = {
        metadata,
        supply: 1000, // The number of this NFT you want to mint
      }
      
      const tx = await edition.mintTo(mintToAddress, metadataWithSupply);
      const receipt = tx.receipt; // the transaction receipt
      const tokenId = tx.id; // the id of the NFT minted
      const nft = await tx.data(); // (optional) fetch details of minted NFT(nft);
      console.log('DATA OUTPUT: ', receipt, tokenId, nft)

      if (nft?.metadata.image) {
        res.status(200).json({ image: nft?.metadata })
      }

    } catch (error) {
      console.log(error);
    }
}