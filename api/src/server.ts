import { createServer } from "http";
import express from "express";
// import cors from "cors";
import { Server } from "socket.io";

type UserData = {
  username: string;
  gameId: string;
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins
  },
});

// store active games
const activeGames: Record<string, { username: string; socketId: string }[]> =
  {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // whenever a player joins a game
  socket.on("join-game", ({ username, gameId }: UserData) => {
    // if username or game id is not available
    if (!gameId || !username) {
      socket.emit("join-error", "Game ID and username are required.");
      return;
    }

    // initialize game if it doesn't exist
    if (!activeGames[gameId]) {
      activeGames[gameId] = [];
    }

    // check if the game already has two players
    if (activeGames[gameId].length >= 2) {
      socket.emit("join-error", "This game is already full");
      return;
    }

    // add player to the game
    activeGames[gameId].push({
      username: username,
      socketId: socket.id,
    });
    socket.join(gameId);
    console.log(`Player ${username} has joined the game ${gameId}`);

    // send success message to the player himself/herself
    socket.emit("game-joined", { username, gameId });

    // notify other player
    io.to(gameId).emit("player-joined", { username });

    // send the updated players in the game that a new player joined
    io.to(gameId).emit("update-players", {
      players: activeGames[gameId],
    });

    // if there is only player joined , notify them that they need to wait for the opponent
    if (activeGames[gameId].length === 1) {
      socket.emit("waiting-for-opponent", "Waiting for your opponent");
    }

    // if two players are in start the game
    if (activeGames[gameId].length === 2) {
      io.to(gameId).emit("game-start", "The game is starting");
    }
  });

  // handle player leaving the game
  socket.on("leave-game", ({ username, gameId }: UserData) => {
    if (!activeGames[gameId]) return;

    // remove the player form the game using socketid
    activeGames[gameId] = activeGames[gameId].filter(
      (player) => player.socketId !== socket.id && player.username !== username
    );

    socket.leave(gameId);

    io.to(gameId).emit("player-left", {
      message: `${username} has left the game`,
      players: activeGames[gameId] || [],
    });

    if (activeGames[gameId].length === 0) {
      delete activeGames[gameId];
    }
  });

  // handle player disconnection
  socket.on("disconnect", () => {
    let gameIdToRemove = null;
    let usernameToRemove = null;
    let remainingPlayers = [];

    for (const gameId in activeGames) {
      const playerIndex = activeGames[gameId].findIndex(
        (player) => player.socketId === socket.id
      );

      if (playerIndex !== -1) {
        usernameToRemove = activeGames[gameId][playerIndex].username;
        activeGames[gameId].splice(playerIndex, 1);
        remainingPlayers = activeGames[gameId];

        if (activeGames[gameId].length === 0) {
          gameIdToRemove = gameId;
        } else {
          io.to(gameId).emit("player-left", {
            message: `${usernameToRemove} has left the game`,
            players: remainingPlayers || [],
          });
          break;
        }
      }
    }

    if (gameIdToRemove) {
      delete activeGames[gameIdToRemove]; // Remove empty games
    }

    console.log("A user has been disconnected: ", usernameToRemove);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
