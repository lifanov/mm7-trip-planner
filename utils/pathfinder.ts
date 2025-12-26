
import { Location, Day, Route, TravelStep, TripResult, TransportType } from '../types';
import { ROUTES, INN_COSTS } from '../constants';

/**
 * Calculates the number of days to wait until the next available departure day.
 */
function getWaitTime(currentDay: Day, availableDays: Day[]): number {
  if (availableDays.includes(currentDay)) return 0;
  
  let wait = 0;
  let dayCheck = currentDay;
  while (!availableDays.includes(dayCheck)) {
    wait++;
    dayCheck = (dayCheck + 1) % 7 as Day;
  }
  return wait;
}

/**
 * Finds the fastest route between two locations starting on a specific day.
 */
export function findShortestPath(
  start: Location,
  end: Location,
  startDay: Day,
  hasEvenmornMap: boolean,
  stayAtInn: boolean,
  allowWalking: boolean,
  teleporterActivated: boolean
): TripResult | null {
  if (start === end) {
    return { steps: [], totalDays: 0, totalCost: 0 };
  }

  interface State {
    location: Location;
    currentDay: Day;
    totalDays: number;
    totalCost: number;
    steps: TravelStep[];
  }

  const queue: State[] = [
    { location: start, currentDay: startDay, totalDays: 0, totalCost: 0, steps: [] }
  ];

  // Map to track the minimum days to reach a (Location, Day) state
  const visited = new Map<string, number>();

  let bestResult: TripResult | null = null;

  while (queue.length > 0) {
    // Priority-queue-like behavior: sort by totalDays
    queue.sort((a, b) => a.totalDays - b.totalDays);
    const current = queue.shift()!;

    const stateKey = `${current.location}-${current.currentDay}`;
    if (visited.has(stateKey) && visited.get(stateKey)! <= current.totalDays) {
      continue;
    }
    visited.set(stateKey, current.totalDays);

    if (current.location === end) {
      if (!bestResult || current.totalDays < bestResult.totalDays) {
        bestResult = {
          steps: current.steps,
          totalDays: current.totalDays,
          totalCost: current.totalCost
        };
      }
      continue;
    }

    // Explore routes
    const availableRoutes = ROUTES.filter(r => 
      r.from === current.location && 
      (!r.requiresMap || hasEvenmornMap) &&
      (r.type !== TransportType.Walk || allowWalking) &&
      (!r.requiresTeleporter || teleporterActivated)
    );

    for (const route of availableRoutes) {
      const waitTime = getWaitTime(current.currentDay, route.days);
      const departureDay = (current.currentDay + waitTime) % 7 as Day;
      const arrivalDay = (departureDay + route.duration) % 7 as Day;
      
      let innCost = 0;
      if (stayAtInn && waitTime > 0) {
        innCost = waitTime * (INN_COSTS[current.location] || 0);
      }

      const nextState: State = {
        location: route.to,
        currentDay: arrivalDay,
        totalDays: current.totalDays + waitTime + route.duration,
        totalCost: current.totalCost + route.cost + innCost,
        steps: [
          ...current.steps,
          {
            from: route.from,
            to: route.to,
            type: route.type,
            departureDay,
            arrivalDay,
            duration: route.duration,
            cost: route.cost + innCost, // Combined cost for the step
            waitTime,
            innCost // Track inn cost separately for display
          }
        ]
      };

      // Basic cycle detection and optimization
      if (nextState.totalDays < (bestResult?.totalDays ?? Infinity)) {
        queue.push(nextState);
      }
    }
  }

  return bestResult;
}
