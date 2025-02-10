const activeGames: Record<string, string[]> = {
  gameone: ["userone", "usertwo"],
  gametwo: ["userthree", "userfour"],
};

console.log("Case1: ", activeGames["gameone"]);
console.log("case2: ", activeGames["gameone"].length);
