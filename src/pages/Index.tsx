import { useState } from 'react';
import { DateSelector } from '@/components/DateSelector';
import { DailyGoalsDisplay } from '@/components/DailyGoalsDisplay';
import { MealSection } from '@/components/MealSection';
import { FoodSearchDialog } from '@/components/FoodSearchDialog';
import { DailyGoals, MealEntry, MealType, Food } from '@/types/nutrition';
import { Utensils } from 'lucide-react';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [currentMealType, setCurrentMealType] = useState<MealType>('breakfast');

  // Default daily goals (can be made editable in future)
  const dailyGoals: DailyGoals = {
    calories: 2000,
    protein: 150,
    fat: 65,
    carbs: 250,
  };

  // Meal entries organized by meal type
  const [mealEntries, setMealEntries] = useState<Record<MealType, MealEntry[]>>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  // Calculate total consumed macros
  const consumed: DailyGoals = {
    calories: Object.values(mealEntries)
      .flat()
      .reduce((sum, entry) => sum + entry.food.calories, 0),
    protein: Object.values(mealEntries)
      .flat()
      .reduce((sum, entry) => sum + entry.food.protein, 0),
    fat: Object.values(mealEntries)
      .flat()
      .reduce((sum, entry) => sum + entry.food.fat, 0),
    carbs: Object.values(mealEntries)
      .flat()
      .reduce((sum, entry) => sum + entry.food.carbs, 0),
  };

  const handleAddFood = (mealType: MealType) => {
    setCurrentMealType(mealType);
    setSearchDialogOpen(true);
  };

  const handleSelectFood = (food: Food) => {
    const newEntry: MealEntry = {
      id: `${Date.now()}-${Math.random()}`,
      food,
      timestamp: new Date(),
    };

    setMealEntries((prev) => ({
      ...prev,
      [currentMealType]: [...prev[currentMealType], newEntry],
    }));
  };

  const handleRemoveEntry = (entryId: string) => {
    setMealEntries((prev) => {
      const newEntries = { ...prev };
      Object.keys(newEntries).forEach((mealType) => {
        newEntries[mealType as MealType] = newEntries[mealType as MealType].filter(
          (entry) => entry.id !== entryId
        );
      });
      return newEntries;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">NutriTrack</h1>
              <p className="text-sm text-muted-foreground">Your daily nutrition companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Left Column - Meals */}
          <div className="space-y-6">
            <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />

            <div className="space-y-4">
              <MealSection
                title="Breakfast"
                mealType="breakfast"
                entries={mealEntries.breakfast}
                onAddFood={handleAddFood}
                onRemoveEntry={handleRemoveEntry}
              />

              <MealSection
                title="Lunch"
                mealType="lunch"
                entries={mealEntries.lunch}
                onAddFood={handleAddFood}
                onRemoveEntry={handleRemoveEntry}
              />

              <MealSection
                title="Dinner"
                mealType="dinner"
                entries={mealEntries.dinner}
                onAddFood={handleAddFood}
                onRemoveEntry={handleRemoveEntry}
              />

              <MealSection
                title="Snacks"
                mealType="snacks"
                entries={mealEntries.snacks}
                onAddFood={handleAddFood}
                onRemoveEntry={handleRemoveEntry}
              />
            </div>
          </div>

          {/* Right Column - Daily Goals (Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <DailyGoalsDisplay goals={dailyGoals} consumed={consumed} />
          </div>
        </div>
      </main>

      {/* Food Search Dialog */}
      <FoodSearchDialog
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
        onSelectFood={handleSelectFood}
      />
    </div>
  );
};

export default Index;
