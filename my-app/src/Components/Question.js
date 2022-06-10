import React from "react";
import AnswerButton from "./AnswerButton";

export default function Question(props) {
  const { questionText, answers, answerState, updateClickState } = props;
  const [buttons, setButtons] = React.useState(answers);

  function handleClick(id) {
    updateClickState(id);
    setButtons((prev) => {
      let result = [];
      for (let i = 0; i < prev.length; i++) {
        if (prev[i].id === id) {
          result.push({ ...prev[i], isClicked: true });
        } else {
          result.push({ ...prev[i], isClicked: false });
        }
      }
      return result;
    });
  }

  const buttonList = buttons.map((each) => {
    return (
      <AnswerButton
        key={each.id}
        id={each.id}
        answer={each}
        handleClick={handleClick}
        answerState={answerState}
      />
    );
  });

  return (
    <div className="question_container">
      <h1 className="question_title">{questionText}</h1>
      <div className="answers_container">{buttonList}</div>
    </div>
  );
}
