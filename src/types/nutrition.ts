export interface Food {
  id: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  serving: string;
}

export interface MealEntry {
  id: string;
  food: Food;
  timestamp: Date;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';
