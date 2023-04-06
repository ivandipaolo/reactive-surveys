import { Contract } from "@ethersproject/contracts";
import QUIZ_ABI from "@/abis/QUIZ.json"
import { useEffect, useState } from "react";
import { useWalletConnection } from "@/hooks/useWalletConnection";

type Balance = string;

export const QuizBalance: React.FC = (): JSX.Element => {
  const { active, account, library, chainId } = useWalletConnection();
  const [balance, setBalance] = useState<Balance>('');

  useEffect((): void => {
    if (active && account && library) {
      const quizContract = new Contract('0x437eF217203452317C3C955Cf282b1eE5F6aaF72', QUIZ_ABI, library)
      quizContract.balanceOf(account).then((balance: Balance): void => {
        setBalance(balance.toString())
      }).catch((err: Error): void => {
        console.log(err);
      });
    }
  }, [active, account, library])

  return (
    <div>
      {(balance !== '' && chainId === 5) && <p className="font-semibold bg-white bg-opacity-30 rounded-sm px-2 py-1">{balance} $QUIZ</p>}
    </div>
  );
}
