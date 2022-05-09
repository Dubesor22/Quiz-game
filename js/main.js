$(document).ready(function () {
  $("#myModal").modal("show");
});

//Variable Declaration Y DOM

const questionContainer = document.querySelector("#question");
const answersContainer = Array.from(
  document.querySelectorAll(".answer-container")
);
const answerContainer = document.querySelector(".answer-container");
const questionCounterText = document.querySelector("#counter");
const scoreText = document.querySelector("#score");
const startButton = document.querySelector(".start-button");
const modalTittle = document.querySelector(".modal-title");
const modal = document.querySelector(".modal-body");
const modalFooter = document.querySelector(".modal-footer");
const buttonNext = document.querySelector("#btn-next");

let acceptingAnswers = true;
let score = 0;
let userAnswers = [];

let avaliableQuestions = [];

const getQuestions = async () => {
  try {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
    );
    return res.data.results;
  } catch (e) {
    console.error(e);
  }
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
  const correctId = Math.floor(Math.random() * 4);
  answers.splice(correctId, 0, q.correct_answer);
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
      } else {
        answersContainer[i].classList.add("incorrect");
      }
      answersContainer[correctId].classList.add("correct");
    };
  });
};

const updateScore = () => {
  scoreText.innerText = score;
  questionCounterText.innerText = userAnswers.length + 1;
};

const gameBarsChart = (games, id) => {
  const selectedGame = games.filter((eachGame) => eachGame.game !== null);

  const data = {
    labels: selectedGame.map((eachGame, index) => index + 1),
    datasets: [
      {
        data: selectedGame,
        borderColor: [
          "rgba(116, 72, 194, 1)",
          "rgba(33, 192, 215, 1)",
          "rgba(217, 158, 43, 1)",
          "rgba(205, 58, 129, 1)",
          "rgba(156, 153, 204, 1)",
          "rgba(225, 78, 202, 1)",
          "rgba(116, 72, 194, 1)",
          "rgba(33, 192, 215, 1)",
          "rgba(217, 158, 43, 1)",
          "rgba(205, 58, 129, 1)",
          "rgba(156, 153, 204, 1)",
          "rgba(225, 78, 202, 1)",
          "rgba(116, 72, 194, 1)",
          "rgba(33, 192, 215, 1)",
          "rgba(217, 158, 43, 1)",
          "rgba(205, 58, 129, 1)",
          "rgba(156, 153, 204, 1)",
          "rgba(225, 78, 202, 1)",
          "rgba(116, 72, 194, 1)",
          "rgba(33, 192, 215, 1)",
          "rgba(217, 158, 43, 1)",
          "rgba(205, 58, 129, 1)",
          "rgba(156, 153, 204, 1)",
          "rgba(225, 78, 202, 1)",
          "rgba(116, 72, 194, 1)",
          "rgba(33, 192, 215, 1)",
          "rgba(217, 158, 43, 1)",
          "rgba(205, 58, 129, 1)",
          "rgba(156, 153, 204, 1)",
          "rgba(225, 78, 202, 1)",
          "rgba(116, 72, 194, 1)",
          "rgba(33, 192, 215, 1)",
          "rgba(217, 158, 43, 1)",
          "rgba(205, 58, 129, 1)",
          "rgba(156, 153, 204, 1)",
          "rgba(225, 78, 202, 1)",
        ],
        backgroundColor: [
          "rgba(116, 72, 194)",
          "rgba(33, 192, 215)",
          "rgba(217, 158, 43)",
          "rgba(205, 58, 129)",
          "rgba(156, 153, 204)",
          "rgba(225, 78, 202)",
          "rgba(116, 72, 194)",
          "rgba(33, 192, 215)",
          "rgba(217, 158, 43)",
          "rgba(205, 58, 129)",
          "rgba(156, 153, 204)",
          "rgba(225, 78, 202)",
          "rgba(116, 72, 194)",
          "rgba(33, 192, 215)",
          "rgba(217, 158, 43)",
          "rgba(205, 58, 129)",
          "rgba(156, 153, 204)",
          "rgba(225, 78, 202)",
          "rgba(116, 72, 194)",
          "rgba(33, 192, 215)",
          "rgba(217, 158, 43)",
          "rgba(205, 58, 129)",
          "rgba(156, 153, 204)",
          "rgba(225, 78, 202)",
          "rgba(116, 72, 194)",
          "rgba(33, 192, 215)",
          "rgba(217, 158, 43)",
          "rgba(205, 58, 129)",
          "rgba(156, 153, 204)",
          "rgba(225, 78, 202)",
          "rgba(116, 72, 194)",
          "rgba(33, 192, 215)",
          "rgba(217, 158, 43)",
          "rgba(205, 58, 129)",
          "rgba(156, 153, 204)",
          "rgba(225, 78, 202)",
        ],
      },
    ],
  };

  const options = {
    legend: {
      display: false,
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 26,
          weight: "bold",
        },
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: true,
            stepSize: 1,
          },
        },
      ],

      xAxes: [
        {
          ticks: {
            display: true,
          },
        },
      ],
    },
  };

  new Chart(id, { type: "bar", data, options });
};

const printCharts = (games) => {
  gameBarsChart(games, "chart5");
};

const showFinalScore = (globalScore) => {
  modalTittle.innerText = "";

  const rub = () => {
    console.log("hola que pae loco");
    localStorage.clear();
    console.clear();
  };
  modalTittle.innerText = "Fin de Partida";
  modal.innerHTML = `<p>Felicidades tu Puntuacion es ${score}, volver a Jugar?</p></br>
  <figure>
  <h3>Resultados Totales</h3>
  <canvas id="chart5"></canvas>
</figure>`;
  modalFooter.innerHTML = `<button
  type="button"
  class="btn-final btn btn-secondary start-button"
  data-mdb-dismiss="modal"
>
  REINICIAR
</button>
<button
              type="button"
              class="btn-final btn btn-secondary delete-button"
              data-mdb-dismiss="modal" onclick="rub"
            >
              BORRAR PARTIDAS
            </button>`;
  $("#myModal").modal("show");
  const deleteButton = document.querySelector(".delete-button");
  deleteButton.addEventListener("click", rub);
  startGame();
  printCharts(globalScore);
};

startButton.addEventListener("click", startGame);
