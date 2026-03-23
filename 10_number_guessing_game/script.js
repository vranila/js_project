let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptCount = 0;

function checkGuess() {

    const userGuess = Number(document.getElementById("guessInput").value);

    attemptCount++;

    if (userGuess === randomNumber) {

        document.getElementById("message").textContent =
            "🎉 Correct! You guessed the number.";

        document.getElementById("attempts").textContent =
            "Attempts: " + attemptCount;

    }
    else if (userGuess < randomNumber) {

        document.getElementById("message").textContent =
            "Too Low! Try a higher number.";

    }
    else {

        document.getElementById("message").textContent =
            "Too High! Try a lower number.";

    }
}

function restartGame() {

    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptCount = 0;

    document.getElementById("guessInput").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "";

}