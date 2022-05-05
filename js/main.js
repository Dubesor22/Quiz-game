$(document).ready(function () {
  $("#myModal").modal("show");
});

//Variable Declaration Y DOM

const question = document.querySelector("#question");
const answers = Array.from(document.querySelectorAll(".answer-text"));
const questionCounterText = document.querySelector(".counter");
const scoreText = document.querySelector(".score");
const startButton = document.querySelector(".start-button");

// let [, { correct_answer }] = questions;
// console.log(correct_answer);

let questionCounter;
let score;
const MAX_QUESTIONS = 10;

//Funcion para empezar el Juego
startGame = (asd) => {
  questionCounter = 0;
  score = 0;

  avaliableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);
  console.log(avaliableQuestions);
  console.log();
  getNewQuestion();
};

//funcion que randomiza una pregunta del STACK de todas
const getRandomQuestions = (arr, n) => {
  console.log(arr);
  let len = arr.length;
  if (n > len) {
    throw new RangeError(
      "la Funcion: mas elementos cogidos de los disponibles"
    );
  }
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return (selected = shuffled.slice(0, n));
};

const getNewQuestion = () => {
  if (avaliableQuestions.length === 0) {
    alert("FIN DEL JUEGO");
    return;
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter} / 10`;
  currentQuestion = avaliableQuestions[0];

  question.innerText = currentQuestion.question;
  // avaliableQuestions.shift();
  // getNewQuestion();
};

startButton.addEventListener("click", startGame);
const getQuestions = async () => {
  const questions = await axios
    .get("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then((res) => {
      console.log(res.data.results);
      const questionsObject = res.data.results;
      getRandomQuestions(questionsObject);
      startGame(questionsObject);
    })
    .catch((err) => console.error(err));
};
getQuestions();
