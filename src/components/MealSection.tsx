import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { MealEntry, MealType } from '@/types/nutrition';
import { cn } from '@/lib/utils';

interface MealSectionProps {
  title: string;
  mealType: MealType;
  entries: MealEntry[];
  onAddFood: (mealType: MealType) => void;
  onRemoveEntry: (entryId: string) => void;
}

export const MealSection = ({
  title,
  mealType,
  entries,
  onAddFood,
  onRemoveEntry,
}: MealSectionProps) => {
  const totalCalories = entries.reduce((sum, entry) => sum + entry.food.calories, 0);
  const totalProtein = entries.reduce((sum, entry) => sum + entry.food.protein, 0);
  const totalFat = entries.reduce((sum, entry) => sum + entry.food.fat, 0);
  const totalCarbs = entries.reduce((sum, entry) => sum + entry.food.carbs, 0);

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            {entries.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {totalCalories} kcal • {totalProtein}g protein • {totalFat}g fat •{' '}
                {totalCarbs}g carbs
              </p>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onAddFood(mealType)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Food
          </Button>
        </div>
      </div>

      <div className="p-4">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No foods logged yet
          </p>
        ) : (
          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{entry.food.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {entry.food.description} • {entry.food.serving}
                  </p>
                  <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                    <span>
                      <span className="font-medium text-foreground">
                        {entry.food.calories}
                      </span>{' '}
                      kcal
                    </span>
                    <span>
                      <span className="font-medium text-foreground">
                        {entry.food.protein}g
                      </span>{' '}
                      P
                    </span>
                    <span>
                      <span className="font-medium text-foreground">
                        {entry.food.fat}g
                      </span>{' '}
                      F
                    </span>
                    <span>
                      <span className="font-medium text-foreground">
                        {entry.food.carbs}g
                      </span>{' '}
                      C
                    </span>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onRemoveEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
