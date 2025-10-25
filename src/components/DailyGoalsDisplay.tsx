import { DailyGoals } from '@/types/nutrition';
import { Progress } from '@/components/ui/progress';

interface DailyGoalsDisplayProps {
  goals: DailyGoals;
  consumed: DailyGoals;
}

interface MacroCardProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
}

const MacroCard = ({ label, current, goal, unit, color }: MacroCardProps) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const remaining = Math.max(goal - current, 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          {remaining.toFixed(0)} {unit} left
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold text-foreground">
          {current.toFixed(0)}
        </span>
        <span className="text-sm text-muted-foreground">
          / {goal} {unit}
        </span>
      </div>
    </div>
  );
};

export const DailyGoalsDisplay = ({ goals, consumed }: DailyGoalsDisplayProps) => {
  return (
    <div className="bg-card rounded-xl border shadow-sm p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Daily Goals</h2>
      
      <div className="grid gap-6">
        <MacroCard
          label="Calories"
          current={consumed.calories}
          goal={goals.calories}
          unit="kcal"
          color="primary"
        />
        
        <div className="grid grid-cols-3 gap-4">
          <MacroCard
            label="Protein"
            current={consumed.protein}
            goal={goals.protein}
            unit="g"
            color="info"
          />
          <MacroCard
            label="Fat"
            current={consumed.fat}
            goal={goals.fat}
            unit="g"
            color="warning"
          />
          <MacroCard
            label="Carbs"
            current={consumed.carbs}
            goal={goals.carbs}
            unit="g"
            color="success"
          />
        </div>
      </div>
    </div>
  );
};
