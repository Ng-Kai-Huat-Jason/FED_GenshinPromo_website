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
  {
    question: "Who is the archon of Mondstadt?",
    answers: [
      { text: "Venti", correct: true },
      { text: "Diluc", correct: false },
      { text: "Bird Boy", correct: false },
      { text: "Kaeya", correct: false },
    ],
  },
  {
    question: "Who is the archon of Liyue?",
    answers: [
      { text: "Zhong Li", correct: true },
      { text: "Qiqi", correct: false },
      { text: "Xiao", correct: false },
      { text: "Ning Guang", correct: false },
    ],
  },
  {
    question: "Who is Makaoto (Baal)?",
    answers: [
      { text: "Another persona of Raiden Shogun", correct: false },
      { text: "Previous Ruler of Inazuma", correct: false },
      { text: "Ei's Mother", correct: false },
      { text: "Original Archon of Inazuma", correct: true },
    ],
  },
  {
    question: "How did the traveler arrived to Teyvat?",
    answers: [
      { text: "They got truck kuned", correct: false },
      { text: "The Unknown God sent them there", correct: true },
      { text: "Born there", correct: false },
      { text: "Time Travelled", correct: false },
    ],
  },
  {
    question: "What is Amber the champion of in Mondstadt?",
    answers: [
      { text: "Fishing", correct: false },
      { text: "Gliding", correct: true },
      { text: "Singing", correct: false },
      { text: "Drinking", correct: false },
    ],
  },
  {
    question: "What is Diluc taller then Kaeya?",
    answers: [
      { text: "Yes", correct: false },
      { text: "No", correct: true },
      { text: "Same", correct: false },
      { text: "Bleh", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Check if logged in and checked if account has played before for current session
function checker() {
  if (sessionStorage.getItem("checkiflogged") == "true") {
    if (sessionStorage.getItem("quizdone") == "Yes") {
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

  // Shuffle the array of questions
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  // Take the first 5 questions
  const selectedQuestions = shuffledQuestions.slice(0, 5);

  // Set the questions array to the selected questions
  questions.length = 0;
  questions.push(...selectedQuestions);

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
  updateQuizDone();
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

function updateQuizDone() {
  const APIKEY = "659f75533ff19f5320c89e7b"; // IMPORTANT CHANGE THIS TO YOUR OWN KEY
  // Update the account to show that the user has completed the quiz
  let name = sessionStorage.getItem("name");
  let email = sessionStorage.getItem("email");
  let password = sessionStorage.getItem("password");
  let quizdone = "Yes";
  let id = sessionStorage.getItem("id");

  sessionStorage.setItem("quizdone", quizdone);
  console.log(sessionStorage.getItem("quizdone"));

  let jsondata = {
    name: name,
    email: email,
    password: password,
    quizdone: quizdone,
  };

  fetch(`https://assignment2fed-f162.restdb.io/rest/accounts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(jsondata),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Quiz done updated to Yes", response);
    })
    .catch((error) => {
      console.error("Error updating member:", error);
    });
}

checker();
