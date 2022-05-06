$(document).ready(function () {
  $("#myModal").modal("show");
});

//Variable Declaration Y DOM

const question = document.querySelector("#question");
const answers = Array.from(document.querySelectorAll(".answer-text"));
const questionCounterText = document.querySelector(".counter");
const scoreText = document.querySelector(".score");
const startButton = document.querySelector(".start-button");

let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let score = 0;
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
let avaliableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };
      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answers = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answers - 1,
        0,
        loadedQuestion.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
    // startGame();
  })
  .catch((err) => {
    console.error(err);
  });
//Funcion para empezar el Juego
startGame = () => {
  questionCounter = 0;
  score = 0;

  avaliableQuestions = [...questions];
  console.log(avaliableQuestions);
  getNewQuestion();
};

const getNewQuestion = () => {
  if (avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    alert("FIN DEL JUEGO");
    return;
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    //accede a atributos especiales
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  //usamos splice para sacar la pregunta que hemos usado.
  avaliableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

startButton.addEventListener("click", startGame);

//funcion que reconoce el click del elmento de cada respuesta
choices.forEach((choice) => {
  choice.addEventListener("click", (argument) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = argument.target; //value?
    const selectedAnswer = selectedChoice.dataset["number"];
    //cambiar a correcto la clase y aplicarla (incorrecto default)
    const classToAplly = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToAplly = "correct";
    }
    if (classToAplly == "correct") {
      incrementScore(CORRECT_BONUS);
    }
    //anyadir y quitar la clase em 2 segundos
    selectedChoice.parentElement.classList.add(classToAplly);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToAplly);
      getNewQuestion();
    }, 2000);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
