import { Lock, LockOpen, RotateCw, Sparkles } from 'lucide-react';
import type { MealConfig } from '../types';

type MealCardProps = {
  config: MealConfig;
  result?: string;
  options: string[];
  locked: boolean;
  spinning: boolean;
  rotation: number;
  onDraw: () => void;
  onToggleLock: () => void;
};

export function MealCard({
  config,
  result,
  options,
  locked,
  spinning,
  rotation,
  onDraw,
  onToggleLock,
}: MealCardProps) {
  const previewItems = options.slice(0, 6);

  return (
    <section className={`meal-card ${locked ? 'is-locked' : ''}`}>
      <div className="meal-card__top">
        <div>
          <p className="meal-card__label">{config.label}</p>
          <h2>{result || '还没决定'}</h2>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onToggleLock}
          aria-label={locked ? `解锁${config.label}` : `锁定${config.label}`}
          title={locked ? `解锁${config.label}` : `锁定${config.label}`}
        >
          {locked ? <Lock size={18} /> : <LockOpen size={18} />}
        </button>
      </div>

      <div className="spinner-row">
        <button
          className="wheel"
          type="button"
          onClick={onDraw}
          disabled={spinning}
          aria-label={`转动${config.label}转盘`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <span className="wheel__center">{config.shortLabel}</span>
          {previewItems.map((item, index) => (
            <span
              className="wheel__item"
              key={`${item}-${index}`}
              style={{ transform: `rotate(${index * (360 / previewItems.length)}deg) translateY(-46px)` }}
            >
              {item.slice(0, 2)}
            </span>
          ))}
        </button>
        <div className="meal-action">
          <p>{result ? config.resultText : `给小昉抽${config.label}`}</p>
          <button className="secondary-button" type="button" onClick={onDraw} disabled={spinning}>
            {result ? <RotateCw size={17} /> : <Sparkles size={17} />}
            {result ? '重新转一次' : '开始抽签'}
          </button>
        </div>
      </div>
    </section>
  );
}
