import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export default async function mint(req, res) {
      // Address of the wallet you want to mint the NFT to, the NFT's metadata & Supply
      const { mintToAddress, metadata, supply } = req.body
      const delay = ms => new Promise(res => setTimeout(res, ms));
      const metadataWithSupply = {
        metadata,
        supply,
      }
      console.log('NFT MINT INPUT: ', mintToAddress, metadata, supply)

  switch (req.method) {
    case "GET": {
      return res.status(500).json({ message: "This API endpint is POST only" })
    }

    case "POST": {
      console.log('Will attempt to mint the NFT in 30s or less')
      const sdk = new ThirdwebSDK(
        new ethers.Wallet(
          process.env.PRIVATE_KEY,
          ethers.getDefaultProvider(process.env.NEXT_PUBLIC_RPC_URL),
        )
      );

      const editionAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
      const edition = sdk.getEdition(editionAddress);
      while (delay(30000)) {
        try {
          const tx = await edition.mintTo(mintToAddress, metadataWithSupply);
          const receipt = tx.receipt; // the transaction receipt
          const tokenId = tx.id; // the id of the NFT minted
          // const nft = await tx.data(); // (optional) fetch details of minted NFT(nft);
          if (await tx.data()) {
            console.log('NFT MINT OUTPUT: ', receipt, tokenId, tx.data())
            res.status(200).json({ mint_NFT: tx })
            return 
          }
        } catch (error) {
          console.log('Something happened, contract post may have timed out',error);
        }

      }
    }
  }
}