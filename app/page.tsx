'use client'

import InitialAnnouncement from "@/components/InitialAnnouncement";
import SurveyTemplate from "@/components/survey/SurveyTemplate";
import { useState } from "react";


export default function Page() {
  const [startedQuiz, setStartedQuiz] = useState<Boolean>(false)  
  return (
    <div>
      {
        startedQuiz 
        ? <SurveyTemplate></SurveyTemplate>
        : <InitialAnnouncement key="initial-Ann" setStartedQuiz={setStartedQuiz}/>
      }
      
    </div>
  );
}