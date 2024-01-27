const questions = [
  {
    question: "What is Hutao's gender?",
    answers: [
      { text: "Boy", correct: false },
      { text: "Girl", correct: true },
      { text: "None", correct: false },
      { text: "Alien", correct: false },
    ],
  },
  {
    question: "How many elements are there in Genshin?",
    answers: [
      { text: "1", correct: false },
      { text: "10", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
    ],
  },
  {
    question: "What does Ganyu's adeptus form look like?",
    answers: [
      { text: "Cloud looking goat", correct: true },
      { text: "A bird with ice wings", correct: false },
      { text: "A Fish with cloud fins", correct: false },
      { text: "A Cow made out of clouds", correct: false },
    ],
  },
  {
    question: "How many harbingers are there?",
    answers: [
      { text: "5", correct: false },
      { text: "15", correct: false },
      { text: "11", correct: true },
      { text: "10", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
var ifPlayed = false;

// Check if logged in and checked if account has played before for current session
function checker() {
  if (sessionStorage.getItem("checkiflogged") == "true") {
    if (sessionStorage.getItem("ifPlayed") == "true") {
      window.alert("You have already played the quiz!");
      questionElement.innerHTML = "You have already played the quiz!";
      document.getElementById("account").innerHTML =
      "Account: " + sessionStorage.getItem("name");
      answerButtons.style.display = "none";
      nextButton.style.display = "none";
    } else {
      document.getElementById("account").innerHTML =
        "Account: " + sessionStorage.getItem("name");
      startQuiz();
    }
  } else {
    window.alert("You must be logged in to play the quiz!");
    document.getElementById("account").innerHTML = "Account: Guest";
    questionElement.innerHTML = "You must be logged in to play the quiz!";
    answerButtons.style.display = "none";
    nextButton.style.display = "none";
  }
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

// Removes the child elements of the answer buttons
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = " Quiz Completed!";


  ifPlayed = true;
  sessionStorage.setItem("ifPlayed", ifPlayed);


  nextButton.style.display = "block";
  nextButton.disabled = true;
  nextButton.style.cursor = "not-allowed";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } 
});

checker();