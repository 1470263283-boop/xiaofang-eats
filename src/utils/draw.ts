import type { HistoryEntry, MealKey, MenuItems, RecentDraws, TodayMenu } from '../types';

export function pickFood(items: string[], recent: string[]) {
  const cleanItems = items.map((item) => item.trim()).filter(Boolean);
  if (cleanItems.length === 0) return '';

  const recentThree = recent.slice(0, 3);
  const preferred = cleanItems.filter((item) => !recentThree.includes(item));
  const pool = preferred.length > 0 ? preferred : cleanItems;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function updateRecentDraws(recentDraws: RecentDraws, mealKey: MealKey, food: string): RecentDraws {
  return {
    ...recentDraws,
    [mealKey]: [food, ...recentDraws[mealKey].filter((item) => item !== food)].slice(0, 8),
  };
}

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getDisplayDate(date = new Date()) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
}

export function mergeTodayHistory(history: HistoryEntry[], menu: TodayMenu): HistoryEntry[] {
  const today = getTodayKey();
  const entry: HistoryEntry = {
    date: today,
    displayDate: getDisplayDate(),
    menu,
  };
  const withoutToday = history.filter((item) => item.date !== today);
  return [entry, ...withoutToday].slice(0, 7);
}

export function drawMeal(menuItems: MenuItems, recentDraws: RecentDraws, mealKey: MealKey) {
  return pickFood(menuItems[mealKey], recentDraws[mealKey]);
}
