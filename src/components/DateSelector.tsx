import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateSelector = ({ selectedDate, onDateChange }: DateSelectorProps) => {
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card rounded-xl border shadow-sm">
      <Button variant="ghost" size="icon" onClick={goToPreviousDay}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-semibold text-foreground">
          {format(selectedDate, 'EEEE')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {format(selectedDate, 'MMMM d, yyyy')}
        </p>
        {!isToday && (
          <Button variant="link" size="sm" onClick={goToToday} className="text-xs h-auto p-0 mt-1">
            Go to today
          </Button>
        )}
      </div>

      <Button variant="ghost" size="icon" onClick={goToNextDay}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
