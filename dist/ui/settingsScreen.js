import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
export const createSettingsScreen = () => {
    const container = document.createElement('div');
    container.className = 'settings-container';
    const title = document.createElement('h1');
    title.textContent = 'Bulls and Cows';
    container.appendChild(title);
    const baseGroup = document.createElement('div');
    baseGroup.className = 'form-group';
    const baseLabel = document.createElement('label');
    baseLabel.textContent = 'Number System (Base):';
    const baseSelect = document.createElement('select');
    const bases = [
        { value: '10', label: 'Decimal (10)' },
        { value: '2', label: 'Binary (2)' },
        { value: '8', label: 'Octal (8)' },
        { value: '16', label: 'Hexadecimal (16)' },
    ];
    bases.forEach((b) => {
        const option = document.createElement('option');
        option.value = b.value;
        option.textContent = b.label;
        baseSelect.appendChild(option);
    });
    baseGroup.appendChild(baseLabel);
    baseGroup.appendChild(baseSelect);
    container.appendChild(baseGroup);
    const lengthGroup = document.createElement('div');
    lengthGroup.className = 'form-group';
    const lengthLabel = document.createElement('label');
    lengthLabel.textContent = 'Secret Number Length:';
    const lengthSelect = document.createElement('select');
    for (let i = 2; i <= 6; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        lengthSelect.appendChild(option);
    }
    lengthGroup.appendChild(lengthLabel);
    lengthGroup.appendChild(lengthSelect);
    container.appendChild(lengthGroup);
    const combinationsInfo = document.createElement('div');
    combinationsInfo.className = 'combinations-info';
    const initialCombinations = countPossibleSecrets(2, 10);
    combinationsInfo.textContent = `Possible secret numbers: ${initialCombinations}`;
    container.appendChild(combinationsInfo);
    const startButton = document.createElement('button');
    startButton.className = 'btn-start';
    startButton.textContent = 'Start Game';
    container.appendChild(startButton);
    baseSelect.addEventListener('change', () => {
        const selectedBase = parseInt(baseSelect.value, 10);
        if (selectedBase === 2) {
            Array.from(lengthSelect.options).forEach((option) => {
                if (option.value !== '2') {
                    option.disabled = true;
                }
            });
            lengthSelect.value = '2';
        }
        else {
            Array.from(lengthSelect.options).forEach((option) => {
                option.disabled = false;
            });
        }
        const currentLength = parseInt(lengthSelect.value, 10);
        const totalCombinations = countPossibleSecrets(currentLength, selectedBase);
        combinationsInfo.textContent = `Possible secret numbers: ${totalCombinations}`;
    });
    lengthSelect.addEventListener('change', () => {
        const selectedBase = parseInt(baseSelect.value, 10);
        const currentLength = parseInt(lengthSelect.value, 10);
        const totalCombinations = countPossibleSecrets(currentLength, selectedBase);
        combinationsInfo.textContent = `Possible secret numbers: ${totalCombinations}`;
    });
    return {
        container,
        baseSelect,
        lengthSelect,
        startButton,
        combinationsInfo,
    };
};
