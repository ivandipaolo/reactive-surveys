import { types } from "mobx-state-tree"


const SurveyAnswerModel = types.model({
  answerText: types.string,
  answerIndex: types.number,
})


export default SurveyAnswerModel