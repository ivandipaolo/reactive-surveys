'use client'

import InitialAnnouncement from "@/components/InitialAnnouncement";
import SurveyTemplate from "@/components/survey/SurveyTemplate";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useState } from "react";


export default function Page() {
  const [startedQuiz, setStartedQuiz] = useState<Boolean>(false)
  const { active } = useWalletConnection()

  return (
    <div>
      {
        startedQuiz && active 
        ? <SurveyTemplate></SurveyTemplate>
        : <InitialAnnouncement key="initial-Ann" setStartedQuiz={setStartedQuiz}/>
      }
      
    </div>
  );
}