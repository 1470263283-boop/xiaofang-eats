import { defaultMenuItems, emptyLockedMeals, emptyRecentDraws } from '../data/menu';
import type { AppState } from '../types';

const STORAGE_KEY = 'xiaofang-eats-state-v1';

export const defaultState: AppState = {
  menuItems: defaultMenuItems,
  todayMenu: {},
  recentDraws: emptyRecentDraws,
  lockedMeals: emptyLockedMeals,
  history: [],
};

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const saved = JSON.parse(raw) as Partial<AppState>;
    return {
      menuItems: {
        breakfast: saved.menuItems?.breakfast?.length ? saved.menuItems.breakfast : defaultMenuItems.breakfast,
        lunch: saved.menuItems?.lunch?.length ? saved.menuItems.lunch : defaultMenuItems.lunch,
        dinner: saved.menuItems?.dinner?.length ? saved.menuItems.dinner : defaultMenuItems.dinner,
      },
      todayMenu: saved.todayMenu ?? {},
      recentDraws: {
        breakfast: saved.recentDraws?.breakfast ?? [],
        lunch: saved.recentDraws?.lunch ?? [],
        dinner: saved.recentDraws?.dinner ?? [],
      },
      lockedMeals: {
        breakfast: saved.lockedMeals?.breakfast ?? false,
        lunch: saved.lockedMeals?.lunch ?? false,
        dinner: saved.lockedMeals?.dinner ?? false,
      },
      history: saved.history ?? [],
    };
  } catch {
    return defaultState;
  }
}

export function saveAppState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
