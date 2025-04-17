tippy("#tippyrock", {
  content: "rock",
});

tippy("#tippypaper", {
  content: "paper",
});

tippy("#tippyscissors", {
  content: "scissors",
});

const alertModal = document.querySelector(".alert-wrapper");
const alertText = document.querySelector(".alertText");
const restartBtn = document.querySelector(".restart");
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
  console.log(`You chose ${humanChoice}, computer chose ${computerChoice}`);
  console.log("Human:", humanScore, "Computer:", computerScore);
  humanScoreText.textContent = `${humanScore}`;
  compScoreText.textContent = `${computerScore}`;
}

//isolated game context, stores human choices and computer choices for the duration of games being less than 6, only increments game number inside function so it can reset to 0 once done.
function handleClick(choice) {
  if (gameNumber >= 6) return;
  const computerChoice = getComputerChoice();
  playRound(choice, computerChoice);
  gameNumber++;
  if (gameNumber >= 6) {
    alertModal.classList.toggle("hidden");
    alertText.textContent = `Final Score - Human: ${humanScore} Computer: ${computerScore}`;
  }
}

restartBtn.addEventListener("click", () => {
  alertModal.classList.toggle("hidden");
  gameNumber = 0;
  humanScore = 0;
  computerScore = 0;
  humanScoreText.textContent = `${humanScore}`;
  compScoreText.textContent = `${computerScore}`;
});

humanRock.addEventListener("click", () => handleClick("rock"));
humanPaper.addEventListener("click", () => handleClick("paper"));
humanScissors.addEventListener("click", () => handleClick("scissors"));
