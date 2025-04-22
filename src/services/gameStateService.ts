interface GameState {
  isNewGame: boolean;
}

const GAME_STATE_KEY = 'detective_game_state';

export function getGameState(): GameState | null {
  if (typeof window === 'undefined') return null;
  
  const state = localStorage.getItem(GAME_STATE_KEY);
  return state ? JSON.parse(state) : null;
}

export function saveGameState(state: GameState): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
}

export function startNewGame(): void {
  saveGameState({
    isNewGame: false
  });
}
