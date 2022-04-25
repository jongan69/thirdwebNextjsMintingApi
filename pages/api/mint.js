import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export default async function mint(req, res){

// Address of the wallet you want to mint the NFT to, the NFT's metadata & Supply
  const { mintToAddress, metadata, supply } = req.body
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const metadataWithSupply = {
    metadata,
    supply, 
  }

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY,
      ethers.getDefaultProvider(process.env.NEXT_PUBLIC_RPC_URL),
    )
  );

  const editionAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  const edition = sdk.getEdition(editionAddress);
  console.log('NFT MINT INPUT: ', mintToAddress, metadata, supply)

    while(delay(20000)) {
      try {
        const tx = await edition.mintTo(mintToAddress, metadataWithSupply);
        res.status(200).json({ mint_NFT: tx })
        const receipt = tx.receipt; // the transaction receipt
        const tokenId = tx.id; // the id of the NFT minted
        const nft = await tx.data(); // (optional) fetch details of minted NFT(nft);
        if (nft) {
          console.log('NFT MINT OUTPUT: ', receipt, tokenId, nft)
        }
  
      } catch (error) {
        console.log(error);
      }
    }
    console.log('Minting timed out ( < 20s )')
}