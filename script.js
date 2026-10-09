document.addEventListener('DOMContentLoaded', function() {

  // 1. Resume Show/Hide Toggle
  const toggleBtn = document.getElementById('toggleResumeBtn');
  const resumeViewer = document.getElementById('resumeViewer');

  if (toggleBtn && resumeViewer) {
    toggleBtn.addEventListener('click', function() {
      resumeViewer.classList.toggle('hidden');
      toggleBtn.textContent = resumeViewer.classList.contains('hidden') ? '👁️ Show CV Preview' : '🙈 Hide CV Preview';
    });
  }

  // 2. Tab Switching Logic (Direct Style Control para siguradong gagana)
  const tabBtns = document.querySelectorAll('.game-tab-btn');
  const gameBoxes = document.querySelectorAll('.game-box');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.classList.remove('active'));
      gameBoxes.forEach(box => box.classList.remove('active-game'));

      this.classList.add('active');
      const gameId = this.getAttribute('data-game');
      const targetBox = document.getElementById('game-' + gameId);
      if (targetBox) {
        targetBox.classList.add('active-game');
      }
    });
  });

  // GAME 1: Tic-Tac-Toe
  const tttCells = document.querySelectorAll('.cell');
  const tttStatus = document.getElementById('ttt-status');
  const tttRestart = document.getElementById('ttt-restart');
  let tttOptions = ["", "", "", "", "", "", "", "", ""];
  let tttPlayer = "X";
  let tttRunning = true;

  tttCells.forEach(cell => {
    cell.addEventListener('click', function() {
      const idx = this.getAttribute('data-cell-index');
      if (tttOptions[idx] !== "" || !tttRunning) return;

      tttOptions[idx] = tttPlayer;
      this.textContent = tttPlayer;
      this.style.color = tttPlayer === "X" ? "#007bff" : "#e74c3c";

      const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      let won = false;
      for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];
        if (tttOptions[a] && tttOptions[a] === tttOptions[b] && tttOptions[a] === tttOptions[c]) {
          won = true;
          break;
        }
      }

      if (won) {
        tttStatus.textContent = "🎉 Player " + tttPlayer + " Wins!";
        tttRunning = false;
      } else if (!tttOptions.includes("")) {
        tttStatus.textContent = "🤝 It's a Draw!";
        tttRunning = false;
      } else {
        tttPlayer = tttPlayer === "X" ? "O" : "X";
        tttStatus.textContent = "Player " + tttPlayer + "'s Turn";
      }
    });
  });

  if (tttRestart) {
    tttRestart.addEventListener('click', function() {
      tttOptions = ["", "", "", "", "", "", "", "", ""];
      tttPlayer = "X";
      tttRunning = true;
      tttStatus.textContent = "Player X's Turn";
      tttCells.forEach(c => {
        c.textContent = "";
      });
    });
  }

  // GAME 2: Rock Paper Scissors
  const rpsBtns = document.querySelectorAll('.choice-btn');
  const rpsStatus = document.getElementById('rps-status');
  const rpsResult = document.getElementById('rps-result');
  const choices = ["✊ Rock", "✋ Paper", "✌️ Scissors"];

  rpsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const userChoice = this.getAttribute('data-choice');
      const compChoice = choices[Math.floor(Math.random() * 3)];
      let res = "";

      if (userChoice === compChoice) {
        res = "It's a Tie! 🤝";
      } else if (
        (userChoice.includes("Rock") && compChoice.includes("Scissors")) ||
        (userChoice.includes("Paper") && compChoice.includes("Rock")) ||
        (userChoice.includes("Scissors") && compChoice.includes("Paper"))
      ) {
        res = "You Win! 🎉";
      } else {
        res = "Computer Wins! 🤖";
      }

      if (rpsStatus) rpsStatus.textContent = "You: " + userChoice + " vs CPU: " + compChoice;
      if (rpsResult) rpsResult.textContent = res;
    });
  });

  // GAME 3: Guess Number
  let targetNum = Math.floor(Math.random() * 100) + 1;
  const gtnInput = document.getElementById('gtn-input');
  const gtnSubmit = document.getElementById('gtn-submit');
  const gtnStatus = document.getElementById('gtn-status');
  const gtnRestart = document.getElementById('gtn-restart');

  if (gtnSubmit) {
    gtnSubmit.addEventListener('click', function() {
      const val = Number(gtnInput.value);
      if (!val) return;
      if (val === targetNum) gtnStatus.textContent = "🎉 Correct! You guessed it!";
      else if (val < targetNum) gtnStatus.textContent = "📈 Too low! Try higher.";
      else gtnStatus.textContent = "📉 Too high! Try lower.";
    });
  }

  if (gtnRestart) {
    gtnRestart.addEventListener('click', function() {
      targetNum = Math.floor(Math.random() * 100) + 1;
      if (gtnInput) gtnInput.value = "";
      if (gtnStatus) gtnStatus.textContent = "Guess a number between 1 and 100!";
    });
  }

  // GAME 4: Memory Match
  const memBoard = document.getElementById('mem-board');
  const memRestart = document.getElementById('mem-restart');
  const icons = ['📷', '📷', '🖼️', '🖼️', '🎨', '🎨', '📸', '📸'];
  let flipped = [];
  let matchedCount = 0;

  function initMem() {
    if (!memBoard) return;
    memBoard.innerHTML = '';
    flipped = [];
    matchedCount = 0;
    const shuffled = icons.slice().sort(() => 0.5 - Math.random());
    shuffled.forEach((icon, i) => {
      const card = document.createElement('div');
      card.className = 'mem-card';
      card.dataset.icon = icon;
      card.dataset.index = i;
      card.textContent = '❓';
      card.addEventListener('click', flipMemCard);
      memBoard.appendChild(card);
    });
  }

  function flipMemCard() {
    if (flipped.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      this.textContent = this.dataset.icon;
      flipped.push(this);

      if (flipped.length === 2) {
        if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
          matchedCount += 2;
          flipped = [];
          if (matchedCount === icons.length) {
            const status = document.getElementById('mem-status');
            if (status) status.textContent = "🎉 You matched all cards!";
          }
        } else {
          setTimeout(() => {
            flipped.forEach(c => {
              c.classList.remove('flipped');
              c.textContent = '❓';
            });
            flipped = [];
          }, 800);
        }
      }
    }
  }

  initMem();
  if (memRestart) memRestart.addEventListener('click', initMem);

  // GAME 5: Snake Game
  const canvas = document.getElementById("snakeCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const snkStart = document.getElementById("snk-start");
    let snake = [{x: 150, y: 150}];
    let food = {x: 90, y: 90};
    let dx = 10, dy = 0;
    let snakeInterval = null;

    function drawSnake() {
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#e74c3c";
      ctx.fillRect(food.x, food.y, 10, 10);

      ctx.fillStyle = "#28a745";
      snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));

      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        food = {
          x: Math.floor(Math.random() * 29) * 10,
          y: Math.floor(Math.random() * 29) * 10
        };
      } else {
        snake.pop();
      }

      if (head.x < 0 || head.x >= 300 || head.y < 0 || head.y >= 300) {
        clearInterval(snakeInterval);
        const status = document.getElementById('snk-status');
        if (status) status.textContent = "💥 Game Over!";
      }
    }

    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -10; }
      if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 10; }
      if (e.key === "ArrowLeft" && dx === 0) { dx = -10; dy = 0; }
      if (e.key === "ArrowRight" && dx === 0) { dx = 10; dy = 0; }
    });

    if (snkStart) {
      snkStart.addEventListener("click", function() {
        snake = [{x: 150, y: 150}];
        dx = 10; dy = 0;
        const status = document.getElementById('snk-status');
        if (status) status.textContent = "Use Arrow Keys to move!";
        if (snakeInterval) clearInterval(snakeInterval);
        snakeInterval = setInterval(drawSnake, 100);
      });
    }
  }

});