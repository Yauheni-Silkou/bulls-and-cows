import type { GuessResult } from './evaluateGuess.js';

export type GameBase = 2 | 8 | 10 | 16;

export interface HistoryEntry {
  guess: string;
  result: GuessResult;
  time: number;
}

export interface GameState {
  length: number;
  base: GameBase;
  secretNumber: string;
  history: HistoryEntry[];
  isWon: boolean;
  startTime: number;
  elapsedTime: number;
}

export const createInitialState = (length: number, base: GameBase, secret: string): GameState => {
  return {
    length,
    base,
    secretNumber: secret,
    history: [],
    isWon: false,
    startTime: Date.now(),
    elapsedTime: 0,
  };
};

export const addGuessToHistory = (
  state: GameState,
  guess: string,
  result: GuessResult,
  elapsedSeconds: number
): GameState => {
  const newEntry: HistoryEntry = {
    guess,
    result,
    time: elapsedSeconds,
  };

  return {
    ...state,
    history: [...state.history, newEntry],
    isWon: result.bulls === state.length,
    elapsedTime: elapsedSeconds,
  };
};
