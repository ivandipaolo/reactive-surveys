import { Network } from "@/types";

const SwitchNetwork: React.FC = (): JSX.Element => {

  const goerliTestnetNetwork: Network = {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: "Goerli Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://goerli.infura.io/v3/0aee341c49d14f07b86fac7af12b7240"],
    blockExplorerUrls: ["https://goerli.etherscan.io/"]
  };

  const changeNetwork = async (): Promise<void> => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet detected");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...goerliTestnetNetwork,
          },
        ],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleNetworkSwitch = async () => {
    await changeNetwork()
  }

  return <button onClick={handleNetworkSwitch}>Switch to Goerli Testnet</button>;
};

export default SwitchNetwork;
