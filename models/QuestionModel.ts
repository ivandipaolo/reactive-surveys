import { types } from "mobx-state-tree"

const QuestionModel = types.model({
  text: types.string,
  image: types.string,
  options: types.array(
    types.model({
      text: types.string,
    })
  ),
  lifetimeSeconds: types.number,
})

export default QuestionModel