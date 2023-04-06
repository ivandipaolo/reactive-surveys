import { useWeb3React } from "@web3-react/core"
import { injected } from "@/components/wallet/connectors";
import { useEffect } from "react";
import MetaMaskLogo from "@/public/metamask-fox.svg"
import Image from "next/image";
import { QuizBalance } from "./QuizBalance";
import SwitchNetwork from "./SwitchNetwork";

export const ConnectMetaMask: React.FC = () =>  {
  const { active, account, activate, deactivate, chainId, library } = useWeb3React();

  async function connect () {
    try {
      await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }
  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', 'false')
    } catch (ex) {
      console.log(ex)
    }
  }

  const connectWalletOnPageLoad = async () => {
    if (localStorage?.getItem('isWalletConnected') === 'true') {
      try {
        await activate(injected)
        localStorage.setItem('isWalletConnected', 'true')
      } catch (ex) {
        console.log(ex)
      }
    }
  }

  function renderNetworkStatus() {
    if (chainId !== 5 && active) {
      return <SwitchNetwork />
    } else if (active) {
      return <p>Connected to Goerli Testnet with ChainId {chainId}</p>
    }
    return null
  }
  
  useEffect(() => {
    activate(injected)
    connectWalletOnPageLoad()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-white leading-9">
      <div className="flex flex-row text-center items-center justify-center gap-5 text-white">
        {active && <QuizBalance/>}
        <button onClick={() => { active ? disconnect() : connect()}} className="flex flex-row items-center justify-center py-2 text-lg font-bold text-white rounded-lg w-40 bg-blue-600 hover:bg-blue-800">
          {active ? 'Disconnect' : 'Connect'}
          <Image className="p-2" width="40" height="40" src={MetaMaskLogo} alt="logo"/>
        </button>
      </div>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
      {renderNetworkStatus()}
    </div>
  )
}