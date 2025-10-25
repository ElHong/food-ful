import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { Food } from '@/types/nutrition';
import { foodDatabase } from '@/data/foodDatabase';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FoodSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectFood: (food: Food) => void;
}

export const FoodSearchDialog = ({
  open,
  onOpenChange,
  onSelectFood,
}: FoodSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoods = foodDatabase.filter(
    (food) =>
      food.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFood = (food: Food) => {
    onSelectFood(food);
    onOpenChange(false);
    setSearchQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Food</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for a food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{food.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {food.description} • {food.serving}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {food.calories}
                      </span>{' '}
                      kcal
                    </span>
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {food.protein}g
                      </span>{' '}
                      protein
                    </span>
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {food.fat}g
                      </span>{' '}
                      fat
                    </span>
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {food.carbs}g
                      </span>{' '}
                      carbs
                    </span>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleSelectFood(food)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
