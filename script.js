const board = document.getElementById("board");

/* 🔥 EGRA YO'L */
function generatePath(n) {
  const path = [];

  const cx = window.innerWidth / 2;
  const cy = 350;

  let angle = 0;
  let radius = 40;

  for (let i = 0; i < n; i++) {
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    path.push({ x, y });

    // 🔥 MUHIM: sekin aylansin, kengaysin
    angle += 0.50;     // burilish tezligi
    radius += 5;       // orasini ochadi
  }

  return path;
}
/* 🟤 KATAKLAR */
path.forEach((p, i) => {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.innerText = i + 1;

  cell.style.left = p.x + "px";
  cell.style.top = p.y + "px";

  if ([10,30,60,90].includes(i)) cell.classList.add("freeze");
  if ([20,55].includes(i)) cell.classList.add("black");
  if ([15,45,75,95].includes(i)) cell.classList.add("bonus");
  if ([5,25,65,85].includes(i)) cell.classList.add("prize");

  board.appendChild(cell);
});

/* 🔴🔵🟢🟡 PLAYER */
const players = [
  { pos: 0, color: "red" },
  { pos: 0, color: "blue" },
  { pos: 0, color: "green" },
  { pos: 0, color: "yellow" }
];

function drawPlayers() {
  document.querySelectorAll(".player").forEach(e => e.remove());

  players.forEach(p => {
    const dot = document.createElement("div");
    dot.className = "player";
    dot.style.background = p.color;

    const pos = path[p.pos];
    dot.style.left = pos.x + "px";
    dot.style.top = pos.y + "px";

    board.appendChild(dot);
  });
}

/* 🎲 ZAR */
let turn = 0;

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;

  players[turn].pos += dice;
  if (players[turn].pos > 99) players[turn].pos = 99;

  turn = (turn + 1) % players.length;

  drawPlayers();
}

drawPlayers();
