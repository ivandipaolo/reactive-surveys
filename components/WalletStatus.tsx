import { useWalletConnection } from '@/hooks/useWalletConnection'
import { Button, Result, Statistic } from 'antd'
import ConnectButton from '@/components/ConnectButton'
import { useQuizContract } from '@/hooks/useQuizContract'

const WalletStatus: React.FC = () => {
  const { cooldownPeriodEnded, remainingTime } = useQuizContract()
  const { active, account, chainId, changeNetwork } = useWalletConnection()
  const { Countdown } = Statistic

  if (!active || !account) {
  return ( 
    <Result
    status="warning"
    title="Please log-in into your MetaMask account to continue."
    subTitle="Click the button bellow to log-in into your MetaMask Account"
    extra={[
      <div key="connectDiv" className='flex justify-center items-center'>
        <ConnectButton/>
      </div>
    ]}
    />
    )
  }
  
  if (chainId !== 5) {
    return <Result
      status="error"
      title="Your current network is not Goerli Testnet Network"
      subTitle="Click the button bellow to change to Goerli Network"
      extra={[
        <Button key="changeNetwork" onClick={async () => await changeNetwork()}>Change Network</Button>
      ]}
    />;
  }

  if (!cooldownPeriodEnded) {
    return <Result
      status="info"
      title="You have to wait until starting a new survey!"
      subTitle="The following button will be available to click after you complete your waiting time"
      extra={[
          <Countdown
            key="remainingTime"
            title="Remaining time:"
            value={remainingTime}
            format="HH:mm:ss"
          />,
          <Button 
            key="startSurvey"
            disabled>
              Continue Waiting
          </Button>
      ]}
    />
  }

  return (<></>)
}
export default WalletStatus