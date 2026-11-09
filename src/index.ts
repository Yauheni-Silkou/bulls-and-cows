import { generateSecret } from './core/generateSecret.js';
import { createInitialState, addGuessToHistory } from './core/gameState.js';
import { evaluateGuess } from './core/evaluateGuess.js';
import { createSettingsScreen } from './ui/settingsScreen.js';
import { createGameScreen } from './ui/gameScreen.js';
import type { GameBase } from './core/gameState.js';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.body;

  const initApp = () => {
    appRoot.textContent = '';

    const settings = createSettingsScreen();
    appRoot.appendChild(settings.container);

    settings.startButton.addEventListener('click', () => {
      const base = parseInt(settings.baseSelect.value, 10) as GameBase;
      const length = parseInt(settings.lengthSelect.value, 10);

      const secret = generateSecret(length, base);
      let state = createInitialState(length, base, secret);

      appRoot.textContent = '';

      const game = createGameScreen(state, () => {
        clearInterval(timerId);
        initApp();
      });

      appRoot.appendChild(game.container);

      const timerId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        game.timeElement.textContent = `Time: ${elapsed}s`;
      }, 1000);

      game.submitButton.addEventListener('click', () => {
        const guess = game.input.value.trim();
        if (guess.length !== state.length) {
          return;
        }

        const result = evaluateGuess(state.secretNumber, guess);
        state = addGuessToHistory(state, guess, result);

        const row = document.createElement('tr');

        const cellNum = document.createElement('td');
        cellNum.textContent = state.history.length.toString();

        const cellGuess = document.createElement('td');
        cellGuess.textContent = guess;

        const cellBulls = document.createElement('td');
        cellBulls.textContent = result.bulls.toString();

        const cellCows = document.createElement('td');
        cellCows.textContent = result.cows.toString();

        const cellTime = document.createElement('td');
        cellTime.textContent = `${state.history[state.history.length - 1].time}s`;

        row.appendChild(cellNum);
        row.appendChild(cellGuess);
        row.appendChild(cellBulls);
        row.appendChild(cellCows);
        row.appendChild(cellTime);
        game.historyTableBody.appendChild(row);

        game.input.value = '';

        if (state.isWon) {
          clearInterval(timerId);
          const winMsg = document.createElement('div');
          winMsg.className = 'win-message';
          winMsg.textContent = `You won in ${state.history.length} attempts and ${Math.floor((Date.now() - state.startTime) / 1000)}s!`;
          game.winContainer.appendChild(winMsg);
          game.input.disabled = true;
          game.submitButton.disabled = true;
        }
      });
    });
  };

  initApp();
});
