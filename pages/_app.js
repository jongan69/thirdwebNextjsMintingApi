import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  return (
    <ThirdwebProvider
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
          },
        },
        readonlySettings: {
          chainId: ChainId.Rinkeby,
          rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
        },
      }}
      desiredChainId={ChainId.Rinkeby}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
