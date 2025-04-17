//color mode
const colorBtn = document.querySelector(".switch");
const lightBtn = document.getElementById("sun");
const darkBtn = document.getElementById("moon");

//alert modal
const alertModal = document.querySelector(".alert-wrapper");
const alertText = document.querySelector(".alertText");
const restartBtn = document.querySelector(".restart");
const gameStateText = document.querySelector(".game-state");
//human buttons
const humanRock = document.querySelector(".rock");
const humanPaper = document.querySelector(".paper");
const humanScissors = document.querySelector(".scissors");
// computer buttons
const compRock = document.getElementById("comprock");
const compPaper = document.getElementById("comppaper");
const compScissors = document.getElementById("compscissors");
//score text
const humanScoreText = document.getElementById("humanscore");
const compScoreText = document.getElementById("computerscore");

//rounds
const roundNumber = document.getElementById("roundnumber");
const humanChoiceIcon = document.getElementById("yourChoice");
const botChoiceIcon = document.getElementById("botChoice");

const emojiMap = {
  rock: "🤛",
  paper: "🤚",
  scissors: "✌️",
};

let gameNumber = 0;
let humanScore = 0;
let computerScore = 0;

//generate computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

//logic
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log("Try again!");
    return;
  } else if (
    (humanChoice === "rock" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "scissors")
  ) {
    console.log("Computer wins!");
    computerScore++;
  } else {
    console.log("Human wins!");
    humanScore++;
  }
  humanScoreText.textContent = `${humanScore}`;
  compScoreText.textContent = `${computerScore}`;
}

//isolated game context, stores human choices and computer choices for the duration of games being less than 6, only increments game number inside function so it can reset to 0 once done.
function handleClick(choice) {
  if (gameNumber >= 5) return;
  const computerChoice = getComputerChoice();
  humanChoiceIcon.textContent = emojiMap[choice];
  botChoiceIcon.textContent = emojiMap[computerChoice];
  playRound(choice, computerChoice);
  gameNumber++;
  roundNumber.textContent = `${gameNumber}`;
  if (gameNumber === 5) {
    alertModal.classList.toggle("hidden");

    if (humanScore > computerScore) {
      gameStateText.textContent = "You won!";
    } else if (humanScore < computerScore) {
      gameStateText.textContent = "Better luck next time";
    } else {
      gameStateText.textContent = "It's a tie!";
    }
    alertText.textContent = `Final Score - Human: ${humanScore} Computer: ${computerScore}`;
  }
}

restartBtn.addEventListener("click", () => {
  alertModal.classList.toggle("hidden");
  gameNumber = 0;
  humanScore = 0;
  computerScore = 0;
  humanChoiceIcon.textContent = "🤔";
  botChoiceIcon.textContent = "🤖";
  roundNumber.textContent = "0";
  humanScoreText.textContent = `${humanScore}`;
  compScoreText.textContent = `${computerScore}`;
});

humanRock.addEventListener("click", () => handleClick("rock"));
humanPaper.addEventListener("click", () => handleClick("paper"));
humanScissors.addEventListener("click", () => handleClick("scissors"));

// color mode switcher
document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("sun");
  const darkBtn = document.getElementById("moon");
  const body = document.body;

  body.style.setProperty("color-scheme", "dark");

  lightBtn.addEventListener("click", () => {
    if (!lightBtn.classList.contains("active")) {
      lightBtn.classList.add("active");
      darkBtn.classList.remove("active");
      body.style.setProperty("color-scheme", "light");
    }
  });

  darkBtn.addEventListener("click", () => {
    if (!darkBtn.classList.contains("active")) {
      darkBtn.classList.add("active");
      lightBtn.classList.remove("active");
      body.style.setProperty("color-scheme", "dark");
    }
  });
});

let isUsingTouch = false;

const initTippy = () => {
  tippy("#tippyrock", { content: "rock" });
  tippy("#tippypaper", { content: "paper" });
  tippy("#tippyscissors", { content: "scissors" });
};

const detectInput = (e) => {
  if (e.type === "touchstart") {
    isUsingTouch = true;
  } else {
    isUsingTouch = false;
    initTippy();
  }

  document.removeEventListener("touchstart", detectInput);
  document.removeEventListener("mousemove", detectInput);
};

document.addEventListener("touchstart", detectInput, { passive: true });
document.addEventListener("mousemove", detectInput);
