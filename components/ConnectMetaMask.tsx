import { useWalletConnection } from "@/hooks/useWalletConnection";
import { QuizBalance } from "@/components/QuizBalance";
import SwitchNetwork from "@/components/SwitchNetwork";
import { Tooltip } from "antd";

export const ConnectMetaMask: React.FC = () => {
  const {
    active,
    account,
    chainId
  } = useWalletConnection();

  function renderNetworkStatus() {
    if (chainId !== 5 && active) {
      return <SwitchNetwork />;
    } else if (active) {
      return (
        <p className="leading-3 text-xs">
          Connected to Goerli Testnet with ChainId {chainId}
        </p>
      );
    }
    return null;
  }
  return (
    <div className="flex flex-col items-end justify-center text-white leading-6">
      <div className="flex flex-row text-center items-center justify-center gap-5 text-white">
        {active && <QuizBalance />}
      </div>
      {active ? (
        <div className="flex flex-row items-center text-center">
          <p>Wallet: </p>
          <Tooltip placement="leftTop" title={account}/>
          <span><b>{account?.substring(0,8)}...{account?.substring(36,42)}</b></span>
        </div>
      ) : (
        <span>Not connected</span>
        )}
        {renderNetworkStatus()}
    </div>
  );
};
