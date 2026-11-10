export const createInitialState = (length, base, secret) => {
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
export const addGuessToHistory = (state, guess, result, elapsedSeconds) => {
    const newEntry = {
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
