import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import QUIZ_ABI from "@/abis/QUIZ.json"
import { useEffect, useState } from "react";

type Balance = string;

export const QuizBalance: React.FC = (): JSX.Element => {
  const { active, account, library } = useWeb3React();
  const [balance, setBalance] = useState<Balance>('');

  useEffect((): void => {
    if (active && account && library) {
      const quizContract = new Contract('0x437eF217203452317C3C955Cf282b1eE5F6aaF72', QUIZ_ABI, library);
      quizContract.balanceOf(account).then((balance: Balance): void => {
        setBalance(balance.toString());
      }).catch((err: Error): void => {
        console.log(err);
      });
    }
  }, [active, account, library]);

  return (
    <div>
      {balance !== '' && <p>QUIZ Balance: {balance}</p>}
    </div>
  );
}
