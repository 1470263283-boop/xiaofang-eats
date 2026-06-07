import { Plus, Trash2 } from 'lucide-react';
import { mealConfigs } from '../data/menu';
import type { MealKey, MenuItems } from '../types';

type MenuEditorProps = {
  menuItems: MenuItems;
  onChange: (mealKey: MealKey, nextItems: string[]) => void;
};

export function MenuEditor({ menuItems, onChange }: MenuEditorProps) {
  const updateItem = (mealKey: MealKey, index: number, value: string) => {
    const nextItems = [...menuItems[mealKey]];
    nextItems[index] = value;
    onChange(mealKey, nextItems);
  };

  const removeItem = (mealKey: MealKey, index: number) => {
    const nextItems = menuItems[mealKey].filter((_, itemIndex) => itemIndex !== index);
    onChange(mealKey, nextItems.length ? nextItems : ['']);
  };

  const addItem = (mealKey: MealKey) => {
    onChange(mealKey, [...menuItems[mealKey], '']);
  };

  return (
    <section className="editor-section" id="menu-editor">
      <div className="section-heading">
        <h2>编辑菜单</h2>
      </div>
      <div className="editor-groups">
        {mealConfigs.map((meal) => (
          <div className="editor-group" key={meal.key}>
            <div className="editor-group__header">
              <h3>{meal.label}</h3>
              <button type="button" className="mini-button" onClick={() => addItem(meal.key)}>
                <Plus size={16} />
                新增
              </button>
            </div>
            <div className="editor-list">
              {menuItems[meal.key].map((item, index) => (
                <label className="editor-row" key={`${meal.key}-${index}`}>
                  <span>{index + 1}</span>
                  <input
                    value={item}
                    onChange={(event) => updateItem(meal.key, index, event.target.value)}
                    aria-label={`${meal.label}候选食物 ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => removeItem(meal.key, index)}
                    aria-label={`删除${item || meal.label + '候选'}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
