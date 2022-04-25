import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "../styles/globals.css";

// ChainId.Rinkeby = 4
function MyApp({ Component, pageProps }) {

  return (
    <ThirdwebProvider
      sdkOptions={{
        readonlySettings: {
          chainId: 4,
          rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
        },
      }}
      desiredChainId={4}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
