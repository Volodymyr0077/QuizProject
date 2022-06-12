import Question from "./Components/Question";
import Intro from "./Components/Intro";
import Data from "./data";
import React from "react";

import { nanoid } from "nanoid";

function App() {


  const [data, setData] = React.useState(Data);
  const [startGame, setStartGame] = React.useState(true);
  const [answerState, setAnswerState] = React.useState(true);
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=3&difficulty=easy")
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }, [answerState]);

  console.log(data);

  const result = data.map((each) => {
    return {
      id: nanoid(),
      question: each.question,

      answers: each.incorrect_answers.map((every) => {
        return {
          id: nanoid(),
          answer: every,
          isCorrect: false,
          isClicked: false,
        };
      }),
    };
  });

  for (let i = 0; i < Data.length; i++) {
    result[i].answers.splice(Math.floor(Math.random() * result.length + 1), 0, {
      id: nanoid(),
      answer: data[i].correct_answer,
      isCorrect: true,
      isClicked: false,
    });
  }

  const [questions, setQuestions] = React.useState(result);
  const [rightAnswers, setRightAnswers] = React.useState(0);

  function generateQuestions() {
    return questions.map((each,i) => {
      return (
        <Question
          key={each.id}
          id={each.id}
          questionText={each.question}
          answers={each.answers}
          answerState={answerState}
          updateClickState={updateClickState}
          questionIndex={i}
        />
      );
    });
  }

  function updateClickState(id) {
    setQuestions((prev) => {
      let result = prev;
      for (let i = 0; i < prev.length; i++) {
        for (let j = 0; j < prev[i].answers.length; j++) {
          if (prev[i].answers[j].id === id) {
            prev[i].answers[j].isClicked = true;

            for (let k = 0; k < prev[i].answers.length; k++) {
              if (k === j) {
                continue;
              }
              prev[i].answers[k].isClicked = false;
            }
          }
        }
      }
      return result;
    });
  }

  function checkAnswer() {
    setAnswerState((prev) => !prev);

    setRightAnswers(() => {
      let resultAnswer = 0;
      for (let i = 0; i < questions.length; i++) {
        for (let j = 0; j < questions[i].answers.length; j++) {
          if (
            questions[i].answers[j].isClicked &&
            questions[i].answers[j].isCorrect
          ) {
            resultAnswer++;
          }
        }
      }

      return resultAnswer;
    });
  }
  function playAgain() {
    setQuestions(() => result);
    setAnswerState((prev) => !prev);
  }

  function startGameonClick() {
    setStartGame((prev) => !prev);
  }

  return (
    <div className="App">
      {startGame && <Intro startGameOnClick={startGameonClick} />}
      {generateQuestions()}
      <div className="resultContainer">
        {!answerState && (
          <h1 className="question_title">
            Valdek scored {rightAnswers}/{data.length} correct answers
          </h1>
        )}
        {answerState && (
          <button id="check_answer" onClick={checkAnswer} className="checkAnswersButton">
            Check answers
          </button>
        )}
        {!answerState && (
          <button id="play_again" onClick={playAgain} className="playAgainButton">
            Play again
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
