import React from "react";

export default function AnswerButtons(props) {
  const { answerState, answer,answerIndex,questionIndex } = props;

  const buttonStyle = {
    backgroundColor: `${props.answer.isClicked ? "#D6DBF5" : "#FFFF"}`,
    border: `${props.answer.isClicked ? "none" : "2px solid #4D5B9E"}`,
    cursor: "pointer",
  };

  let answerStateButtonStyle = {};

  if (answer.isClicked && answer.isCorrect) {
    answerStateButtonStyle = {
      border: "none",
      backgroundColor: "#94D7A2",
    };
  } else if (answer.isClicked && !answer.isCorrect) {
    answerStateButtonStyle = {
      border: "none",
      backgroundColor: "#F8BCBC",
    };
  } else {
    answerStateButtonStyle = {
      border: "2px solid grey",
      backgroundColor: "white",
      color: "grey",
      opacity: "0.7",
    };
  }

  return (
    <>
      <button
      id={`answer_button_${questionIndex}_${answerIndex}`}
        className="answerButton"
        disabled={!answerState}
        style={answerState ? buttonStyle : answerStateButtonStyle}
        onClick={() => props.handleClick(props.id)}
      >
        {props.answer.answer}
      </button>
    </>
  );
}
