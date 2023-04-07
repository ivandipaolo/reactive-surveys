import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import QuizAbi from '@/abis/QUIZ.json'

export const useQuizContract = () => {
  const [cooldownPeriod, setCooldownPeriod] = useState(0)
  const { active, library } = useWeb3React()
  const contractAddress = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'
  const contractABI = QuizAbi
  const contract = new ethers.Contract(contractAddress, contractABI, library.getSigner())

  useEffect(() => {
    const getCooldownPeriod = async () => {
      if (active) {
        const period = await contract.cooldownSeconds()
        setCooldownPeriod(period.toNumber())
      }
    }

    getCooldownPeriod()
  }, [active, library])

  const setCooldown = async (seconds: number) => {
    const tx = await contract.setCooldown(seconds)
    await tx.wait()
  }

  const submitSurvey = async (surveyId: number, answerIds: number) => {
    const tx = await contract.submit(surveyId, answerIds)
    await tx.wait()
  }

  return {
    cooldownPeriod,
    setCooldown,
    submitSurvey,
  };
};
