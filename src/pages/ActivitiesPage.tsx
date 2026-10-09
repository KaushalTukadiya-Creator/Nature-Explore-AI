import React, { useState, useEffect } from 'react';
import { Mountain, CheckCircle2, Clock, Sparkles, Compass, Shield, Check, Dices } from 'lucide-react';
import { OutdoorActivity } from '@/types/journal';
import { loadActivities, toggleActivityCompletion, getRandomActivity } from '@/services/activityService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import confetti from 'canvas-confetti';

export function ActivitiesPage() {
  const [activities, setActivities] = useState<OutdoorActivity[]>([]);
  const [surpriseActivity, setSurpriseActivity] = useState<OutdoorActivity | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setActivities(loadActivities());
  }, []);

  const handleToggle = (id: string) => {
    const updated = toggleActivityCompletion(id);
    setActivities(updated);
    const toggled = updated.find((a) => a.id === id);
    if (toggled?.isCompleted) {
      toast(`Quest completed: "${toggled.title}"! Great job exploring.`, 'success');
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#16a34a', '#86efac', '#e1c89f'],
        });
      } catch {}
    } else {
      toast(`Quest marked as pending`, 'info');
    }
  };

  const handleSurpriseMe = () => {
    const random = getRandomActivity(activities);
    setSurpriseActivity(random);
  };

  const completedCount = activities.filter((a) => a.isCompleted).length;
  const progressPercent = Math.round((completedCount / (activities.length || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-sage-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Mountain className="w-3.5 h-3.5" />
            <span>Touch Grass Quests</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sage-950 tracking-tight font-display">
            Outdoor Exploration Activities
          </h1>
          <p className="text-sm sm:text-base text-sage-600 mt-1 max-w-xl">
            Hands-on adventures to engage your senses with nature. Read the brief, put your phone away, and head outside!
          </p>
        </div>

        {/* Surprise Me CTA */}
        <Button
          size="lg"
          onClick={handleSurpriseMe}
          className="shadow-nature shrink-0 gap-2 font-bold bg-amber-700 hover:bg-amber-800 text-white"
        >
          <Dices className="w-5 h-5 text-amber-200" />
          <span>Surprise Me!</span>
        </Button>
      </div>

      {/* Exploration Progress Card */}
      <div className="p-6 rounded-3xl bg-white border border-sage-200/80 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-sage-950 font-display">
            Outdoor Journey Progress
          </h3>
          <p className="text-xs sm:text-sm text-sage-600">
            {completedCount} of {activities.length} quests completed ({progressPercent}%)
          </p>
        </div>

        <div className="w-full sm:w-64 bg-sage-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-sage-200">
          <div
            className="h-full bg-forest-600 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => (
          <div
            key={act.id}
            className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 ${
              act.isCompleted
                ? 'bg-forest-50/60 border-forest-300 shadow-xs'
                : 'bg-white border-sage-200/80 shadow-subtle hover:shadow-nature'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant={
                    act.difficulty === 'Easy'
                      ? 'forest'
                      : act.difficulty === 'Moderate'
                      ? 'amber'
                      : 'purple'
                  }
                >
                  {act.difficulty}
                </Badge>

                <div className="flex items-center gap-1.5 text-xs text-sage-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-sage-400" />
                  <span>{act.estimatedDuration}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-sage-950 font-display">
                {act.title}
              </h3>
              <p className="text-xs sm:text-sm text-sage-600 leading-relaxed">
                {act.description}
              </p>

              {act.suggestedEquipment && act.suggestedEquipment.length > 0 && (
                <div className="pt-2 text-xs text-sage-500">
                  <span className="font-semibold text-sage-700">Gear: </span>
                  {act.suggestedEquipment.join(', ')}
                </div>
              )}

              {act.tips && (
                <p className="text-[11px] text-sage-500 bg-sage-50 p-2.5 rounded-xl border border-sage-200/60 italic">
                  Tip: {act.tips}
                </p>
              )}
            </div>

            {/* Toggle Completion Button */}
            <div className="pt-5 mt-4 border-t border-sage-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggle(act.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  act.isCompleted
                    ? 'bg-forest-700 text-white shadow-xs'
                    : 'bg-sage-100 text-sage-800 hover:bg-forest-100 hover:text-forest-900'
                }`}
              >
                {act.isCompleted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Completed!</span>
                  </>
                ) : (
                  <>
                    <span className="w-4 h-4 rounded-md border-2 border-sage-400 inline-block" />
                    <span>Mark as Completed</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Surprise Me Modal */}
      {surpriseActivity && (
        <Dialog
          isOpen={Boolean(surpriseActivity)}
          onClose={() => setSurpriseActivity(null)}
          title="🎲 Your Random Outdoor Quest"
          description="A special exploration challenge selected for you today."
        >
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="amber">{surpriseActivity.difficulty}</Badge>
                <span className="text-xs text-amber-800 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {surpriseActivity.estimatedDuration}
                </span>
              </div>
              <h3 className="text-xl font-bold text-amber-950 font-display">
                {surpriseActivity.title}
              </h3>
              <p className="text-sm text-amber-900 leading-relaxed">
                {surpriseActivity.description}
              </p>
            </div>

            {surpriseActivity.tips && (
              <p className="text-xs text-sage-600 italic bg-sage-50 p-3 rounded-xl border border-sage-200">
                Observational Hint: {surpriseActivity.tips}
              </p>
            )}

            <div className="pt-2 flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSurpriseActivity(null)}
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  handleToggle(surpriseActivity.id);
                  setSurpriseActivity(null);
                }}
              >
                {surpriseActivity.isCompleted ? 'Mark Pending' : 'Mark Completed!'}
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
