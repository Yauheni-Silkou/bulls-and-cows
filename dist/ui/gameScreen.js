import { createDigitValidator } from '../core/createDigitValidator.js';
export const createGameScreen = (state, onNewGame) => {
    const container = document.createElement('div');
    container.className = 'game-container';
    const header = document.createElement('div');
    header.className = 'game-header';
    const info = document.createElement('span');
    info.textContent = `Mode: ${state.base === 16 ? 'HEX' : state.base === 10 ? 'DEC' : state.base === 8 ? 'OCT' : 'BIN'} (${state.length} digits)`;
    const timeElement = document.createElement('span');
    timeElement.textContent = 'Time: 0s';
    header.appendChild(info);
    header.appendChild(timeElement);
    container.appendChild(header);
    const winContainer = document.createElement('div');
    container.appendChild(winContainer);
    const inputSection = document.createElement('div');
    inputSection.className = 'input-section';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-guess';
    input.placeholder = 'Your guess';
    input.maxLength = state.length;
    const submitButton = document.createElement('button');
    submitButton.className = 'btn-guess';
    submitButton.textContent = 'Go';
    inputSection.appendChild(input);
    inputSection.appendChild(submitButton);
    container.appendChild(inputSection);
    const historySection = document.createElement('div');
    historySection.className = 'history-section';
    const table = document.createElement('table');
    table.className = 'history-table';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['#', 'Guess', 'Bulls', 'Cows', 'Time'].forEach((text) => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const historyTableBody = document.createElement('tbody');
    table.appendChild(historyTableBody);
    historySection.appendChild(table);
    container.appendChild(historySection);
    const newGameButton = document.createElement('button');
    newGameButton.className = 'btn-new-game';
    newGameButton.textContent = 'New Game';
    newGameButton.addEventListener('click', onNewGame);
    container.appendChild(newGameButton);
    const isValidChar = createDigitValidator(state.base);
    input.addEventListener('input', () => {
        const currentVal = input.value;
        const uniqueValidChars = [];
        for (const char of currentVal) {
            const lowerChar = char.toLowerCase();
            if (isValidChar(lowerChar) &&
                !uniqueValidChars.map((c) => c.toLowerCase()).includes(lowerChar)) {
                uniqueValidChars.push(lowerChar);
            }
        }
        input.value = uniqueValidChars.join('');
    });
    return {
        container,
        input,
        submitButton,
        historyTableBody,
        timeElement,
        winContainer,
        newGameButton,
    };
};
