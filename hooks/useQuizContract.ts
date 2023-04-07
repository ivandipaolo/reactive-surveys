import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import QuizAbi from '@/abis/QUIZ.json'
import { useWalletConnection } from "@/hooks/useWalletConnection"

export const useQuizContract = () => {
  const [cooldownPeriod, setCooldownPeriod] = useState(0)
  const [balance, setBalance] = useState<string>('')

  const { active, library, account } = useWalletConnection()
  const contractAddress = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'
  const contractABI = QuizAbi
  
  useEffect(() => {
    const getCooldownPeriod = async () => {
      if (active) {
        const contract = new ethers.Contract(contractAddress, contractABI, library)
        console.log(account);
        try {
          const period = await contract.cooldownSeconds()
          console.log(period);
          setCooldownPeriod(Number(period))        
        } catch (error) {
          console.log(error)
        }
      }
    }
    const getQuizBalance = async () => { 
      if (active) {
        const contract = new ethers.Contract(contractAddress, contractABI, library.getSigner())
        try {
          const balance = await contract.balanceOf(account)
          setBalance(ethers.formatEther(balance).toString())
        } catch (error) {
          console.log(error)
        }
      }
    }
    getQuizBalance()
    getCooldownPeriod()
  }, [active, library])
  


  const setCooldown = async (seconds: number) => {
    const contract = new ethers.Contract(contractAddress, contractABI, library.getSigner())
    try {
      const tx = await contract.setCooldown(seconds)
      await tx.wait()
    } catch (error) {
      console.log(error)
    }
  }
  
  const submitSurvey = async (surveyId: number, answerIds: number[]) => {
    const contract = new ethers.Contract(contractAddress, contractABI, library.getSigner())
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
