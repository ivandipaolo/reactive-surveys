import { Contract } from "@ethersproject/contracts"
import QUIZ_ABI from "@/abis/QUIZ.json"
import { useEffect, useState } from "react"
import { useWalletConnection } from "@/hooks/useWalletConnection"
import { useQuizContract } from "@/hooks/useQuizContract"

export const QuizBalance: React.FC = (): JSX.Element => {
  const { balance } = useQuizContract()
  const { active, account, library, chainId } = useWalletConnection()

  return (
    <div>
      {(balance !== '' && chainId === 5) && <p className="font-semibold bg-white bg-opacity-30 rounded-sm px-2 py-1">{balance} $QUIZ</p>}
    </div>
  )
}
