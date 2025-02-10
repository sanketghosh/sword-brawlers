import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

let username: string | null = null;
let gameId: string | null = null;

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal") as HTMLDivElement;
  const nameInput = document.getElementById("nameInput") as HTMLInputElement;
  const gameIdInput = document.getElementById(
    "gameIdInput"
  ) as HTMLInputElement;
  const gameIdGeneratorButton = document.getElementById(
    "gameIdGeneratorButton"
  ) as HTMLButtonElement;
  const startGameButton = document.getElementById(
    "startGameButton"
  ) as HTMLButtonElement;
  const gameStartDetailsForm = document.getElementById(
    "gameStartDetailsForm"
  ) as HTMLFormElement;
  const toast = document.getElementById("toast") as HTMLDivElement;
  const displayDetails = document.getElementById(
    "displayDetails"
  ) as HTMLDivElement;
  const waitForOpponentModal = document.getElementById(
    "waitForOpponentModal"
  ) as HTMLDivElement;

  // show the modal after page loads
  modal.style.display = "flex";
  waitForOpponentModal.style.display = "none";

  // generate an id if user does not provide one
  gameIdGeneratorButton.addEventListener("click", () => {
    gameIdInput.value = uuid();
    toast.style.display = "block";
    toast.innerText = "  Game ID has been generated successfully!";

    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  });

  // handle the form submission
  gameStartDetailsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    username = nameInput.value.trim();
    gameId = gameIdInput.value.trim();

    if (!username) {
      alert("Please enter your username.");
      return;
    }

    if (!gameId) {
      // maybe autofill
      /* let gameId = uuid();
      gameIdInput.value = gameId; */
      alert("Please enter a game ID.");
      return;
    }

    console.log("Game starting with: ", { username, gameId });

    // hide the modal
    // modal.style.display = "none";

    // displayDetails.innerText = JSON.stringify({ username, gameId });
    socket.emit("join-game", { username, gameId });
  });

  window.addEventListener("beforeunload", () => {
    socket.emit("leave-game", { username, gameId });
    socket.disconnect();
  });

  // listen for success or error messages

  // you have joined the game as user
  socket.on("game-joined", ({ username, gameId }) => {
    console.log(`Joined game ${gameId} as ${username}`);
    modal.style.display = "none";
  });

  // in case of any error
  socket.on("join-error", (message) => {
    alert(message);
    modal.style.display = "flex";
  });

  // in case of other player joined
  socket.on("player-joined", ({ username }) => {
    console.log(`${username} joined the game`);
  });
  socket.on("waiting-for-opponent", (message) => {
    alert(message);
    waitForOpponentModal.style.display = "flex";
  });

  socket.on("update-players", ({ players }) => {
    if (players.length === 2) {
      waitForOpponentModal.style.display = "none";
    }
    displayDetails.innerText = JSON.stringify(players);
  });

  socket.on("player-left", ({ message, players }) => {
    alert(message);
    displayDetails.innerText = JSON.stringify(players);
  });

  // when game starts
  socket.on("game-start", (message) => {
    console.log(message);
  });
});
