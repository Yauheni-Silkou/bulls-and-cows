import { createSettingsScreen } from './ui/settingsScreen.js';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.body;

  const settingsScreen = createSettingsScreen();
  appRoot.appendChild(settingsScreen.container);

  settingsScreen.startButton.addEventListener('click', () => {
    const base = settingsScreen.baseSelect.value;
    const length = settingsScreen.lengthSelect.value;
    alert(`Game Start! Base: ${base}, Length: ${length}`);
  });
});
