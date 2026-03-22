const sampleActivities = {
  Sittong: [
    { activity: 'Tea garden walk', cost: 200 },
    { activity: 'Local homestay experience', cost: 800 },
    { activity: 'Village food tasting', cost: 300 },
    { activity: 'Sunset viewpoint', cost: 0 },
  ],
  Lepchajagat: [
    { activity: 'Forest trail', cost: 150 },
    { activity: 'Hilltop picnic', cost: 400 },
    { activity: 'Local market', cost: 200 },
  ],
  default: [
    { activity: 'Sightseeing', cost: 300 },
    { activity: 'Local cuisine', cost: 250 },
    { activity: 'Relax at cafe', cost: 150 },
  ]
};

export default function generateItinerary({ destination, budget, days = 2 }){
  const destKey = Object.keys(sampleActivities).find(k => destination.toLowerCase().includes(k.toLowerCase())) || 'default';
  const activitiesPool = sampleActivities[destKey] || sampleActivities.default;

  // Split budget roughly: accommodation 40%, food 30%, transport 20%, activities 10%
  const allocation = {
    accommodation: Math.round(budget * 0.4),
    food: Math.round(budget * 0.3),
    transport: Math.round(budget * 0.2),
    activities: Math.round(budget * 0.1),
  };

  // Build daily itinerary by picking activities
  const itinerary = [];
  let remainingActivityBudget = allocation.activities;
  for (let d = 1; d <= days; d++){
    const dayActivities = [];
    // morning
    const a1 = activitiesPool[(d*2-2) % activitiesPool.length];
    const a2 = activitiesPool[(d*2-1) % activitiesPool.length];
    const cost1 = Math.min(a1.cost, remainingActivityBudget);
    remainingActivityBudget -= cost1;
    const cost2 = Math.min(a2.cost, Math.max(0, remainingActivityBudget));
    remainingActivityBudget -= cost2;

    dayActivities.push({ time: '09:00', activity: a1.activity, cost: cost1 });
    dayActivities.push({ time: '15:00', activity: a2.activity, cost: cost2 });

    itinerary.push({ day: d, activities: dayActivities });
  }

  const totalActivitiesCost = itinerary.flatMap(d => d.activities).reduce((s, a) => s + (a.cost||0), 0);
  const totalEstimatedCost = allocation.accommodation + allocation.food + allocation.transport + totalActivitiesCost;

  return { destination, budget, days, itinerary, allocation, totalEstimatedCost };
}
