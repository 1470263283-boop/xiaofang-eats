import type { MealConfig, MenuItems } from '../types';

export const mealConfigs: MealConfig[] = [
  {
    key: 'breakfast',
    label: '早餐',
    shortLabel: '早',
    resultText: '今天早餐就吃它啦！',
  },
  {
    key: 'lunch',
    label: '午餐',
    shortLabel: '午',
    resultText: '小昉，午餐安排好了～',
  },
  {
    key: 'dinner',
    label: '晚餐',
    shortLabel: '晚',
    resultText: '晚餐别纠结啦，就是这个！',
  },
];

export const defaultMenuItems: MenuItems = {
  breakfast: ['豆浆油条', '鸡蛋三明治', '牛奶麦片', '小笼包', '饭团', '水果酸奶', '鸡蛋饼', '粥和咸菜'],
  lunch: ['黄焖鸡米饭', '番茄牛腩饭', '日式咖喱饭', '麻辣烫', '酸菜鱼', '牛肉面', '炒饭', '轻食沙拉', '韩式拌饭', '饺子'],
  dinner: ['火锅', '烤肉', '粥和小菜', '意面', '寿司', '炒菜配米饭', '鸡胸肉蔬菜', '麻辣香锅', '拉面', '关东煮'],
};

export const emptyRecentDraws = {
  breakfast: [],
  lunch: [],
  dinner: [],
};

export const emptyLockedMeals = {
  breakfast: false,
  lunch: false,
  dinner: false,
};
