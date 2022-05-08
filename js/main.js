$(document).ready(function () {
  $("#myModal").modal("show");
});

//Variable Declaration Y DOM

const questionContainer = document.querySelector("#question");
const answersContainer = Array.from(
  document.querySelectorAll(".answer-container")
);
const questionCounterText = document.querySelector("#counter");
const scoreText = document.querySelector("#score");
const startButton = document.querySelector(".start-button");
const modal = document.querySelector(".modal-body");
const buttonNext = document.querySelector("#btn-next");

let acceptingAnswers = true;
let score = 0;
let userAnswers = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
let avaliableQuestions = [];

const getQuestions = async () => {
  return fetch(
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
  )
    .then((res) => res.json())
    .then((res) => res.results);
};

//Funcion para empezar el Juego
const startGame = async () => {
  score = 0;
  userAnswers = [];
  updateScore();
  const questions = await getQuestions();

  printQuestion(questions[0]);
  buttonNext.onclick = () => {
    if (userAnswers.length >= questions.length) {
      endGame();
      return;
    }

    printQuestion(questions[userAnswers.length]);
  };
};

//funcion guardar en local storage
const endGame = () => {
  const globalScore = JSON.parse(localStorage.getItem("globalScore")) || [];
  globalScore.push(score);
  localStorage.setItem("globalScore", JSON.stringify(globalScore));
  showFinalScore(globalScore);
};

const validateAnswer = (question, answer) => {
  if (answer === question.correct_answer) {
    score++;
    return true;
  }
  return false;
};

const removeColors = () => {
  answersContainer.forEach((eachContainer) =>
    eachContainer.classList.remove("correct", "incorrect")
  );
};

const printQuestion = (q) => {
  removeColors();
  updateScore();
  questionContainer.innerHTML = q.question;
  const answers = [...q.incorrect_answers];
  answers.splice(Math.floor(Math.random() * 4), 0, q.correct_answer);
  answers.forEach((answer, i) => {
    answersContainer[i].innerHTML = answer;
    answersContainer[i].onclick = () => {
      userAnswers.push(answer);
      answersContainer.forEach(
        (eachContainer) => (eachContainer.onclick = undefined)
      );

      const isCorrect = validateAnswer(q, answer);

      if (isCorrect) {
        answersContainer[i].classList.add("correct");
        return;
      }
      answersContainer[i].classList.add("incorrect");
    };
  });
};

const updateScore = () => {
  scoreText.innerText = score;
  questionCounterText.innerText = userAnswers.length + 1;
};

const showFinalScore = (globalScore) => {
  console.log(globalScore);
  modal.innerText = `Felicidades tu Puntuacion es ${score}, volver a Jugar?`;
  $("#myModal").modal("show");
  startGame();
};

startButton.addEventListener("click", startGame);
