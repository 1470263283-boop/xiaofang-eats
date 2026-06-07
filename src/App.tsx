import { useMemo, useState } from 'react';
import { Heart, PenLine } from 'lucide-react';
import { HistoryList } from './components/HistoryList';
import { MealCard } from './components/MealCard';
import { MenuEditor } from './components/MenuEditor';
import { TodaySummary } from './components/TodaySummary';
import { mealConfigs } from './data/menu';
import { useAppState } from './hooks/useAppState';
import type { MealKey } from './types';
import { drawMeal, mergeTodayHistory, updateRecentDraws } from './utils/draw';
import './styles.css';

const spinDuration = 850;

function App() {
  const [state, setState] = useAppState();
  const [spinningMeal, setSpinningMeal] = useState<MealKey | 'all' | null>(null);
  const [rotation, setRotation] = useState<Record<MealKey, number>>({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
  });
  const [copied, setCopied] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const allComplete = useMemo(
    () => mealConfigs.every((meal) => Boolean(state.todayMenu[meal.key])),
    [state.todayMenu],
  );

  const spinWheel = (mealKey: MealKey) => {
    setRotation((current) => ({
      ...current,
      [mealKey]: current[mealKey] + 720 + Math.floor(Math.random() * 360),
    }));
  };

  const commitMealDraw = (mealKey: MealKey) => {
    setState((current) => {
      const food = drawMeal(current.menuItems, current.recentDraws, mealKey);
      if (!food) return current;

      const todayMenu = {
        ...current.todayMenu,
        [mealKey]: food,
      };
      const recentDraws = updateRecentDraws(current.recentDraws, mealKey, food);
      const isComplete = mealConfigs.every((meal) => Boolean(todayMenu[meal.key]));

      return {
        ...current,
        todayMenu,
        recentDraws,
        history: isComplete ? mergeTodayHistory(current.history, todayMenu) : current.history,
      };
    });
  };

  const drawSingleMeal = (mealKey: MealKey) => {
    if (spinningMeal) return;
    setSpinningMeal(mealKey);
    spinWheel(mealKey);
    window.setTimeout(() => {
      commitMealDraw(mealKey);
      setSpinningMeal(null);
    }, spinDuration);
  };

  const generateAll = () => {
    if (spinningMeal) return;
    const unlockedMeals = mealConfigs.map((meal) => meal.key).filter((mealKey) => !state.lockedMeals[mealKey]);
    if (unlockedMeals.length === 0) return;

    setSpinningMeal('all');
    unlockedMeals.forEach(spinWheel);
    window.setTimeout(() => {
      setState((current) => {
        let todayMenu = { ...current.todayMenu };
        let recentDraws = { ...current.recentDraws };

        unlockedMeals.forEach((mealKey) => {
          const food = drawMeal(current.menuItems, recentDraws, mealKey);
          if (food) {
            todayMenu = { ...todayMenu, [mealKey]: food };
            recentDraws = updateRecentDraws(recentDraws, mealKey, food);
          }
        });

        const isComplete = mealConfigs.every((meal) => Boolean(todayMenu[meal.key]));
        return {
          ...current,
          todayMenu,
          recentDraws,
          history: isComplete ? mergeTodayHistory(current.history, todayMenu) : current.history,
        };
      });
      setSpinningMeal(null);
    }, spinDuration);
  };

  const toggleLock = (mealKey: MealKey) => {
    setState((current) => ({
      ...current,
      lockedMeals: {
        ...current.lockedMeals,
        [mealKey]: !current.lockedMeals[mealKey],
      },
    }));
  };

  const updateMenuItems = (mealKey: MealKey, items: string[]) => {
    setState((current) => ({
      ...current,
      menuItems: {
        ...current.menuItems,
        [mealKey]: items,
      },
    }));
  };

  const copyTodayMenu = async () => {
    const text = `王小昉今天吃：\n早餐：${state.todayMenu.breakfast ?? ''}\n午餐：${state.todayMenu.lunch ?? ''}\n晚餐：${state.todayMenu.dinner ?? ''}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="hero__note">今天也要好好吃饭呀，王小昉</p>
          <h1>小昉今天吃什么</h1>
        </div>
        <div className="hero__mark" aria-hidden="true">
          <Heart size={22} fill="currentColor" />
        </div>
      </header>

      <div className="meal-grid">
        {mealConfigs.map((meal) => (
          <MealCard
            key={meal.key}
            config={meal}
            result={state.todayMenu[meal.key]}
            options={state.menuItems[meal.key]}
            locked={state.lockedMeals[meal.key]}
            spinning={spinningMeal === meal.key || spinningMeal === 'all'}
            rotation={rotation[meal.key]}
            onDraw={() => drawSingleMeal(meal.key)}
            onToggleLock={() => toggleLock(meal.key)}
          />
        ))}
      </div>

      <TodaySummary
        todayMenu={state.todayMenu}
        copied={copied}
        onGenerateAll={generateAll}
        onCopy={copyTodayMenu}
        disabled={Boolean(spinningMeal)}
      />

      {allComplete ? <p className="complete-line">今日小昉专属菜单已生成</p> : null}

      <button className="edit-toggle" type="button" onClick={() => setEditorOpen((open) => !open)}>
        <PenLine size={18} />
        {editorOpen ? '收起编辑菜单' : '编辑菜单'}
      </button>

      {editorOpen ? <MenuEditor menuItems={state.menuItems} onChange={updateMenuItems} /> : null}

      <HistoryList history={state.history} />
    </main>
  );
}

export default App;
