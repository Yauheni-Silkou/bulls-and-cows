import { generateSecret } from './core/generateSecret.js';
import { createInitialState, addGuessToHistory } from './core/gameState.js';
import { evaluateGuess } from './core/evaluateGuess.js';
import { isValidGuess } from './core/isValidGuess.js';
import { createDigitValidator } from './core/createDigitValidator.js';
import { getRecords, saveRecord } from './core/leaderboard.js';
import { createSettingsScreen } from './ui/settingsScreen.js';
import { createGameScreen } from './ui/gameScreen.js';
import type { GameBase } from './core/gameState.js';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.body;

  const renderLeaderboard = (container: HTMLElement, length: number, base: number) => {
    const existing = container.querySelector('.leaderboard-box');
    if (existing) {
      existing.remove();
    }

    const records = getRecords(length, base);
    if (records.length === 0) {
      return;
    }

    const box = document.createElement('div');
    box.className = 'leaderboard-box';
    box.style.marginTop = '1.5rem';
    box.style.padding = '0.75rem';
    box.style.backgroundColor = '#f3f4f6';
    box.style.borderRadius = '6px';

    const title = document.createElement('h3');
    title.textContent = 'Top Records for this Mode:';
    title.style.margin = '0 0 0.5rem 0';
    title.style.fontSize = '0.875rem';
    box.appendChild(title);

    const ol = document.createElement('ol');
    ol.style.margin = '0';
    ol.style.paddingLeft = '1.25rem';
    ol.style.fontSize = '0.875rem';

    records.forEach((rec) => {
      const li = document.createElement('li');
      li.textContent = `${rec.attempts} attempts (${rec.time}s) — ${rec.date}`;
      ol.appendChild(li);
    });

    box.appendChild(ol);
    container.appendChild(box);
  };

  const initApp = () => {
    appRoot.textContent = '';

    const settings = createSettingsScreen();
    appRoot.appendChild(settings.container);

    settings.startButton.addEventListener('click', () => {
      const base = parseInt(settings.baseSelect.value, 10) as GameBase;
      const length = parseInt(settings.lengthSelect.value, 10);

      const secret = generateSecret(length, base);
      const startTimeStamp = Date.now();
      let state = createInitialState(length, base, secret, startTimeStamp);

      appRoot.textContent = '';

      const game = createGameScreen(state, () => {
        clearInterval(timerId);
        initApp();
      });

      appRoot.appendChild(game.container);
      renderLeaderboard(game.container, length, base);

      const isCharValid = createDigitValidator(base);
      game.input.addEventListener('input', () => {
        const value = game.input.value;
        const filteredValue = value
          .split('')
          .filter((char) => isCharValid(char))
          .join('');

        if (value !== filteredValue) {
          game.input.value = filteredValue;
        }
      });

      const timerId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        game.timeElement.textContent = `Time: ${elapsed}s`;
      }, 1000);

      game.submitButton.addEventListener('click', () => {
        if (state.isWon) {
          return;
        }

        const guess = game.input.value.trim();
        const currentElapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);

        if (!isValidGuess(guess, state.length, state.base)) {
          return;
        }

        const isAlreadyGuessed = state.history.some(
          (entry) => entry.guess.toLowerCase() === guess.toLowerCase()
        );
        if (isAlreadyGuessed) {
          game.input.value = '';
          return;
        }

        const result = evaluateGuess(state.secretNumber, guess);

        state = addGuessToHistory(state, guess, result, currentElapsedSeconds);

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
        cellTime.textContent = `${currentElapsedSeconds}s`;

        row.appendChild(cellNum);
        row.appendChild(cellGuess);
        row.appendChild(cellBulls);
        row.appendChild(cellCows);
        row.appendChild(cellTime);
        game.historyTableBody.appendChild(row);

        game.input.value = '';

        if (state.isWon) {
          clearInterval(timerId);

          saveRecord(state.length, state.base, state.history.length, currentElapsedSeconds);
          renderLeaderboard(game.container, state.length, state.base);

          const winMsg = document.createElement('div');
          winMsg.className = 'win-message';
          winMsg.textContent = `You won in ${state.history.length} attempts and ${currentElapsedSeconds}s!`;
          game.winContainer.appendChild(winMsg);

          game.input.disabled = true;
          game.submitButton.disabled = true;
        }
      });
    });
  };

  initApp();
});
