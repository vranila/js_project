const questions = [
  {
    question: "What is JavaScript?",
    options: ["Programming Language", "Database", "Server", "OS"],
    answer: "Programming Language"
  },
  {
    question: "Which keyword is used for variable?",
    options: ["var", "int", "string", "float"],
    answer: "var"
  },
  {
    question: "Which company developed JS?",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    answer: "Netscape"
  }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("timer").innerText = "Time: " + timeLeft;

  let q = questions[currentIndex];
  document.getElementById("question").innerText = q.question;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    let btn = document.createElement("div");
    btn.classList.add("option");
    btn.innerText = option;

    btn.onclick = () => checkAnswer(option);

    optionsDiv.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;

    if (timeLeft === 0) {
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  if (selected === questions[currentIndex].answer) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector(".quiz-container").style.display = "none";
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText = score;
}

loadQuestion();