import { types } from "mobx-state-tree"
import SurveyAnswerModel from "./SurveyAnswerModel"
import QuestionModel from "./QuestionModel"
import { useQuizContract } from "@/hooks/useQuizContract"

const SurveyQuestionsModel = types
  .model({
    questions: types.array(QuestionModel),
    currentQuestionIndex: types.number,
    isSurveyFinished: types.boolean,
    surveyAnswers: types.array(SurveyAnswerModel),
    currentAnswer: types.number,
    currentQuestionLifetime: types.number,
  })
  .actions((self) => ({
    handleOptionClicked(value:string, index:number){
      self.surveyAnswers.push({
        answerText: value ?? "N/A",
        answerIndex: index,
      })
      self.currentAnswer = index
      self.currentQuestionLifetime = 6
    },
    handleCountdownFinished() {
      if (self.surveyAnswers.length < self.currentQuestionIndex + 1){
        self.surveyAnswers.push({
          answerText: "No answer given.",
          answerIndex: -1,
        })
      }
      console.log(self.currentQuestionIndex);
      if (self.currentQuestionIndex < self.questions.length - 1) {
        self.currentQuestionIndex = self.currentQuestionIndex + 1
        self.currentAnswer = -1
        self.currentQuestionLifetime = self.questions[self.currentQuestionIndex].lifetimeSeconds
      } else {
        self.isSurveyFinished = true
      }
      return;
    },
    finishedSurvey() {
      const { submitSurvey } = useQuizContract()
      submitSurvey(
        1,
        self.surveyAnswers.map((answer) => answer.answerIndex)
      )
    }
  }))


export default SurveyQuestionsModel;