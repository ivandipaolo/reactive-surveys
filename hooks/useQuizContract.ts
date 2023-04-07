import QuizAbi from '@/abis/QUIZ.json'
import { ethers, Contract } from 'ethers'
import { useState, useEffect } from 'react'
import { useWalletConnection } from "@/hooks/useWalletConnection"

interface QuizContract {
  cooldownPeriod: number
  balance: string
  setCooldown: (seconds: number) => Promise<void>
  submitSurvey: (surveyId: number, answerIds: number[]) => Promise<void>
}

export const useQuizContract = (): QuizContract => {
  const [cooldownPeriod, setCooldownPeriod] = useState<number>(0)
  const [balance, setBalance] = useState<string>('')

  const { active, library, account } = useWalletConnection()
  const contractAddress = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'
  const contractABI = QuizAbi
  
  useEffect(() => {
    getQuizBalance()
    getCooldownPeriod()
  }, [active, library, account])
  
  const getCooldownPeriod = async (): Promise<void> => {
    if (active && account) {
      const contract = new Contract(contractAddress, contractABI, library)
      try {
        const lastSubmittal = await contract.lastSubmittal(account)
        setCooldownPeriod(Number(lastSubmittal))        
      } catch (error) {
        console.log(error)
      }
    }
  }
  const getQuizBalance = async (): Promise<void> => { 
    if (active) {
      const contract = new Contract(contractAddress, contractABI, library.getSigner())
      try {
        const balance = await contract.balanceOf(account)
        setBalance(ethers.formatEther(balance).toString())
      } catch (error) {
        console.log(error)
      }
    }
  }

  const setCooldown = async (seconds: number): Promise<void> => {
    const contract = new Contract(contractAddress, contractABI, library.getSigner())
    try {
      const tx = await contract.setCooldownSeconds(seconds)
      await tx.wait()
    } catch (error) {
      console.log(error)
    }
  }
  
  const submitSurvey = async (surveyId: number, answerIds: number[]): Promise<void> => {
    const contract = new Contract(contractAddress, contractABI, library.getSigner())
    try {
      const tx = await contract.submit(surveyId, answerIds)
      await tx.wait()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    cooldownPeriod,
    balance,
    setCooldown,
    submitSurvey,
  }
}
