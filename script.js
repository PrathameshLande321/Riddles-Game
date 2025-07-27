const questions = [
  // Level 1
  { q: "The more of me you take, the more you leave behind. What am I?", a: "footsteps" },
  { q: "What has keys but can't open locks?", a: "piano" },
  { q: "What can travel around the world while staying in the corner?", a: "stamp" },

  // Level 2
  { q: "I speak without a mouth and hear without ears. What am I?", a: "echo" },
  { q: "What gets wetter the more it dries?", a: "towel" },
  { q: "I have cities but no houses, forests but no trees, and water but no fish. What am I?", a: "map" },

  // Level 3
  { q: "What comes once in a minute, twice in a moment, but never in a thousand years?", a: "m" },
  { q: "I'm tall when I'm young, and I'm short when I'm old. What am I?", a: "candle" },
  { q: "The more you take away from me, the bigger I get. What am I?", a: "hole" },

  // Level 4
  { q: "What has to be broken before you can use it?", a: "egg" },
  { q: "I'm not alive, but I can grow. I don't have lungs, but I need air. What am I?", a: "fire" },
  { q: "What has a head, a tail, is brown, and has no legs?", a: "coin" },

  // Level 5
  { q: "What runs but never walks, has a bed but never sleeps?", a: "river" },
  { q: "What goes up but never comes down?", a: "age" },
  { q: "Forward I'm heavy, but backward I'm not. What am I?", a: "ton" }
];

let current = 0;
let score = 0;
let level = 1;
let correctInLevel = 0;
let timer;
let timeLeft;

const levelTimes = {
  1: 30,
  2: 25,
  3: 20,
  4: 15,
  5: 10
};

const questionBox = document.getElementById("question");
const answerInput = document.getElementById("answer");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const timerDisplay = document.getElementById("timer");

function loadQuestion() {
  if (current >= questions.length) {
    questionBox.innerText = "🎉 You completed all levels! Final Score: " + score;
    speak("You completed all levels. Great job!");
    clearInterval(timer);
    return;
  }

  // Reset timer per level
  startTimer(level);

  questionBox.innerText = questions[current].q;
  speak(questions[current].q);
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = questions[current].a.toLowerCase();

  if (userAnswer === correctAnswer) {
    score += 10;
    correctInLevel++;
    current++;

    if (correctInLevel === 3) {
      level++;
      correctInLevel = 0;
    }

    updateUI();
    answerInput.value = "";
    loadQuestion();
  } else {
    speak("Wrong answer. Try again.");
  }
}

function updateUI() {
  scoreDisplay.innerText = score;
  levelDisplay.innerText = level;
}

function startTimer(currentLevel) {
  clearInterval(timer); // Clear any previous timer
  timeLeft = levelTimes[currentLevel] || 10; // fallback to 10s if out of range
  timerDisplay.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert(`⏱ Time's up for Level ${level}! Your score: ${score}`);
      location.reload();
    }
  }, 1000);
}

function resetGame() {
  clearInterval(timer);
  current = 0;
  score = 0;
  level = 1;
  correctInLevel = 0;
  updateUI();
  answerInput.value = "";
  loadQuestion();
}

window.onload = () => {
  updateUI();
  loadQuestion();
};
