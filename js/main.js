$(document).ready(function () {
  $("#myModal").modal("show");
});

let questions = [
  {
    question:
      "How many games in the Crash Bandicoot series were released on the original Playstation?",
    correct_answer: "5",
    incorrect_answers: ["4", "3", "6"],
  },
  {
    question:
      "What is the name of &quot;Team Fortress 2&quot; update, in which it became Free-to-play?",
    correct_answer: "&Uuml;ber Update",
    incorrect_answers: [
      "Pyromania Update",
      "Mann-Conomy Update",
      "Engineer Update",
    ],
  },
  {
    question:
      "Which eSports team came first place in The International Dota 2 Championship 2016?",
    correct_answer: "Wings Gaming",
    incorrect_answers: ["Digital Chaos", "Evil Geniuses", "Fnatic"],
  },
  {
    question: "Which of these Starbound races has a Wild West culture?",
    correct_answer: "Novakid",
    incorrect_answers: ["Avian", "Human", "Hylotl"],
  },
  {
    question: "What year did the game &quot;Overwatch&quot; enter closed beta?",
    correct_answer: "2015",
    incorrect_answers: ["2013", "2011", "2016"],
  },
  {
    question: "Which Animal Crossing game was for the Nintendo Wii?",
    correct_answer: "Animal Crossing: City Folk",
    incorrect_answers: [
      "Animal Crossing: New Leaf",
      "Animal Crossing: Wild World",
      "Animal Crossing: Population Growing!",
    ],
  },
  {
    question: "In Night In The Woods, where does Gregg work?",
    correct_answer: "Snack Falcon",
    incorrect_answers: [
      "Ol&#039; Pickaxe",
      "Video Outpost &quot;Too&quot;",
      "Food Donkey",
    ],
  },
  {
    question:
      "Which of the following is not a character in the video game Doki Doki Literature Club?",
    correct_answer: "Nico",
    incorrect_answers: ["Monika", "Natsuki", "Sayori"],
  },
  {
    question:
      "In the video game franchise &quot;Halo&quot;, what is the UNSC&#039;s main opposing faction called?",
    correct_answer: "The Covenant",
    incorrect_answers: ["The Reckoning", "The Peoples", "The Slaughterers"],
  },
  {
    question:
      "Which character was introduced to the Super Smash Bros franchise in Super Smash Bros Melee?",
    correct_answer: "Sheik",
    incorrect_answers: ["Samus", "Lucas", "Mega Man"],
  },
];

//Variable Declaration Y DOM

const question = document.querySelector("#question");
const answers = Array.from(document.querySelectorAll(".answer-text"));
const questionCounterText = document.querySelector(".counter");
const scoreText = document.querySelector(".score");
const startButton = document.querySelector(".start-button");

let questionCounter;
let score;
const MAX_QUESTIONS = 1;

//Funcion para empezar el Juego
startGame = () => {
  questionCounter = 0;
  score = 0;
  console.log(questions);
  avaliableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);
  console.log(avaliableQuestions);
  console.log();
};

//funcion que randomiza una pregunta del STACK de todas
const getRandomQuestions = (arr, n) => {
  let len = arr.length;
  if (n > len) {
    throw new RangeError(
      "la Funcion: mas elementos cogidos de los disponibles"
    );
  }
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return (selected = shuffled.slice(0, n));
};

startButton.addEventListener("click", startGame);
