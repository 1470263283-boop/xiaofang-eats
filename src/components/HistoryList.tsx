import { Clock3 } from 'lucide-react';
import { mealConfigs } from '../data/menu';
import type { HistoryEntry } from '../types';

type HistoryListProps = {
  history: HistoryEntry[];
};

export function HistoryList({ history }: HistoryListProps) {
  return (
    <section className="plain-section">
      <div className="section-heading">
        <Clock3 size={18} />
        <h2>历史记录</h2>
      </div>
      {history.length === 0 ? (
        <p className="empty-text">生成今天三餐后，会在这里保存最近 7 天。</p>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <article className="history-item" key={entry.date}>
              <time>{entry.displayDate}</time>
              <div>
                {mealConfigs.map((meal) => (
                  <span key={meal.key}>
                    {meal.label}：{entry.menu[meal.key] || '未安排'}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
