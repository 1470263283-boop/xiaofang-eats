import { Check, Copy, Wand2 } from 'lucide-react';
import { mealConfigs } from '../data/menu';
import type { TodayMenu } from '../types';

type TodaySummaryProps = {
  todayMenu: TodayMenu;
  copied: boolean;
  onGenerateAll: () => void;
  onCopy: () => void;
  disabled: boolean;
};

export function TodaySummary({ todayMenu, copied, onGenerateAll, onCopy, disabled }: TodaySummaryProps) {
  const completed = mealConfigs.every((meal) => todayMenu[meal.key]);

  return (
    <section className="summary-panel">
      <div className="summary-panel__header">
        <div>
          <p className="section-label">今日菜单</p>
          <h2>{completed ? '今日小昉专属菜单已生成' : '先把三餐安排好'}</h2>
        </div>
        {completed ? <Check className="summary-check" size={22} /> : null}
      </div>

      <div className="summary-list">
        {mealConfigs.map((meal) => (
          <div className="summary-row" key={meal.key}>
            <span>{meal.label}</span>
            <strong>{todayMenu[meal.key] || '等待安排'}</strong>
          </div>
        ))}
      </div>

      <div className="summary-actions">
        <button className="primary-button" type="button" onClick={onGenerateAll} disabled={disabled}>
          <Wand2 size={18} />
          一键生成今天三餐
        </button>
        <button className="ghost-button" type="button" onClick={onCopy} disabled={!completed}>
          <Copy size={18} />
          {copied ? '已复制' : '复制今日菜单'}
        </button>
      </div>
    </section>
  );
}
