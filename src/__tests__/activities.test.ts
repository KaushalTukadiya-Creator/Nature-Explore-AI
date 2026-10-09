import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadActivities,
  toggleActivityCompletion,
  getRandomActivity,
  INITIAL_ACTIVITIES,
} from '../services/activityService';

describe('Outdoor Activities Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should load initial activities with default uncompleted state', () => {
    const list = loadActivities();
    expect(list.length).toBe(INITIAL_ACTIVITIES.length);
    expect(list.every((a) => a.isCompleted === false)).toBe(true);
  });

  it('should toggle an activity to completed and back', () => {
    const firstId = INITIAL_ACTIVITIES[0].id;
    const toggled = toggleActivityCompletion(firstId);
    expect(toggled.find((a) => a.id === firstId)?.isCompleted).toBe(true);

    const toggledBack = toggleActivityCompletion(firstId);
    expect(toggledBack.find((a) => a.id === firstId)?.isCompleted).toBe(false);
  });

  it('should generate a random activity', () => {
    const random = getRandomActivity(INITIAL_ACTIVITIES);
    expect(random).toBeDefined();
    expect(INITIAL_ACTIVITIES.map((a) => a.id)).toContain(random.id);
  });
});
