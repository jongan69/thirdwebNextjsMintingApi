import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export default async function getNfts(req, res) {

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY,
      ethers.getDefaultProvider('https://rinkeby-light.eth.linkpool.io/')
    )
  );

  const editionAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  const editionDrop = sdk.getEditionDrop(editionAddress)

  try {
    const nft = await editionDrop?.getAll();
    if (nft) {
      res.status(200).json({ nftsFound: nft })
    }
  } catch (error) {
    console.log('Failed to get NFT. Error: ', error);
  }

}