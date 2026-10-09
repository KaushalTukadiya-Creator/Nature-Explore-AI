import { OutdoorActivity } from '@/types/journal';

const ACTIVITIES_STORAGE_KEY = 'nature_explorer_activities_progress_v1';

export const INITIAL_ACTIVITIES: OutdoorActivity[] = [
  {
    id: 'activity-1',
    title: 'Songbird Spotting Walk',
    description: 'Take a relaxed 25-minute walk through your local park or neighborhood. Spot and identify at least three distinct bird species by their plumage or song.',
    category: 'observation',
    estimatedDuration: '25 mins',
    difficulty: 'Easy',
    suggestedEquipment: ['Binoculars (optional)', 'Notebook or Nature Explorer AI App'],
    tips: 'Listen carefully at dawn or dusk when birds are most vocally active defending feeding territories.',
    isCompleted: false,
  },
  {
    id: 'activity-2',
    title: 'Five Leaf Shapes Quest',
    description: 'Find five completely different leaf margins or shapes (e.g. lobed oak, serrated elm, compound ash, needle pine, heart-shaped redbud) without picking living foliage.',
    category: 'learning',
    estimatedDuration: '20 mins',
    difficulty: 'Easy',
    suggestedEquipment: ['Camera / Phone for photos'],
    tips: 'Notice how leaf shape reflects light capture, water shedding, and wind resistance.',
    isCompleted: false,
  },
  {
    id: 'activity-3',
    title: 'Silent Butterfly Observation',
    description: 'Find a sunlit wildflower patch or flowering bush. Quietly observe a butterfly feeding on nectar for three continuous minutes without casting a sudden shadow.',
    category: 'observation',
    estimatedDuration: '15 mins',
    difficulty: 'Moderate',
    tips: 'Approach from downwind, move slowly, and avoid sudden gestures that trigger defensive flight reflex.',
    isCompleted: false,
  },
  {
    id: 'activity-4',
    title: 'Wildflower Deep Dive',
    description: 'Photograph a native wildflower close-up, upload it to Nature Explorer AI, and discover its botanical family, pollinators, and blooming schedule.',
    category: 'learning',
    estimatedDuration: '15 mins',
    difficulty: 'Easy',
    suggestedEquipment: ['Smartphone camera'],
    tips: 'Capture both the blossom face and the stem attachment for highest identification clarity.',
    isCompleted: false,
  },
  {
    id: 'activity-5',
    title: '15-Minute Screen-Free Forest Bathing',
    description: 'Sit in a quiet natural spot (under a tree, beside a meadow, or on a park bench). Put all screens in your pocket and simply engage your senses for 15 undisturbed minutes.',
    category: 'wellbeing',
    estimatedDuration: '15 mins',
    difficulty: 'Easy',
    tips: 'Notice the breeze temperature against your skin, the rustle of leaves, and the subtle scent of soil.',
    isCompleted: false,
  },
  {
    id: 'activity-6',
    title: 'Pollinator Window or Garden Patch',
    description: 'Plant native seed varieties in a small garden bed or a windowsill planter to provide essential nectar for wild bees and butterflies.',
    category: 'challenge',
    estimatedDuration: '45 mins',
    difficulty: 'Moderate',
    suggestedEquipment: ['Native wildflower seeds', 'Soil potting mix', 'Watering can'],
    tips: 'Choose species native to your geographical ecozone rather than invasive ornamental cultivars.',
    isCompleted: false,
  },
  {
    id: 'activity-7',
    title: 'Natural Soundscape Mapping',
    description: 'Close your eyes for 5 minutes outdoors. In your mind or field notes, create a mental 360-degree map of all natural sounds: wind, water, insects, rustling leaves, and bird calls.',
    category: 'observation',
    estimatedDuration: '10 mins',
    difficulty: 'Easy',
    tips: 'Tune out mechanical background drone and isolate biological frequencies.',
    isCompleted: false,
  },
  {
    id: 'activity-8',
    title: 'Under-Log Micro-Safari',
    description: 'Carefully roll over a fallen dead branch or moist rock on a trail edge to glimpse the hidden decomposers (isopods, centipedes, beetles), then gently roll it back in place.',
    category: 'challenge',
    estimatedDuration: '20 mins',
    difficulty: 'Moderate',
    tips: 'Always replace natural shelter gently so moisture-sensitive organisms are not exposed to drying sun.',
    isCompleted: false,
  },
];

export function loadActivities(): OutdoorActivity[] {
  try {
    const raw = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (!raw) return INITIAL_ACTIVITIES;
    const stored: Record<string, boolean> = JSON.parse(raw);
    return INITIAL_ACTIVITIES.map((act) => ({
      ...act,
      isCompleted: Boolean(stored[act.id]),
      completedAt: stored[act.id] ? new Date().toISOString() : undefined,
    }));
  } catch {
    return INITIAL_ACTIVITIES;
  }
}

export function toggleActivityCompletion(id: string): OutdoorActivity[] {
  const current = loadActivities();
  const updated = current.map((act) => {
    if (act.id === id) {
      const nextCompleted = !act.isCompleted;
      return {
        ...act,
        isCompleted: nextCompleted,
        completedAt: nextCompleted ? new Date().toISOString() : undefined,
      };
    }
    return act;
  });

  const progressMap: Record<string, boolean> = {};
  updated.forEach((act) => {
    if (act.isCompleted) progressMap[act.id] = true;
  });

  localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(progressMap));
  return updated;
}

export function getRandomActivity(activities: OutdoorActivity[]): OutdoorActivity {
  const uncompleted = activities.filter((a) => !a.isCompleted);
  const pool = uncompleted.length > 0 ? uncompleted : activities;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
