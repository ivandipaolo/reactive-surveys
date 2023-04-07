import Image from "next/image";
import MetaMaskLogo from "@/public/metamask-fox.svg"
import { useWalletConnection } from "@/hooks/useWalletConnection";

const ConnectButton = () => {
  const {
    active,
    connectWallet,
    disconnectWallet,
  } = useWalletConnection()

  return (
    <button onClick={() => (active ? disconnectWallet() : connectWallet())} className="flex flex-row items-center justify-center py-2 text-lg font-bold text-white rounded-lg w-40 bg-blue-600 hover:bg-blue-800">
      {active ? "Disconnect" : "Connect"}
      <Image className="p-2" width="40" height="40" src={MetaMaskLogo} alt="logo" />
    </button>
  );
};

export default ConnectButton