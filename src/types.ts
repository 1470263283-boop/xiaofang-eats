export type MealKey = 'breakfast' | 'lunch' | 'dinner';

export type MealConfig = {
  key: MealKey;
  label: string;
  shortLabel: string;
  resultText: string;
};

export type MenuItems = Record<MealKey, string[]>;

export type TodayMenu = Partial<Record<MealKey, string>>;

export type RecentDraws = Record<MealKey, string[]>;

export type LockedMeals = Record<MealKey, boolean>;

export type HistoryEntry = {
  date: string;
  displayDate: string;
  menu: TodayMenu;
};

export type AppState = {
  menuItems: MenuItems;
  todayMenu: TodayMenu;
  recentDraws: RecentDraws;
  lockedMeals: LockedMeals;
  history: HistoryEntry[];
};
