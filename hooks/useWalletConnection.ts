import { useWeb3React } from "@web3-react/core"
import { injected } from "@/components/wallet/connectors"
import { useEffect } from "react"

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

  useEffect(() => {
    connectWalletOnPageLoad()
  }, [])

  return {
    active,
    account,
    chainId,
    connectWallet,
    disconnectWallet,
    library
  }
}
