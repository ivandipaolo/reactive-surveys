import { useWeb3React } from "@web3-react/core"
import { injected } from "@/components/wallet/connectors"
import { useEffect } from "react"
import { Network } from "@/types"

export const useWalletConnection = () => {
  const { active, account, activate, deactivate, chainId, library } = useWeb3React()

  const connectWallet = async () => {
    try {
      await activate(injected)
      localStorage.setItem("isWalletConnected", "true")
    } catch (error) {
      console.log(error)
    }
  }

  const disconnectWallet = async () => {
    try {
      deactivate()
      localStorage.setItem("isWalletConnected", "false")
    } catch (error) {
      console.log(error)
    }
  }

  const connectWalletOnPageLoad = async () => {
    if (localStorage?.getItem("isWalletConnected") === "true") {
      try {
        await activate(injected)
      } catch (error) {
        console.log(error)
      }
    }
  }

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

  useEffect(() => {
    connectWalletOnPageLoad()
  }, [])

  return {
    active,
    account,
    chainId,
    connectWallet,
    disconnectWallet,
    library,
    changeNetwork
  }
}
